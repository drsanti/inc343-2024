import { useEffect } from "react";

export const PageStyle = () => {
  useEffect(() => {
    // Change page background to black
    document.body.style.backgroundColor = "black";
  }, []);

  return <></>;
};
