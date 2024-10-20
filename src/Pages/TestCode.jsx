import React from "react";
import QRCode from "react-qr-code";

function TestCode() {
  return (
    <>
      <div className=" h-screen w-screen bg-orange-400">
        <QRCode value="www.google.com" className=" m-8" />,
      </div>
    </>
  );
}

export default TestCode;
