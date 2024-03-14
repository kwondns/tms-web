import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';

import { GetFetch, PatchFetch, PostFetch } from '@/lib/fetch';
import {
  FutureBoxCreateType,
  FutureBoxType,
  FutureBoxUpdateType,
  FutureCreateType,
  FutureType,
  FutureUpdateType,
} from '@/types/TimeLine/future.type';
import { AuthAtom } from '@/stores/auth.store';

export const useGetFutureHigh = (record = false) =>
  useQuery({
    queryKey: ['future', 'high', record],
    queryFn: async () => GetFetch<FutureBoxType[]>(`time/future/1${record ? '/record' : ''}`),
  });
export const useGetFutureMiddle = (record = false) =>
  useQuery({
    queryKey: ['future', 'middle', record],
    queryFn: async () => GetFetch<FutureBoxType[]>(`time/future/2${record ? '/record' : ''}`),
  });
export const useGetFutureLow = (record = false) =>
  useQuery({
    queryKey: ['future', 'low', record],
    queryFn: async () => GetFetch<FutureBoxType[]>(`time/future/3${record ? '/record' : ''}`),
  });

export const useCreateFuture = () => {
  const queryClient = useQueryClient();
  const accessToken = useRecoilValue(AuthAtom);
  const priority = {
    1: () => queryClient.invalidateQueries({ queryKey: ['future', 'high'] }),
    2: () => queryClient.invalidateQueries({ queryKey: ['future', 'middle'] }),
    3: () => queryClient.invalidateQueries({ queryKey: ['future', 'low'] }),
  };
  const { mutate: createFuture, isPending: isCreating } = useMutation({
    mutationFn: async (payload: FutureCreateType) => {
      await PostFetch<FutureCreateType, FutureType>('time/future', payload, accessToken);
    },
    onMutate: () => {
      toast('미래를 만드는 중...', { autoClose: false, toastId: 'futureCreate' });
    },
    onSuccess: (_, variables) => {
      priority[variables.priority]();
      toast.update('futureCreate', { render: '미래를 만들었습니다.', autoClose: 1500, type: 'success' });
    },
    onError: async (error) => {
      toast.update('futureCreate', { render: error.message, autoClose: 3000, type: 'error' });
    },
  });
  return { createFuture, isCreating };
};

export const useUpdateFuture = () => {
  const accessToken = useRecoilValue(AuthAtom);
  const queryClient = useQueryClient();
  const priority = {
    1: () => queryClient.invalidateQueries({ queryKey: ['future', 'high'] }),
    2: () => queryClient.invalidateQueries({ queryKey: ['future', 'middle'] }),
    3: () => queryClient.invalidateQueries({ queryKey: ['future', 'low'] }),
  };
  const { mutate: updateFuture, isPending: isUpdating } = useMutation({
    mutationFn: async (payload: FutureUpdateType) => {
      await PatchFetch<FutureUpdateType, FutureType>('time/future', payload, accessToken);
    },
    onMutate: () => {
      toast('미래를 바꾸는 중...', { autoClose: false, toastId: 'futureUpdate' });
    },
    onSuccess: (_, variables) => {
      priority[variables.priority]();
      toast.update('futureUpdate', { render: '미래를 변경했습니다.', autoClose: 1500, type: 'success' });
    },
    onError: async (error) => {
      toast.update('futureUpdate', { render: error.message, autoClose: 3000, type: 'error' });
    },
  });
  return { updateFuture, isUpdating };
};

export const useCreateFutureBox = () => {
  const accessToken = useRecoilValue(AuthAtom);
  const queryClient = useQueryClient();
  const priority = {
    1: () => queryClient.invalidateQueries({ queryKey: ['future', 'high'] }),
    2: () => queryClient.invalidateQueries({ queryKey: ['future', 'middle'] }),
    3: () => queryClient.invalidateQueries({ queryKey: ['future', 'low'] }),
  };
  const { mutate: createFutureBox, isPending: isCreating } = useMutation({
    mutationFn: async (payload: FutureBoxCreateType) => {
      await PostFetch<FutureBoxCreateType, FutureBoxType>('time/future/box', payload, accessToken);
    },
    onMutate: () => {
      toast('미래상자를 만드는 중...', { autoClose: false, toastId: 'futureBoxCreate' });
    },
    onSuccess: (_, variables) => {
      priority[variables.priority]();
      toast.update('futureBoxCreate', { render: '미래상자를 만들었습니다.', autoClose: 1500, type: 'success' });
    },
    onError: async (error) => {
      toast.update('futureBoxCreate', { render: error.message, autoClose: 3000, type: 'error' });
    },
  });
  return { createFutureBox, isCreating };
};
export const useUpdateFutureBox = () => {
  const accessToken = useRecoilValue(AuthAtom);
  const queryClient = useQueryClient();
  const priority = {
    1: () => queryClient.invalidateQueries({ queryKey: ['future', 'high'] }),
    2: () => queryClient.invalidateQueries({ queryKey: ['future', 'middle'] }),
    3: () => queryClient.invalidateQueries({ queryKey: ['future', 'low'] }),
  };
  const { mutate: updateFutureBox, isPending: isUpdating } = useMutation({
    mutationFn: async (payload: FutureBoxUpdateType) => {
      await PatchFetch<FutureBoxUpdateType, FutureBoxType>('time/future/box', payload, accessToken);
    },
    onMutate: () => {
      toast('미래상자를 바꾸는 중...', { autoClose: false, toastId: 'futureUpdate' });
    },
    onSuccess: (_, variables) => {
      priority[variables.priority]();
      toast.update('futureUpdate', { render: '미래상자를 변경했습니다.', autoClose: 1500, type: 'success' });
    },
    onError: async (error) => {
      toast.update('futureUpdate', { render: error.message, autoClose: 3000, type: 'error' });
    },
  });
  return { updateFutureBox, isUpdating };
};

export const useSwapFutureBox = () => {
  const accessToken = useRecoilValue(AuthAtom);
  const queryClient = useQueryClient();
  const priority = {
    1: () => queryClient.invalidateQueries({ queryKey: ['future', 'high'] }),
    2: () => queryClient.invalidateQueries({ queryKey: ['future', 'middle'] }),
    3: () => queryClient.invalidateQueries({ queryKey: ['future', 'low'] }),
  };

  const { mutate: swapFutureBox } = useMutation({
    mutationFn: async (payload: [FutureBoxType, FutureBoxType]) => {
      const [active, over] = payload;
      const activePayload = { id: active.id, order: over.order, priority: active.priority };
      const overPayload = { id: over.id, order: active.order, priority: over.priority };
      await Promise.all([
        PatchFetch<FutureBoxUpdateType, FutureBoxType>('time/future/box', activePayload, accessToken),
        PatchFetch<FutureBoxUpdateType, FutureBoxType>('time/future/box', overPayload, accessToken),
      ]);
    },
    onMutate: () => {
      toast('미래상자를 바꾸는 중...', { autoClose: false, toastId: 'futureUpdate' });
    },
    onSuccess: (_, variables) => {
      if (variables[0].priority !== variables[1].priority) {
        priority[variables[0].priority]();
        priority[variables[1].priority]();
      } else priority[variables[0].priority]();
      toast.update('futureUpdate', { render: '미래상자를 변경했습니다.', autoClose: 1500, type: 'success' });
    },
    onError: async (error) => {
      toast.update('futureUpdate', { render: error.message, autoClose: 3000, type: 'error' });
    },
  });
  return { swapFutureBox };
};
