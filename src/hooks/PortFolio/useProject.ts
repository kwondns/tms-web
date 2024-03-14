import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { DeleteFetch, FileUpload, GetFetch, PostFetch, PutFetch } from '@/lib/fetch';
import { ProjectCreateType, ProjectType, ProjectUpdateType } from '@/types/PortFolio/project.type';
import { AuthAtom } from '@/stores/auth.store';

export const useGetProjectAll = () =>
  useQuery({
    queryKey: ['project', 'all'],
    queryFn: async () => GetFetch<ProjectType[]>('port/project'),
  });

export const useGetProjectOne = (id: string | undefined) =>
  useQuery({
    queryKey: ['project', id],
    queryFn: async () => GetFetch<ProjectType>(`port/project/${id}`),
  });

export const useUpdateProject = () => {
  const [deleteImage, setDeleteImage] = useState('');
  const accessToken = useRecoilValue(AuthAtom);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: updateProject, isPending: isUpdating } = useMutation({
    mutationFn: async ({ payload, previousImage }: { payload: ProjectUpdateType; previousImage?: string }) => {
      if (previousImage) {
        const { preview_image: previewImage, ...rest } = payload;
        const uploadResult = await FileUpload('port', previewImage as File, accessToken, `project/${rest.title}`);
        setDeleteImage(uploadResult[0]);
        const body = { ...rest, preview_image: uploadResult[0] as string };
        await PutFetch<ProjectType, ProjectType>(`port/project/${payload.id}`, body, accessToken);
      } else {
        await PutFetch<ProjectUpdateType, ProjectType>(`port/project/${payload.id}`, payload, accessToken);
      }
    },
    onMutate: () => {
      toast('프로젝트 수정중...', { autoClose: false, toastId: 'project_edit' });
    },
    onError: async (error) => {
      try {
        await DeleteFetch<{ target: string }, never>(`upload/port`, { target: deleteImage }, accessToken);
      } finally {
        toast.update('project_edit', { render: error.message, autoClose: 3000, type: 'error' });
      }
    },
    onSuccess: async (_, variables) => {
      toast.update('project_edit', { render: '프로젝트를 수정했습니다!', autoClose: 1500, type: 'success' });
      if (variables.previousImage)
        await DeleteFetch<{ target: string }, never>(`upload/port`, { target: variables.previousImage }, accessToken);
      await queryClient.invalidateQueries({ queryKey: ['project', variables.payload.id] });
      navigate('/portfolio/project');
    },
  });
  return { updateProject, isUpdating };
};

export const useCreateProject = () => {
  const [deleteImage, setDeleteImage] = useState('');
  const accessToken = useRecoilValue(AuthAtom);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createProject, isPending: isCreating } = useMutation({
    mutationFn: async (payload: ProjectCreateType) => {
      const { preview_image: previewImage, ...rest } = payload;
      const uploadResult = await FileUpload('port', previewImage, accessToken, `project/${rest.title}`);
      setDeleteImage(uploadResult[0]);
      const body = { ...rest, preview_image: uploadResult[0] as string };
      await PostFetch<Omit<ProjectType, 'id'>, ProjectType>(`port/project`, body, accessToken);
    },
    onMutate: () => {
      toast('프로젝트 생성중...', { autoClose: false, toastId: 'project' });
    },
    onError: async (error) => {
      await DeleteFetch<{ target: string }, never>(`upload/port`, { target: deleteImage }, accessToken);
      toast.update('project', { render: error.message, autoClose: 3000, type: 'error' });
    },
    onSuccess: async () => {
      toast.update('project', { render: '프로젝트를 추가했습니다!', autoClose: 1500, type: 'success' });
      await queryClient.invalidateQueries({ queryKey: ['project', 'all'] });
      navigate('/portfolio/project');
    },
  });
  return { createProject, isCreating };
};
