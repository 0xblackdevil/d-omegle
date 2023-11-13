import React, { useEffect } from "react";
import { useMetaMask } from "metamask-react";

export default function Home() {
  const { connect, account, chainId, switchChain } = useMetaMask();

  useEffect(() => {
    if (account !== null) {
      switchChain("0x5");
    } else {
      console.log("connect wallet");
    }
  });

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            😂 Welcome to Domegle.
            <strong className="font-extrabold text-blue-700 sm:block">
            peer-to-peer video chat.
            </strong>
          </h1>

          <p className="mt-4 max-w-xl sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              className="block w-full rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              onClick={connect}
            >
              {account !== null
                ? account.slice(0, 4) + "..." + account.slice(-4)
                : "Connect wallet"}
            </button>

            {account !== null ? (
              <button
                className="block w-full rounded px-12 py-3 text-sm font-medium text-blue-600 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                onClick={() => {
                  console.log("confirm stack");
                }}
              >
                Confirm Stack
              </button>
            ) : (
              <div></div>
            )}
          </div>

          <div className="flex flex-wrap justify-center md:order-2">
            <div
              className={`rounded  border m-5 ${
                account !== null
                  ? "bg-green-100 text-green-800 border-green-300 "
                  : "bg-red-100 text-red-800 border-red-300"
              } text-xs font-medium mr-2 px-2.5 py-0.5`}
            >
              1. Wallet Connection
            </div>

            <div
              className={`rounded  border m-5 ${
                chainId === "0x5"
                  ? "bg-green-100 text-green-800 border-green-300 "
                  : "bg-red-100 text-red-800 border-red-300"
              } text-xs font-medium mr-2 px-2.5 py-0.5`}
            >
              2. Chain Connection
            </div>

            <div
              className={`rounded  border m-5 ${
                false
                  ? "bg-green-100 text-green-800 border-green-300 "
                  : "bg-red-100 text-red-800 border-red-300"
              } text-xs font-medium mr-2 px-2.5 py-0.5`}
            >
              3. Stack Etheres
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
