import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/result/last-15-days")
      .then((res) => {
        console.log(res.data);
        setData(res.data.days);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h3>Results Tables</h3>
      <div className="w-75 wrapper">
        <table className="tbl responsive">
          <thead className="tableHead">
            <tr>
              <th scope="col">Results - Date</th>
              <th scope="col">Session Number</th>
              <th scope="col">Results</th>
            </tr>
          </thead>
          <tbody>
            {data.map((day) =>
              day.results.map((res) => (
                <tr key={res.sessionId}>
                  <td>{day.date}</td>
                  <td>{res.sessionNumber}</td>
                  <td>{res.result}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
