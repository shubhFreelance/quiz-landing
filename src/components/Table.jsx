import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Table.css";

const Table = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/result/last-15-days")
      .then((res) => {
        setData(res.data.days);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // Group data by date with sessions
  const groupedData = data.reduce((acc, day) => {
    const sessions = {
      1: null,
      2: null,
      3: null,
      date: day.date
    };
    
    day.results.forEach(res => {
      sessions[res.sessionNumber] = res.result;
    });
    
    return [...acc, sessions];
  }, []);

  return (
    <motion.div 
      className="table-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <motion.h3
        className="table-title"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        Results History
      </motion.h3>

      <div className="table-wrapper">
        {isLoading ? (
          <motion.div 
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            ♠
          </motion.div>
        ) : (
          <motion.table 
            className="results-table"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
          >
            <thead>
              <tr className="header-row">
                <th className="date-header">DATE</th>
                <th colSpan="3" className="session-header">SESSION</th>
              </tr>
              <tr className="subheader-row">
                <th></th>
                <th>Round 1</th>
                <th>Round 2</th>
                <th>Round 3</th>
              </tr>
            </thead>
            <tbody>
              {groupedData.map((day, index) => (
                <motion.tr 
                  key={index}
                  className="data-row"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "rgba(251, 191, 36, 0.1)" }}
                >
                  <td className="date-cell">{day.date}</td>
                  <td className={`result-cell ${day[1] === "JOKER" ? "joker" : ""}`}>
                    {day[1] || "-"}
                  </td>
                  <td className={`result-cell ${day[2] === "JOKER" ? "joker" : ""}`}>
                    {day[2] || "-"}
                  </td>
                  <td className={`result-cell ${day[3] === "JOKER" ? "joker" : ""}`}>
                    {day[3] || "-"}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        )}
      </div>
    </motion.div>
  );
};

export default Table;