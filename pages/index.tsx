import {useAddress, useConnectionStatus, useLogin, useLogout, useMetamask, useUser } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Home from "./Home"
import Login from "./login"
import { useRouter } from "next/router";
import { useEffect } from "react";

const Landing: NextPage = () => {
  const address = useAddress();
  const connect = useMetamask();

  const {login} = useLogin();
  const {logout} = useLogout();
  const { user, isLoggedIn } = useUser();
  const isConnected = useConnectionStatus();
  
  const router = useRouter();


  useEffect(() => {
    isLoggedIn && isConnected === 'connected' ? router.push("/artworks") : router.push("/login")
  })

  return (
    <div className={styles.container}>
      <main className={styles.main} />
    </div>
  );
};

export default Landing;
