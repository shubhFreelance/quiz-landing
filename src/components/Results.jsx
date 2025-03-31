import React, { useEffect, useState } from "react";
import spade from "/spade.svg";
import spades from "/spades.svg";
import axios from "axios";

const Results = () => {
  const [result, setResult] = useState("");

  useEffect(() => {
    axios
      .get("/api/result/current")
      .then((res) => {
        console.log(res.data);
        setResult(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <div className="d-flex justify-content-center align-items-center ">
        <span className="live"></span>
        <h3 className="m-0">Results</h3>
      </div>

      <div className="Cards mt-3">
        <img src={spade} alt="a" className="spade1" />
        <h4 className="Result1">{result}</h4>
        <h4 className="Result2">{result}</h4>
        <img src={spades} alt="a" className="spadeUp" />
        <img src={spades} alt="a" className="spadeDown" />
      </div>
    </div>
  );
};

export default Results;
