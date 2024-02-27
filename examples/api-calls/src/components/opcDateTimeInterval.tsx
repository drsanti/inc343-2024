import { useEffect, useState } from "react";

export const OpcDateTimeInterval = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:9990/opc/api/v1/system/datetime/data/value/local")
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error));
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval); //Clear interval on component unmount
  }, []);

  return (
    <div>
      <div className="bg-purple-300 shadow-md rounded-md p-4 m-12">
        <h2 className="text-lg text-white font-semibold mb-2">
          OpcDateTimeInterval Data
        </h2>
        <hr className="bg-blue-100 h-[1px] my-2" />
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
      </div>
      <div className="text-center">
        <h1 className="text-white text-8xl">
          {data ? (data["dateTime"] as String).split(", ")[1] : ""}
        </h1>
      </div>
    </div>
  );
};
