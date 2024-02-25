import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { AuthType } from '@/types/auth.type';
import { GetFetch, PostFetch } from '@/lib/fetch';
import { AuthAtom } from '@/stores/auth.store';

type AccessTokenType = {
  accessToken: string;
};

type AuthResponseType = AccessTokenType & {
  username: string;
};

export const useAuth = () => {
  const setAuth = useSetRecoilState(AuthAtom);
  const { mutate: auth, isPending } = useMutation({
    mutationFn: async (payload: AuthType) => PostFetch<AuthType, AuthResponseType>('admin/signin', payload),
    onMutate: async () => {
      toast('로그인...', { autoClose: false, toastId: 'auth' });
    },
    onError: (error) => {
      toast.update('auth', { render: error.message, autoClose: 3000, type: 'error' });
    },
    onSuccess: (data) => {
      toast.update('auth', { render: '인증되었습니다!', autoClose: 1500, type: 'success' });
      setAuth(data.accessToken);
    },
  });
  return { auth, isPending };
};

export const useWhoami = () => {
  const accessToken = useRecoilValue(AuthAtom);
  return useQuery({
    queryKey: ['whoami', accessToken],
    queryFn: () => GetFetch<{ username: string }>('admin/whoami', accessToken),
    enabled: !!accessToken,
  });
};

export const useRefresh = () => {
  const setAuth = useSetRecoilState(AuthAtom);
  const navigate = useNavigate();
  const { mutate: refreshToken } = useMutation({
    mutationFn: async () => PostFetch<object, AuthResponseType>(`admin/refresh`, {}),
    onSuccess: async (data) => {
      setAuth(data.accessToken);
    },
    onError: () => {
      toast('인증이 만료되었습니다!', { type: 'error', autoClose: 2000 });
      navigate('/');
    },
  });
  return { refreshToken };
};
