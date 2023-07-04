import type { AppProps } from "next/app";
import { ISecureStorage, ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";
import secureLocalStorage from "react-secure-storage";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      supportedWallets={[metamaskWallet()]}
      activeChain={activeChain}
      authConfig={{
        domain: "http://localhost:8080",
        authUrl: "http://localhost:8080/auth",
        secureStorage: secureLocalStorage as unknown as ISecureStorage
      }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
