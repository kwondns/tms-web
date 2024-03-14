import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

import { GetFetch, PutFetch } from '@/lib/fetch';
import { PastCountType, PastType } from '@/types/TimeLine/past.type';
import { AuthAtom } from '@/stores/auth.store';

export const useGetPast = (date: Date) =>
  useQuery({
    queryKey: ['past', 'calendar', date],
    queryFn: async () => GetFetch<PastCountType[]>(`time/past/calendar/${date}`),
  });

export const useGetPastDay = (date: string) =>
  useQuery({ queryKey: ['past', date], queryFn: async () => GetFetch<PastType[]>(`time/past/${date}`) });

export const useUpdatePastDay = () => {
  const accessToken = useRecoilValue(AuthAtom);
  const { mutate: updatePast, isPending: isUpdating } = useMutation({
    mutationFn: async (payload: PastType) => {
      const { id, ...body } = payload;
      await PutFetch<Omit<PastType, 'id'>, PastType>(`time/past/${id}`, body, accessToken);
    },
    onMutate: () => {
      toast('과거 수정중...', { autoClose: false, toastId: 'past' });
    },
    onError: async (error) => {
      toast.update('past', { render: error.message, autoClose: 3000, type: 'error' });
    },
    onSuccess: async (_, variables) => {
      toast.update('past', { render: '과거를 변경했습니다!', autoClose: 1500, type: 'success' });
      await GetFetch(`time/past/cleanup/${variables.startTime}`);
    },
  });
  return { updatePast, isUpdating };
};
