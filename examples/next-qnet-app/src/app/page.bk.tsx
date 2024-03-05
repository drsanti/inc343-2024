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
  const [progress, setProgress] = useState(0);

  /** System Parameters */
  const [systemParams, setSystemParams] = useState<QNetSystemParams>({
    clientId: "",
    systemTime: "",
    highResolutionTime: 0,
    counter: 0,
  });

  /** Boolean Data */
  const [booleanArray, setBooleanArray] = useState<boolean[]>([]);

  /** Integer Data */
  const [integerArray, setIntegerArray] = useState<number[]>([]);

  /** Integer Data */
  const [floatArray, setFloatArray] = useState<number[]>([]);

  const processMessageAndUpdateState = (message: string) => {
    try {
      const json = JSON.parse(message);
      if ("result" in json) {
        const result = json.result;
        if ("source" in result) {
          const source = result.source;
          if (source === "booleanData") {
            setBooleanArray(() => result.value);
          } else if (source === "integerData") {
            setIntegerArray(() => result.value);
          } else if (source === "floatData") {
            setFloatArray(() => result.value);
          }
        }
      } else if ("clientId" in json) {
        setSystemParams(() => json);
        setProgress(() => json.counter % 100);
      }
      return json;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const qnet = new QNetBrowserSocket({
      onMessage(message) {
        processMessageAndUpdateState(message);
      },
      onConnect() {
        /** Enable simulation all types, all channels */
        qnet.writeSimulationData("booleanSim", [true, true, true, true, true]);
        qnet.writeSimulationData("integerSim", [true, true, true, true, true]);
        qnet.writeSimulationData("floatSim", [true, true, true, true, true]);
      },
    });
    qnet.start();

    //
    const interval = setInterval(() => {
      /** Read all types, all channels */
      qnet.readSimulationData("booleanData");
      qnet.readSimulationData("integerData");
      qnet.readSimulationData("floatData");
    }, 1000);

    return () => {
      clearInterval(interval);
      qnet.stop();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <ModeToggle />
      <SystemParamsTable data={systemParams} />
      <hr />
      <Button>Hello Button</Button>
      <div className="mt-12"></div>
      <Progress value={progress} />
      <p>{booleanArray.toString()}</p>
      <p>{integerArray.toString()}</p>
      <p>{floatArray.toString()}</p>

      {floatArray.map((v, i) => (
        <div className="w-full my-2 px-8" key={i}>
          <Progress value={v * 100}></Progress>
        </div>
      ))}
    </div>
  );
}
