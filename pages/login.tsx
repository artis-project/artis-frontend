import {useAddress, useLogin, useLogout, useMetamask, useUser } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const address = useAddress();
  const connect = useMetamask();

  const {login} = useLogin();
  const {logout} = useLogout();
  //const { user, isLoggedIn } = useUser();
  const isLoggedIn = true;
  const router = useRouter();


  useEffect(() => {
    isLoggedIn ? router.push("/artworks") : router.push("/login")
  })
  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>artis-project</a>!
        </h1>

        <p className={styles.description}>
          Get started by connecting your wallet
        </p>
        <div>
          {isLoggedIn ? (
            <button onClick={() => logout()}>Logout</button>
          ) : address ? (
            <button onClick={() => login()}>Login</button>
          ) : (
            <button onClick={() => connect()}>Connect</button>
          )}
          <pre>Connected Wallet: {address}</pre>
        </div>
      </main>
    </div>
  );
};

export default Login;
