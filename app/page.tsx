"use client";

import { useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";

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
    <main className="flex flex-col items-center justify-between py-4">
      <ConnectButton />
      <div className="py-4 px-10 flex flex-row w-full justify-center items-center">
        <input
          placeholder="Post a review"
          onChange={(e) => setData(e.target.value)}
          className="border-solid border-2 border-gray-600 text-black px-2 py-1 w-3/5"
        />
        <button
          onClick={upload}
          className="text-black bg-white mx-2 px-12 w-1/5 border-solid border-2 border-gray-300"
        >
          Upload text
        </button>
      </div>
      {transaction && (
        <div className="text-black bg-white mt-2 px-12">
          Transaction: {transaction}
        </div>
      )}
    </main>
  );
}
