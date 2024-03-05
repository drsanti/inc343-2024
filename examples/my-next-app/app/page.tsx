"use client";
import { Progress } from "@/components/ui/progress";
import { QNetBrowserSocket } from "qnetbrowsersocket";
import { useEffect, useState } from "react";
export default function Home() {
  const [time, setTime] = useState<string>("");
  const [counter, setCounter] = useState<number>(0);
  const [highRes, setHighRes] = useState<number>(0);

  useEffect(() => {
    const qnet = new QNetBrowserSocket({
      onMessage: (msg: string) => {
        /** console.log(msg) to check how many things sent from server */
        const json = JSON.parse(msg);
        setTime(() => json.systemTime);
        setCounter(() => json.counter);
        setHighRes(() => json.highResolutionTime);
      },
    });
    qnet.start().then((s) => {
      console.log(s);
    });
    return () => {
      qnet.stop();
    };
  }, []);

  return (
    <div>
      <p>Time: {time}</p>
      <p>Counter:{counter}</p>
      <p>{highRes}</p>
      <button className="bg-red-500 text-white w-[300px] px-4 py-2 rounded">
        {highRes}
      </button>
      <Progress value={counter % 100} />
    </div>
  );
}
