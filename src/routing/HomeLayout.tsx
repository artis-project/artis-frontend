import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "@thirdweb-dev/react";
import "../styles/globals.css"

export const HomeLayout = ({ children }: any) => {
  //const { isLoggedIn } = useUser();
  const isLoggedIn = true;
  console.log(isLoggedIn);

  if (isLoggedIn) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return (
    <div className="container">
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};