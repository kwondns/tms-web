import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';

import LayoutTemplate from '@/templates/Layout.template';
import { AuthAtom } from '@/stores/auth.store';
import { useRefresh } from '@/hooks/useAuth';
import { isTokenExpired } from '@/lib/token';

export default function Layout() {
  const accessToken = useRecoilValue(AuthAtom);
  const { refreshToken } = useRefresh();
  useEffect(() => {
    if (isTokenExpired(accessToken) || !accessToken) {
      refreshToken();
    }
  }, [accessToken]);
  return <LayoutTemplate />;
}
