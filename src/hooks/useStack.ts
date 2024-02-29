import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';

import { GetFetch, PostFetch } from '@/lib/fetch';
import { StackGetType, StackType } from '@/types/portfolio/stack.type';
import { AuthAtom } from '@/stores/auth.store';

export const useGetStack = () =>
  useQuery({ queryKey: ['stack', 'all'], queryFn: async () => GetFetch<StackGetType>('port/stack') });

export const useCreateStack = () => {
  const accessToken = useRecoilValue(AuthAtom);
  const queryClient = useQueryClient();
  const { mutate: createStack, isPending } = useMutation({
    mutationFn: async (payload: StackType & { tech: 'front' | 'back' | 'etc' }) =>
      PostFetch<StackType, StackType>(`port/stack/${payload.tech}`, payload, accessToken),
    onMutate: () => {
      toast('스택 생성중...', { autoClose: false, toastId: 'stack' });
    },
    onError: (error) => {
      toast.update('stack', { render: error.message, autoClose: 3000, type: 'error' });
    },
    onSuccess: async () => {
      toast.update('stack', { render: '스택을 추가했습니다!', autoClose: 1500, type: 'success' });
      await queryClient.invalidateQueries({ queryKey: ['stack', 'all'] });
    },
  });
  return { createStack, isPending };
};
