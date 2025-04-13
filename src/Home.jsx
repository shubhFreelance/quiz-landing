import React,{useState, useEffect} from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Results from "./components/Results";
import Table from "./components/Table";
import LotteryGame from "./components/LotteryGame";
import "./Home.css";

const Home = () => {

  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/result/today-result")
      .then((res) => {
        console.log(res.data)
        setResult(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  console.log(result)

  return (
    <div className="home-container">
      {/* Animated Header */}
      <motion.header 
        className="app-header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.h1 
          className="main-heading"
          initial={{ scale: 0.2 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          GOA KARD WINNER
          <motion.span 
            className="pulse-dot"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.h1>
      </motion.header>

      {/* Welcome Section */}
      <motion.section 
        className="welcome-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="welcome-content">
          <motion.img 
            src="/cash-falling.gif" 
            alt="Falling cash animation" 
            className="giffy"
            whileHover={{ scale: 1.05 }}
          />
          <div className="welcome-text">
            <motion.p 
              className="welcome-title"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
            >
              Welcome to Goa Winner International!!
            </motion.p>
            <motion.p 
              className="welcome-subtitle"
              initial={{ x: 20 }}
              animate={{ x: 0 }}
            >
              Live Satta Matka Fast Result!!
            </motion.p>
          </div>
          <motion.img 
            src="/cash-falling.gif" 
            alt="Falling cash animation" 
            className="giffy"
            whileHover={{ scale: 1.05 }}
          />
        </div>
      </motion.section>

      {/* Info Section */}
      <motion.section 
        className="info-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="section-title">Satta Matka Goa Kard Winner Result</h3>
        <motion.p 
          className="info-paragraph"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Goa Winner is the No. 1 Matka Sites welcomes you full-heartedly...
        </motion.p>
      </motion.section>

      <LotteryGame />

      {/* Live Result Section */}
      <motion.section 
        className="live-result-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="live-title-wrapper">
          <motion.span 
            className="live-dot"
            animate={{ 
              scale: [1, 1.2, 1],
              boxShadow: ["0 0 0 0 rgba(74, 222, 128, 0.7)", "0 0 0 10px rgba(74, 222, 128, 0)", "0 0 0 0 rgba(74, 222, 128, 0)"]
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <h3 className="live-title">Live Result</h3>
        </div>

        <motion.div 
          className="rounds-container"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          {result.map((item, index) => (
            <motion.div
              key={index}
              className="result-card"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
              whileHover={{ y: -5 }}
            >
              <h3>Round {item.sessionNumber}</h3>
              {/* <p>{item.time}</p> */}
              <motion.h2 
                className="result-number"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
              >
                {item.result}
              </motion.h2>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <Results />
      <Table />

      {/* Description Section */}
      <motion.section 
        className="description-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="section-heading">Introduction to Goa Winner Services</h3>
        <motion.div 
          className="info-block"
          whileHover={{ x: 5 }}
        >
          <h5>WHAT IS SATTA MATKA?</h5>
          <p className="info-paragraph">
            Satta Matka originated in India and is one of the popular forms...
          </p>
        </motion.div>
        <motion.div 
          className="info-block"
          whileHover={{ x: 5 }}
        >
          <h5>HOW DOES MATKA WORK?</h5>
          <p className="info-paragraph">
            In Matka, players need to choose a specific set of numbers...
          </p>
        </motion.div>
      </motion.section>

      {/* Disclaimer Section */}
      <motion.section 
        className="disclaimer-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <h4 className="section-heading">Disclaimer</h4>
        <motion.p 
          className="disclaimer-text"
          whileHover={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
        >
          Visiting this site and browsing it is strictly recommended at your own risk...
        </motion.p>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="footer-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="powered-by"
        >
          Powered By Goa Winner
        </motion.div>
        <motion.p 
          className="copyright"
          whileHover={{ color: "#f59e0b" }}
        >
          ⓒ2025 Goa Winner
        </motion.p>
      </motion.footer>
    </div>
  );
};

export default Home;