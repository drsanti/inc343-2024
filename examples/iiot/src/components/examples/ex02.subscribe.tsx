"use client";

// npm install qnet-websocket-browser
import { QNetWebSocketBrowser } from "qnet-websocket-browser";

// check in the `lib/machine.simulator.ts`
import { MachineSimulator } from "@/lib/machine.simulator";

// check in the `lib/types.ts`
import { AnalogData, DigitalData, QNetWebSocketMessage } from "@/lib/types";

// react
import { useEffect, useState } from "react";

export const Ex02Subscribe = () => {
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

      /** Subscribe to the `id-analog` topic */
      qnet
        .getSubPub()
        .subscribe(`${id}/sensors/analog`, (message: QNetWebSocketMessage) => {
          /** Process the message */
          console.log(message);
        });

      /** Subscribe to the `id-digital` topic */
      qnet
        .getSubPub()
        .subscribe(`${id}/sensors/digital`, (message: QNetWebSocketMessage) => {
          /** Process the message */
          console.log(message);
        });
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
