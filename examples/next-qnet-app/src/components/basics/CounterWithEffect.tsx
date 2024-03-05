import { useEffect, useState } from "react";

export const CounterWithEffect = () => {
  // /** Example 1: Using the  `useEffect` */
  // let counter = 0;
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log(++counter);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  // return <h1 className="text-8xl">{counter}</h1>;

  /** Example 2: Using the `useEffect` with `useState` */
  // const [counter, setCounter] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCounter((cnt) => {
  //       console.log(++cnt);
  //       return cnt;
  //     });
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);
  // return <h1 className="text-8xl">{counter}</h1>;

  // /** Example 3: Using the `useEffect` with `fetch` */
  // const [localTime, setLocalTime] = useState("");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:9990/opc/api/v1/system/datetime/data/value/local"
  //       );
  //       const result = await response.json();
  //       setLocalTime(() => result.dateTime);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  //   return () => {};
  // }, []);
  // return <h1 className="text-4xl">{localTime}</h1>;

  /** Example 4: Using the `useEffect` with periodic `fetch` */
  const [localTime, setLocalTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => fetchData(), 1000);

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:9990/opc/api/v1/system/datetime/data/value/local"
        );
        const result = await response.json();
        setLocalTime(() => result.dateTime);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    return () => clearInterval(interval);
  }, []);
  return <h1 className="text-4xl">{localTime}</h1>;
};
