"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React, { useState, useEffect } from "react";
import {
  QNetBrowserSocket,
  QNetSimulationTarget,
  QNetSystemParams,
} from "qnetbrowsersocket";
import { SystemParamsTable } from "@/components/qnet/systemPara/systemParamsTable";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  const [bitArray, setBitArray] = useState<boolean[]>([]);

  useEffect(() => {
    //
    const qnet = new QNetBrowserSocket();
    qnet.start().then(() => {
      qnet.enableBitsSimulation([true, true, true, true, true]);
    });

    const interval = setInterval(() => {
      qnet.getBits().then((bits) => {
        setBitArray(() => bits);
        console.log(bits);
      });
    }, 1000);
    //
    return () => {
      qnet.stop();
      clearInterval(interval);
    };
  }, []);

  return <p className="text-5xl">DATA: {bitArray.toString()}</p>;
}
