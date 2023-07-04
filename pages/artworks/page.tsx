import {useAddress, useLogin, useLogout, useMetamask, useUser } from "@thirdweb-dev/react";
import type { GetServerSideProps, NextPage } from "next";
import styles from "../../styles/Home.module.css";

const Artworks: NextPage = () => {

    async function getArtworkIds() {
        const res = await fetch(`${process.env.ARTIS_SERVER_API_URL}/artworks`);
        const data = await res.json()
        return data
    }
    //const artworkIds = await getArtworkIds();
    //console.log(artworkIds)
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Welcome to <a>Artworks</a>!

            </h1>
        </div>
    );
};

export default Artworks;