// "use client";
// import { useEffect, useState } from "react";
// const boxCls = `text-white w-[100px] px-4 py-2 rounded text-center m-2`;
// const boxRed = `bg-red-500 ${boxCls}`;
// const boxGreen = `bg-green-500 ${boxCls}`;
// export default function Home() {
//   const N = 200;

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
//       <div className="flex flex-col bg-black w-1/2 p-4 rounded-xl">
//         <h1 className="text-white text-4xl">Control Panel</h1>
//         <div className="flex flex-row justify-center">
//           <button className="bg-green-600 text-white p-2 rounded-md py-4 m-4 flex-grow-[2]">
//             Start
//           </button>
//           <button className="bg-red-600 text-white p-2 rounded-md py-4 m-4 flex-grow-[1]">
//             Stop
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from "react";
// const boxCls = `text-white w-[100px] px-4 py-2 rounded text-center m-2`;
// const boxRed = `bg-red-500 ${boxCls}`;
// const boxGreen = `bg-green-500 ${boxCls}`;
// export default function Home() {
//   const N = 200;
//   const getSensorValues = () => {
//     const values = [];
//     for (let i = 0; i < N; i++) {
//       // values.push(Math.random() * 100);
//       values.push(i);
//     }
//     return values;
//   };
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500">
//       <div className="flex flex-wrap">
//         {getSensorValues().map((value, index) => (
//           <div className={value > N / 2 ? boxRed : boxGreen}>{value}</div>
//         ))}
//       </div>
//     </div>
//   );
// }
