import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { AuthAtom } from '@/stores/auth.store';
import AuthTemplate from '@/templates/Auth.template';
import isTokenExpired from '@/lib/token';

export default function Auth() {
  const accessToken = useRecoilValue(AuthAtom);
  const navigate = useNavigate();
  useEffect(() => {
    if (accessToken && !isTokenExpired(accessToken)) navigate('/dashboard');
  }, [accessToken]);

  return <AuthTemplate />;
}
