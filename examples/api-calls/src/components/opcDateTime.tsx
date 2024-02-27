import { useEffect, useState } from "react";

export const OpcDateTime = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9990/opc/api/v1/system/datetime")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="bg-blue-300 shadow-md rounded-md p-4 m-12">
      <h2 className="text-lg text-white font-semibold mb-2">
        OpcDateTime Data
      </h2>
      <hr className="bg-blue-100 h-[1px] my-2" />
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
    </div>
  );
};
