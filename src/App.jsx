import axios from "axios";
import "./App.css";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  axios.defaults.baseURL = "http://localhost:5001";

  return (
    <>
      <Home />
    </>
  );
}

export default App;
