import { ISecureStorage, ThirdwebProvider, metamaskWallet } from "@thirdweb-dev/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { router } from "./routing/Router";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={activeChain}
      supportedWallets={[metamaskWallet()]}
      authConfig={{
        domain: "",
        authUrl: "http://localhost:8080/auth",
        secureStorage: secureLocalStorage as unknown as ISecureStorage
      }}
    >
      <RouterProvider router={router} />
    </ThirdwebProvider>
  </React.StrictMode>
);
