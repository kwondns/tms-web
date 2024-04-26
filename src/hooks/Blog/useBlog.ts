import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { DeleteFetch, FileUpload, GetFetch, PatchFetch, PostFetch } from '@/lib/fetch';
import { AuthAtom } from '@/stores/auth.store';
import { BlogCreateType, BlogPostDetailType, BlogPostType, BlogPostUpdateType } from '@/types/Blog/blog.type';

export const useGetBlogPosts = () =>
  useInfiniteQuery({
    queryKey: ['blog', 'post'],
    queryFn: async ({ pageParam }) => GetFetch<BlogPostType[]>(`blog/${pageParam}`),
    initialPageParam: 1,
    getNextPageParam: (_lastPage, _allPages, lastPageParam, _allPageParams) => lastPageParam + 1,
  });

export const getBlogPost = (id: string | undefined) => ({
  queryKey: ['blog', 'post', id],
  queryFn: async () => GetFetch<BlogPostDetailType>(`blog/content/${id}`),
});

export const useCreateBlogPost = () => {
  const accessToken = useRecoilValue(AuthAtom);
  const [deleteImage, setDeleteImage] = useState<string>('');
  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: async (payload: BlogCreateType) => {
      const { preview_image: previewImage, ...rest } = payload;
      const uploadResult = await FileUpload('blog', previewImage as File, accessToken, `blog/${rest.title}`);
      setDeleteImage(uploadResult[0]);
      const body = { ...rest, preview_image: uploadResult[0] };
      await PostFetch<BlogCreateType, never>('blog/new', body, accessToken);
    },
    onMutate: () => toast.loading('게시글을 생성하는 중입니다', { autoClose: false, toastId: 'post-create' }),
    onSuccess: () =>
      toast.update('post-create', { type: 'success', render: '게시글을 생성하였습니다.', autoClose: 1500 }),
    onError: async () => {
      await DeleteFetch<{ target: string }, never>(`upload/blog`, { target: deleteImage }, accessToken);
      toast.update('post-create', { type: 'error', render: '게시글 생성에 실패하였습니다.', autoClose: 2000 });
    },
  });
  return { createPost, isCreating };
};

export const useUpdateBlogPost = () => {
  const accessToken = useRecoilValue(AuthAtom);
  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    mutationFn: async (payload: BlogPostUpdateType) => {
      const { id, ...attrs } = payload;
      await PatchFetch<Omit<BlogPostUpdateType, 'id'>, never>(`blog/${id}`, attrs, accessToken);
    },
    onMutate: () => toast.loading('게시글을 업데이트하는 중입니다', { autoClose: false, toastId: 'post-update' }),
    onSuccess: async (_data, variables) => {
      toast.update('post-update', {
        type: 'success',
        render: '게시글을 업데이트하였습니다.',
        autoClose: 1500,
        isLoading: false,
      });
      if (variables.prevImage) {
        try {
          await DeleteFetch<{ target: string }, never>('upload/blog', { target: variables.prevImage }, accessToken);
          toast.success('기존 이미지를 제거하였습니다.', { autoClose: 1500 });
        } catch (error) {
          toast.error('기존 이미지 제거에 실패하였습니다', { autoClose: 2000 });
        }
      }
    },
    onError: () => toast.error('게시글 업데이트에 실패하였습니다', { autoClose: 2000, isLoading: false }),
  });
  return { updatePost, isUpdating };
};
