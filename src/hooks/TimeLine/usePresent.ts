import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

import { GetFetch, PutFetch } from '@/lib/fetch';
import { PresentType } from '@/types/TimeLine/present.type';
import { AuthAtom } from '@/stores/auth.store';

export const useGetPresent = () =>
  useQuery({ queryKey: ['present'], queryFn: async () => GetFetch<PresentType>('time/present') });

export const useUpdatePresent = () => {
  const accessToken = useRecoilValue(AuthAtom);
  const { mutate: updatePresent, isPending: isUpdating } = useMutation({
    mutationFn: async (payload: PresentType) => {
      if (!payload.startTime) delete payload.startTime;
      if (!payload.endTime) delete payload.endTime;
      if (!payload.title) delete payload.title;
      if (!payload.content) delete payload.content;
      await PutFetch<PresentType, PresentType>(`time/present`, payload, accessToken);
    },
    onMutate: () => {
      toast('현재 수정중...', { autoClose: false, toastId: 'present' });
    },
    onError: async (error) => {
      toast.update('present', { render: error.message, autoClose: 3000, type: 'error' });
    },
    onSuccess: async () => {
      toast.update('present', { render: '현재를 변경했습니다!', autoClose: 1500, type: 'success' });
    },
  });
  return { updatePresent, isUpdating };
};

export const useSocketPresent = () => {
  const socket = io('ws://localhost:3000/present');
  const queryClient = useQueryClient();
  socket.on('present-update', (data) => {
    queryClient.setQueryData(['present'], data);
  });
};
