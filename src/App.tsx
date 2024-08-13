import "./App.css";
import { ApplicationExplorer } from "./components";
import { ApplicationProvider } from "./context/application/application-context";

function App() {
  return (
    <ApplicationProvider>
      <ApplicationExplorer />
    </ApplicationProvider>
  );
}

export default App;
