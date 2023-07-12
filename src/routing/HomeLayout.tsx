import { Spinner } from '@blueprintjs/core';
import { useUser } from '@thirdweb-dev/react';
import { Navigate, Outlet } from 'react-router-dom';
import '../styles/globals.css';

export const HomeLayout = ({ children }: any) => {
  const { isLoggedIn, isLoading } = useUser();
  /* const isLoggedIn = true; */

  if (isLoggedIn) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return (
    <main className="min-h-screen py-16 flex flex-col justify-center items-center">
      {isLoading ? <Spinner /> : <Outlet />}
    </main>
  );
};
