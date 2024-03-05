import { useState } from "react";

const style = `flex flex-row items-center justify-center h-screen font-medium bg-black text-gray-200`;

const buttonStyle = `text-white text-xl m-2 px-3 py-3 min-w-[140px] rounded-xl`;

/** Using props */
const MyButton = (props: any) => {
  const btnStyle = `${buttonStyle} ${props.style ?? "bg-green-800"}`;
  return (
    <button onClick={props.onClick} className={btnStyle}>
      {props.text ?? "MyButton"}
    </button>
  );
};

/** Using props with Destructuring */
const MySquareButton = ({ text, style, onClick }: any) => {
  const btnStyle = `${buttonStyle} ${style ?? "bg-yellow-800"} rounded-[0px]`;
  return (
    <button onClick={onClick} className={btnStyle}>
      {text ?? "MyButton"}
    </button>
  );
};

const PlusOneButton = ({ onClick }: any) => {
  return (
    <MyButton text={"+1"} style={"bg-green-600"} onClick={onClick}></MyButton>
  );
};

const PlusTwoButton = ({ onClick }: any) => {
  return (
    <MyButton text={"+2"} style={"bg-green-600"} onClick={onClick}></MyButton>
  );
};

export const ComponentAndProps = () => {
  //   /* Example 1: Simple Hello World */
  //   return <div>Hello, World</div>;

  //   /* Example 2: Style (TailwindCSS) */
  //   return <div className={style}>Hello, World</div>;
  //
  //   /** Example 3: Variable */
  //   const x = 1.12;
  //   return <div className={style}>{x}</div>;
  //
  //   /** Example 4: Expression */
  //   return <div className={style}>{Math.random().toFixed(2)}</div>;
  //
  //   /** Example 5: Function */
  //   const f = () => {
  //     return Math.random() * 100;
  //   };
  //   return <div className={style}>{f().toFixed(2)}</div>;

  //   /** Example 6: Child Component */
  //   return (
  //     <div className={style}>
  //       <MyButton></MyButton>
  //     </div>
  //   );

  //   /** Example 7: Props - See the MyButton*/
  //   return (
  //     <div className={style}>
  //       <MyButton text={"Click Me"} style={"bg-red-600"}>
  //       </MyButton>
  //     </div>
  //   );

  //   /** Example 8: Destructuring Props - See the MySquareButton*/
  //   return (
  //     <div className={style}>
  //       <MySquareButton text={"Click Me"} style={"bg-blue-500"}>
  //       </MySquareButton>
  //     </div>
  //   );

  //   /** Example 9: event */
  //   return (
  //     <div className={style}>
  //       <MyButton onClick={() => alert("You clicked me!!")}>Click Me</MyButton>
  //     </div>
  //   );

  //   /** Example 10: event handler */
  //   const clickHandler = () => {
  //     console.log("You clicked me");
  //   };
  //   return (
  //     <div className={style}>
  //       <MyButton onClick={() => clickHandler()}>Click Me</MyButton>
  //     </div>
  //   );

  //   /** Example 11: event data */
  //   const clickHandler = (e: any) => {
  //     console.log(e.target.innerHTML);
  //   };
  //   return (
  //     <div className={style}>
  //       <MyButton
  //         text={"Button 1"}
  //         onClick={(e: any) => clickHandler(e)}
  //       ></MyButton>
  //       <MyButton
  //         text={"Button 2"}
  //         onClick={(e: any) => clickHandler(e)}
  //       ></MyButton>
  //     </div>
  //   );

  //   /** Example 12: counter with clickHandler*/
  //   let counter = 0;
  //   const clickHandler = (v: number) => {
  //     counter += v;
  //     console.log(counter);
  //   };
  //   return (
  //     <div className={style}>
  //       <MyButton text="+1" onClick={() => clickHandler(1)}></MyButton>
  //       <MyButton text="+2" onClick={() => clickHandler(2)}></MyButton>
  //     </div>
  //   );

  //   /** Example 13: counter w/ console.log */
  //   let counter = 0;
  //   return (
  //     <div className={style}>
  //       <MyButton
  //         text="+1"
  //         style="bg-red-500"
  //         onClick={() => console.log((counter += 1))}
  //       ></MyButton>
  //       <MyButton
  //         text="+2"
  //         style="bg-blue-500"
  //         onClick={() => console.log((counter += 2))}
  //       ></MyButton>
  //     </div>
  //   );

  //   /** Example 14: counter without state (cannot see the changes) */
  //   let counter = 0;
  //   return (
  //     <div className="flex flex-col bg-black h-screen items-center justify-center">
  //        <p className="text-white text-5xl my-8">Counter: {counter}</p>
  //       <div className="flex flex-row">
  //         <MyButton
  //           text={"+1"}
  //           style={"bg-green-600"}
  //           onClick={() => (counter += 1)}
  //         ></MyButton>
  //         <MyButton
  //           text={"+2"}
  //           style={"bg-green-800"}
  //           onClick={() => (counter += 2)}
  //         ></MyButton>
  //       </div>
  //     </div>
  //   );

  /** Example 15: Simplify the code using components and style variables. */
  let counter = 0;
  const wrapperStyle = `flex flex-col bg-black h-screen items-center justify-center`;
  const counterStyle = `text-white text-5xl my-8`;
  return (
    <div className={wrapperStyle}>
      <p className={counterStyle}>Counter: {counter}</p>
      <div className="flex flex-row">
        <PlusOneButton onClick={() => (counter += 1)}></PlusOneButton>
        <PlusTwoButton onClick={() => (counter += 2)}></PlusTwoButton>
      </div>
    </div>
  );
};
