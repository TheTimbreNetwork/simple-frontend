"use client";

import { useState } from "react";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, zora } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "09c8084cdc92e99e928f07f537d62ad1",
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function Home() {
  const [data, setData] = useState("");
  const [transaction, setTransaction] = useState("");

  async function upload() {
    if (!data) return;
    try {
      setData("");
      const response = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log("json:", json);
      setTransaction(json.txId);
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <main className="flex flex-col items-center justify-between">
          <ConnectButton />
          <input
            placeholder="Create a post"
            onChange={(e) => setData(e.target.value)}
            className="text-black px-2 py-1"
          />
          <button onClick={upload} className="text-black bg-white mt-2 px-12">
            Upload text
          </button>
          {transaction && (
            <div className="text-black bg-white mt-2 px-12">
              Transaction: {transaction}
            </div>
          )}
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
