import "./App.css";

const message = `Welcome to React+Tailwind`;
const btnText = `Click me for nothing`;
function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">{message}</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {btnText}
      </button>
    </div>
  );
}

export default App;
