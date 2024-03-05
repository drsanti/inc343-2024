"use client";

import React, { useState, useEffect } from "react";
import { QNetBrowserSocket } from "qnetbrowsersocket";
export default function Home() {
  const [bitArray, setBitArray] = useState<boolean[]>([]);

  useEffect(() => {
    const qnet = new QNetBrowserSocket();
    qnet.start().then(() => {
      qnet.enableBitsSimulation([true, true, true, true, true]);
    });

    const interval = setInterval(() => {
      qnet.getBits().then((bits) => {
        setBitArray(() => bits);
      });
    }, 1000);
    return () => {
      qnet.stop();
      clearInterval(interval);
    };
  }, []);

  return <p className="text-5xl">DATA: {bitArray.toString()}</p>;
}
