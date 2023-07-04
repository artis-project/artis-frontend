import {useAddress, useLogin, useLogout, useMetamask, useUser } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";

const Home: NextPage = () => {
    
  const router = useRouter();
  const {id} = router.query

  
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>{id}</a>!
        </h1>
      </main>
    </div>
  );
};

export default Home;