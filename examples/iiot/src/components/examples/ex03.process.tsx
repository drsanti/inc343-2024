"use client";

// npm install qnet-websocket-browser
import { QNetWebSocketBrowser } from "qnet-websocket-browser";

// check in the `lib/machine.simulator.ts`
import { MachineSimulator } from "@/lib/machine.simulator";

// check in the `lib/types.ts`
import { AnalogData, DigitalData, QNetWebSocketMessage } from "@/lib/types";

// react
import { useEffect, useState } from "react";

export const Ex03Process = () => {
  const startMachine = (): QNetWebSocketBrowser => {
    /** Create instance */
    const qnet = new QNetWebSocketBrowser();

    /** Connect to server (server is running in docker) */
    qnet.connect().then(async () => {
      /** Get machine instance */
      const machine = MachineSimulator.getInstance();

      /** Start the machine and its id */
      const id = await machine.start();

      /** Subscribe to the `id-/sensors/analog` topic */
      qnet
        .getSubPub()
        .subscribe(`${id}/sensors/analog`, (message: QNetWebSocketMessage) => {
          /** Process the message */
          processAnalog(message);
        });

      /** Subscribe to the `id/sensors/digital` topic */
      qnet
        .getSubPub()
        .subscribe(`${id}/sensors/digital`, (message: QNetWebSocketMessage) => {
          /** Process the message */
          processDigital(message);
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

  /** Process analog data */
  const processAnalog = (message: QNetWebSocketMessage) => {
    try {
      /** Unpack the message */
      const analogData: AnalogData = JSON.parse(message.content);
      console.table(analogData);
    } catch (e: any) {
      console.error(e.toMessage());
    }
  };

  /** Process digital data */
  const processDigital = (message: QNetWebSocketMessage) => {
    try {
      /** Unpack the message */
      const digitalData: DigitalData = JSON.parse(message.content);
      console.log(digitalData);
    } catch (e: any) {
      console.error(e.toMessage());
    }
  };

  /** Run */
  useEffect(() => {
    const qnet = startMachine();
    return stopMachine(qnet);
  }, []);

  return <></>;
};
