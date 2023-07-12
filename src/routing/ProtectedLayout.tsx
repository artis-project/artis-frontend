import { Spinner } from '@blueprintjs/core';
import { useLogout, useUser } from '@thirdweb-dev/react';
import { Navigate, Outlet, useNavigation } from 'react-router-dom';

export const ProtectedLayout = ({ children }: any) => {
  const { isLoggedIn } = useUser();
  /* const isLoggedIn = true; */
  const navigation = useNavigation();
  const { isLoading } = useLogout();

  if (!isLoggedIn) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return (
    <main className="min-h-screen p-16 flex flex-col justify-center items-center">
      {navigation.state !== 'loading' && !isLoading ? <Outlet /> : <Spinner />}
    </main>
  );
};
