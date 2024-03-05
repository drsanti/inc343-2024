import { useState } from "react";

const buttonStyle = `text-white text-xl m-2 px-3 py-3 min-w-[140px] rounded-xl`;
const wrapperStyle = `flex flex-col bg-black h-screen items-center justify-center`;
const counterStyle = `text-white text-5xl my-8`;

const MyButton = (props: any) => {
  const btnStyle = `${buttonStyle} ${props.style ?? "bg-green-800"}`;
  return (
    <button onClick={props.onClick} className={btnStyle}>
      {props.text ?? "MyButton"}
    </button>
  );
};

const PlusOneButton = ({ onClick }: any) => {
  return (
    <MyButton text={"+1"} style={"bg-green-800"} onClick={onClick}></MyButton>
  );
};

const PlusTwoButton = ({ onClick }: any) => {
  return (
    <MyButton text={"+2"} style={"bg-blue-600"} onClick={onClick}></MyButton>
  );
};

export const CounterWithState = () => {
  console.log(`CounterWithState`);
  // /** Example 1:  Initialize the UI */
  // let counter = 0;
  // return (
  //   <div className={wrapperStyle}>
  //     <p className={counterStyle}>Counter: {counter}</p>
  //     <div className="flex flex-row">
  //       <PlusOneButton onClick={() => (counter += 1)}></PlusOneButton>
  //       <PlusTwoButton onClick={() => (counter += 2)}></PlusTwoButton>
  //     </div>
  //   </div>
  // );

  // /** Example 2:  Declare the state */
  // const [counter, setCounter] = useState<number>(123);
  // return (
  //   <div className={wrapperStyle}>
  //     <p className={counterStyle}>Counter: {counter}</p>
  //     <div className="flex flex-row">
  //       <PlusOneButton onClick={() => {}}></PlusOneButton>
  //       <PlusTwoButton onClick={() => {}}></PlusTwoButton>
  //     </div>
  //   </div>
  // );

  /** Example 2: Change the value of the state */
  const [counter, setCounter] = useState<number>(123);
  const plus = (v: number) => {
    setCounter((previousValue) => previousValue + v);
  };
  return (
    <div className={wrapperStyle}>
      <p className={counterStyle}>Counter: {counter}</p>
      <div className="flex flex-row">
        <PlusOneButton onClick={() => plus(1)}></PlusOneButton>
        <PlusTwoButton onClick={() => plus(2)}></PlusTwoButton>
      </div>
    </div>
  );
};
