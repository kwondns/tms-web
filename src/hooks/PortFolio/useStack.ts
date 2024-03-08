import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { DeleteFetch, FileUpload, GetFetch, PostFetch } from '@/lib/fetch';
import { StackCreateType, StackGetType, StackType } from '@/types/PortFolio/stack.type';
import { AuthAtom } from '@/stores/auth.store';

export const useGetStack = () =>
  useQuery({ queryKey: ['stack', 'all'], queryFn: async () => GetFetch<StackGetType>('port/stack') });

export const useCreateStack = () => {
  const [deleteImage, setDeleteImage] = useState('');
  const accessToken = useRecoilValue(AuthAtom);
  const queryClient = useQueryClient();
  const { mutate: createStack, isPending } = useMutation({
    mutationFn: async (payload: StackCreateType) => {
      const { img, ...rest } = payload;
      const uploadResult = await FileUpload('port', img, accessToken, 'stack');
      setDeleteImage(uploadResult[0]);
      const body = { ...rest, img: uploadResult[0] as string };
      await PostFetch<StackType, StackType>(`port/stack/${payload.tech}`, body, accessToken);
    },
    onMutate: () => {
      toast('스택 생성중...', { autoClose: false, toastId: 'stack' });
    },
    onError: async (error) => {
      await DeleteFetch<{ target: string }, never>(`upload/stack`, { target: deleteImage }, accessToken);
      toast.update('stack', { render: error.message, autoClose: 3000, type: 'error' });
    },
    onSuccess: async () => {
      toast.update('stack', { render: '스택을 추가했습니다!', autoClose: 1500, type: 'success' });
      await queryClient.invalidateQueries({ queryKey: ['stack', 'all'] });
    },
  });
  return { createStack, isPending };
};
