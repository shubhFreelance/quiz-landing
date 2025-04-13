import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import "./Results.css";

const Results = () => {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/result/current")
      .then((res) => {
        setResult(res.data.result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  console.log(result)

  return (
    <motion.div 
      className="results-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <div className="results-header">
        <motion.span
          className="live-indicator"
          animate={{
            scale: [1, 1.1, 1],
            backgroundColor: ["#ef4444", "#f87171", "#ef4444"]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
        />
        <h3>Latest Results</h3>
      </div>

      {/* Playing Card */}
      <motion.div className="result-card-container">
  {/* Playing Card */}
  <motion.div 
    className="playing-card spades"
    initial={{ rotate: -5 }}
    animate={{ rotate: 0 }}
    whileHover={{ rotate: 2 }}
  >
    {/* Card Corner (Top Left) */}
    <div className="card-corner top-left">
      <div className="card-value">{result}</div>
      <div className="card-suit">♠</div>
    </div>

    {/* Center Spade */}
    <div className="card-center">
      {isLoading ? (
        <motion.div 
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          ♠
        </motion.div>
      ) : (
        <>
          <div className="large-suit">♠</div>
          <div className="card-number">{result}</div>
        </>
      )}
    </div>

    {/* Card Corner (Bottom Right) */}
    <div className="card-corner bottom-right">
      <div className="card-value">{result}</div>
      <div className="card-suit">♠</div>
    </div>
  </motion.div>

  {/* Celebration Effects */}
  {!isLoading && (
    <>
      {/* Confetti Burst */}
      <div className="confetti-container">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="confetti"
            initial={{ 
              opacity: 0,
              x: 0,
              y: 0,
              rotate: 0
            }}
            animate={{ 
              opacity: [1, 1, 0],
              x: Math.random() * 200 - 100,
              y: Math.random() * -200 - 100,
              rotate: 360,
            }}
            transition={{
              duration: 2,
              delay: 0.5,
              ease: "easeOut"
            }}
            style={{
              backgroundColor: [
                '#ff0000', '#00ff00', '#0000ff', 
                '#ffff00', '#ff00ff', '#00ffff'
              ][Math.floor(Math.random() * 6)],
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 5 + 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Winning Text */}
      

      {/* Gold Sparkles */}
      <div className="sparkles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="sparkle"
            initial={{ 
              scale: 0,
              opacity: 0
            }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5,
              delay: 0.2 + i * 0.05,
              repeat: Infinity,
              repeatDelay: 3
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </>
  )}
</motion.div>

      {/* Update Timer */}
      {/* <div className="update-timer">
        Next update in: <span>15:23</span>
      </div> */}
    </motion.div>
  );
};

export default Results;