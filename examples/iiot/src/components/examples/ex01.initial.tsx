"use client";

// npm install qnet-websocket-browser
import { QNetWebSocketBrowser } from "qnet-websocket-browser";

// check in the `lib/machine.simulator.ts`
import { MachineSimulator } from "@/lib/machine.simulator";

// check in the `lib/types.ts`
import { AnalogData, DigitalData, QNetWebSocketMessage } from "@/lib/types";

// react
import { useEffect, useState } from "react";

export const Ex01Initial = () => {
  /** Start the machine */
  const startMachine = (): QNetWebSocketBrowser => {
    /** Create instance */
    const qnet = new QNetWebSocketBrowser();

    /** Connect to server (server is running in docker) */
    qnet.connect().then(async () => {
      /** Update connection status */

      /** Get machine instance */
      const machine = MachineSimulator.getInstance();

      /** Start the machine and its id */
      const id = await machine.start();

      /** Print the machine id */
      console.log(id);
    });
    return qnet;
  };

  /** Stop the machine */
  const stopMachine = (qnet: QNetWebSocketBrowser): void => {
    /** Disconnect from the server */
    qnet.disconnect();
    /** Stop the machine */
    MachineSimulator.getInstance().stop();
  };

  /** Run */
  useEffect(() => {
    const qnet = startMachine();
    return stopMachine(qnet);
  }, []);

  return <></>;
};
