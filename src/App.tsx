import "./App.css";
import AttributesSelection from "./AttributesSelection/AttributesSelection";
import Divider from "./Components/Divider/Divider";
import Header from "./Header/Header";
import MonstersSelection from "./MonstersSelection/MonstersSelection";

function App() {
  return (
    <div className="app">
      <Header />
      <AttributesSelection />
      <Divider />
      <MonstersSelection />
    </div>
  );
}

export default App;
