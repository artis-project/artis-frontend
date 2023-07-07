import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@thirdweb-dev/react";

export const ProtectedLayout = ({ children }: any) => {
  //const { isLoggedIn } = useUser();
  const isLoggedIn = true;
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return (
    <main className="min-h-screen py-16 flex flex-col justify-center items-center">
      <Outlet />
    </main>
   );
};