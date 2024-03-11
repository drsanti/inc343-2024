"use client";

// npm install qnet-websocket-browser
import { QNetWebSocketBrowser } from "qnet-websocket-browser";

// check in the `lib/machine.simulator.ts`
import { MachineSimulator } from "@/lib/machine.simulator";

// check in the `lib/types.ts`
import { AnalogData, DigitalData, QNetWebSocketMessage } from "@/lib/types";

// react
import { useEffect, useState } from "react";

export const Ex04SetState = () => {
  /** Connection status state */
  const [connectionInfo, setConnectionInfo] = useState<string>("unknown");

  /** Analog data state */
  const [analogData, setAnalogData] = useState<AnalogData>();

  /** Digital data state */
  const [digitalData, setDigitalData] = useState<DigitalData>();

  const startMachine = (): QNetWebSocketBrowser => {
    /** Create instance */
    const qnet = new QNetWebSocketBrowser();

    /** Connect to server (server is running in docker) */
    qnet.connect().then(async () => {
      /** Update connection status */
      setConnectionInfo("Connected");

      /** Get machine instance */
      const machine = MachineSimulator.getInstance();

      /** Start the machine and its id */
      const id = await machine.start();

      /** Subscribe to the `id-analog` topic */
      qnet
        .getSubPub()
        .subscribe(`${id}/sensors/analog`, (message: QNetWebSocketMessage) => {
          /** Process the message */
          processAnalog(message);
        });

      /** Subscribe to the `id-digital` topic */
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

      /** set state and update ui */
      setAnalogData(analogData);
    } catch (e: any) {
      console.error(e.toMessage());
    }
  };

  /** Process digital data */
  const processDigital = (message: QNetWebSocketMessage) => {
    try {
      /** Unpack the message */
      const digitalData: DigitalData = JSON.parse(message.content);

      /** set state and update ui */
      setDigitalData(digitalData);
    } catch (e: any) {
      console.error(e.toMessage());
    }
  };

  /** Run */
  useEffect(() => {
    const qnet = startMachine();
    return stopMachine(qnet);
  }, []);

  // Display data (simple text)
  return (
    <div>
      <p>{connectionInfo}</p>
      <p>{analogData?.data.values.toString()}</p>
      <hr />
      <p>{digitalData?.data.values.toString()}</p>
    </div>
  );
};
