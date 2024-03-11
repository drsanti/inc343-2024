"use client";

// npm install qnet-websocket-browser
import { QNetWebSocketBrowser } from "qnet-websocket-browser";

// check in the `lib/machine.simulator.ts`
import { MachineSimulator } from "@/lib/machine.simulator";

// check in the `lib/types.ts`
import { AnalogData, DigitalData, QNetWebSocketMessage } from "@/lib/types";

// react
import { useEffect, useState } from "react";

export const Ex05Visualize = () => {
  const [connectionInfo, setConnectionInfo] = useState<string>("unknown");
  const [analogData, setAnalogData] = useState<AnalogData>();
  const [digitalData, setDigitalData] = useState<DigitalData>();

  /** Start the machine */
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

  // Visualize data using TailwindCSS (text-based)
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 bg-[#ddd]">
      {/* Connection status */}
      <div>
        <span className="text-lg text-blue-600">Status: </span>
        <span className="text-lg text-green-600 font-semibold">
          {connectionInfo}
        </span>
      </div>

      {/* Machine time */}
      <div className="py-4">
        <span className="text-lg text-blue-600">Time: </span>
        <span className="text-lg text-blue-600 font-semibold">
          {analogData?.timestamp}
        </span>
      </div>

      {/* Analog data */}
      <h1 className="text-2xl text-orange-600 py-2">Machine Analog Sensors</h1>
      <ul>
        {analogData?.data.values.map((v, index) => (
          <li key={index}>
            <span>adc{index}: </span>{" "}
            <span className="font-semibold">{v.toFixed(3)}</span>
          </li>
        ))}
      </ul>

      {/* Digital Data */}
      <h1 className="text-2xl text-green-700 py-2">Machine Digital Sensors</h1>
      <ul>
        {digitalData?.data.values.map((v, index) => (
          <li key={index}>
            <span>adc{index}: </span>{" "}
            <span className="font-semibold">{v.toString()}</span>
          </li>
        ))}
      </ul>
    </main>
  );
};
