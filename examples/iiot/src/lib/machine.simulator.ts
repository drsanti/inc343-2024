"use client";
import { QNetWebSocketBrowser } from "qnet-websocket-browser";
import { AnalogData, DigitalData } from "./types";
export class MachineSimulator {
  private static instance?: MachineSimulator;
  private qnet?: QNetWebSocketBrowser;
  private interval?: NodeJS.Timeout;

  private id: string = "";

  /** Actuator */
  private bits = [false, false, false, false, false]; // digital data
  private anas = [0.0, 0.0, 0.0, 0.0, 0.0]; // analog data

  private constructor() {}

  private running = false;
  public static getInstance = () =>
    this.instance ? this.instance : new MachineSimulator();

  public setAnalogActuators = (values: number[]) => {
    this.anas = values;
    const analog = this.getAnalog(); // get AnalogData
    analog.source = `machine-digital-actuators`;
    analog.data.values = this.anas; // replace its values
    this.qnet
      ?.getSubPub()
      .publish(`${this.id}/actuators/analog`, JSON.stringify(analog));
  };

  public setDigitalActuators = (values: boolean[]) => {
    this.bits = values;
    const digital = this.getDigital(); // get AnalogData
    digital.source = `machine-digital-actuators`;
    digital.data.values = this.bits; // replace its values
    this.qnet
      ?.getSubPub()
      .publish(`${this.id}/actuators/digital`, JSON.stringify(digital));
  };

  public start = (samplingInterval?: number): Promise<string> => {
    samplingInterval = samplingInterval ? samplingInterval : 1000;
    samplingInterval = samplingInterval < 500 ? 500 : samplingInterval;
    console.log(`sampling interval: ${samplingInterval}`);
    return new Promise((resolve, reject) => {
      if (this.running) resolve(this.id);
      this.running = true;
      this.qnet = new QNetWebSocketBrowser();
      this.qnet.connect().then(async () => {
        const id = await this.qnet?.getSubPub().requestUid();
        this.id = id?.content;
        resolve(this.id);
        console.log(
          `Machine-${this.id} running.\nSampling interval: ${samplingInterval}ms.`
        );
        this.interval = setInterval(() => {
          const analog = this.getAnalog();
          analog.source = `machine-analog-sensor`;
          this.qnet
            ?.getSubPub()
            .publish(`${this.id}/sensors/analog`, JSON.stringify(analog));

          const digital = this.getDigital();
          digital.source = `machine-digital-sensor`;
          this.qnet
            ?.getSubPub()
            .publish(`${this.id}/sensors/digital`, JSON.stringify(digital));
        }, samplingInterval);

        //
        this.setAnalogActuators(this.getAnalog().data.values);
        this.setDigitalActuators(this.getDigital().data.values);
        //
      });
    });
  };
  public stop = () => {
    clearInterval(this.interval);
    this.qnet?.disconnect();
    console.log(`Machine: stopped`);
    this.running = false;
  };

  private genAnalog = (timeScale: number) =>
    (Math.sin(performance.now() / (timeScale * 1000)) + 1) * 0.5;
  private getAnalog = (): AnalogData => {
    const timeScales = [1, 1.5, 2, 2.5, 3];
    const analog: AnalogData = {
      source: "machine",
      timestamp: new Date().toLocaleString(),
      data: {
        count: timeScales.length,
        values: timeScales.map((t) => 100.0 * this.genAnalog(t)),
      },
    };
    return analog;
  };

  private genDigital = () => Math.random() > 0.5;
  private getDigital = (): DigitalData => {
    const digital: DigitalData = {
      source: "machine",
      timestamp: new Date().toLocaleString(),
      data: {
        count: this.bits.length,
        values: this.bits.map((d) => this.genDigital()),
      },
    };
    return digital;
  };
}
