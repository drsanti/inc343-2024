import "./App.css";
import { OpcDateTime } from "./components/opcDateTime";
import { OpcDateTimeInterval } from "./components/opcDateTimeInterval";
import { PageStyle } from "./components/pageStyle";

function App() {
  return (
    <>
      <PageStyle />
      <OpcDateTime />
      <OpcDateTimeInterval />
    </>
  );
}

export default App;
