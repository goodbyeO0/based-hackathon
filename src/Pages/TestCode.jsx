import React from "react";
import QRCode from "react-qr-code";

function TestCode() {
  const endpoint =
    "https://metamask.app.link/dapp/based-hackathon.vercel.app/contribute";
  return (
    <>
      <div className=" h-screen w-screen bg-orange-400">
        <QRCode value={endpoint} className=" m-8" />,
      </div>
    </>
  );
}

export default TestCode;
