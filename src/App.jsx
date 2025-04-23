import axios from "axios";
import "./App.css";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  axios.defaults.baseURL = "https://api.goawinner.fun";

  return (
    <>
      <Home />
    </>
  );
}

export default App;
