import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LotteryGame.css'; 

const LotteryGame = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextSession, setNextSession] = useState(null);
  const [activeSession, setActiveSession] = useState(null);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [betAmount, setBetAmount] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);

  const sessions = [
    { id: 1, name: 'Sridevi', startTime: 9, endTime: 11, theme: 'morning-theme' },
    { id: 2, name: 'Kalyan', startTime: 12, endTime: 14, theme: 'afternoon-theme' },
    { id: 3, name: 'Time Bazaar', startTime: 15, endTime: 17, theme: 'evening-theme' }
  ];

  const symbols = [
    { value: '0', color: 'symbol-red' },
    { value: '1', color: 'symbol-orange' },
    { value: '2', color: 'symbol-amber' },
    { value: '3', color: 'symbol-yellow' },
    { value: '4', color: 'symbol-lime' },
    { value: '5', color: 'symbol-green' },
    { value: '6', color: 'symbol-emerald' },
    { value: '7', color: 'symbol-teal' },
    { value: '8', color: 'symbol-cyan' },
    { value: '9', color: 'symbol-sky' },
    { value: 'A', color: 'symbol-blue' },
    { value: 'J', color: 'symbol-indigo' },
    { value: 'K', color: 'symbol-violet' },
    { value: 'Q', color: 'symbol-purple' },
    { value: 'JOKER', color: 'symbol-fuchsia' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      updateSessionInfo(now);
    }, 1000);
    
    updateSessionInfo(new Date());
    
    return () => clearInterval(timer);
  }, []);

  const updateSessionInfo = (now) => {
    const currentHour = now.getHours();
    let foundActive = false;
    let foundNext = false;
    let nextSessionInfo = null;

    for (const session of sessions) {
      if (currentHour >= session.startTime && currentHour < session.endTime) {
        setActiveSession(session);
        foundActive = true;
      } else if (currentHour < session.startTime && !foundNext) {
        nextSessionInfo = session;
        foundNext = true;
      }
    }

    if (!foundActive && !foundNext) {
      nextSessionInfo = { ...sessions[0], isTomorrow: true };
    }

    if (!foundActive) {
      setActiveSession(null);
    }

    setNextSession(nextSessionInfo);
  };

  const calculateTimeLeft = () => {
    if (!nextSession) return { hours: 0, minutes: 0, seconds: 0 };

    const now = new Date();
    let targetTime = new Date(now);

    if (nextSession.isTomorrow) {
      targetTime.setDate(targetTime.getDate() + 1);
      targetTime.setHours(nextSession.startTime, 0, 0, 0);
    } else {
      targetTime.setHours(nextSession.startTime, 0, 0, 0);
      if (targetTime <= now) {
        targetTime.setDate(targetTime.getDate() + 1);
      }
    }

    const difference = targetTime - now;
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60)) % 60;
    const seconds = Math.floor((difference / 1000)) % 60;

    return { hours, minutes, seconds };
  };

  const simulateDraw = () => {
    setIsDrawing(true);
    setTimeout(() => {
      setIsDrawing(false);
      const randomIndex = Math.floor(Math.random() * symbols.length);
      setSelectedSymbol(symbols[randomIndex]);
    }, 3000);
  };

  const handleBetChange = (amount) => {
    setBetAmount(prevAmount => {
      const newAmount = prevAmount + amount;
      return newAmount > 0 ? newAmount : 1;
    });
  };

  const { hours, minutes, seconds } = calculateTimeLeft();
  
  const timerVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: { repeat: Infinity, duration: 1 }
    }
  };

  return (
    <div className="lottery-game-container">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="lottery-game-content"
      >
        {/* Header */}
        <div className="lottery-header">
          <motion.div 
            className="stars-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </motion.div>

          <div className="header-content">
            <motion.h1 
              className="main-title"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
             GOA CARD INTERNATIONAL
            </motion.h1>
            <motion.div
              className="subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Select your lucky symbol, place your bet, and win up to 15x your stake!
            </motion.div>
          </div>
        </div>

        {/* Timer Section */}
        <motion.div 
          className="timer-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="next-draw-info">
            {nextSession ? (
              <span>Next Draw: <span className="next-draw-name">{nextSession.name}</span></span>
            ) : (
              <span>Calculating next session...</span>
            )}
          </div>
          
          <motion.div 
            className="timer-display"
            variants={timerVariants}
            animate="pulse"
          >
            <div className="time-block">
              <div className="time-value">{hours.toString().padStart(2, '0')}</div>
              <div className="time-label">HOURS</div>
            </div>
            <div className="time-block">
              <div className="time-value">{minutes.toString().padStart(2, '0')}</div>
              <div className="time-label">MINUTES</div>
            </div>
            <div className="time-block">
              <div className="time-value">{seconds.toString().padStart(2, '0')}</div>
              <div className="time-label">SECONDS</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Sessions */}
        <motion.div 
          className="sessions-grid"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { 
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {sessions.map((session, index) => (
            <motion.div
              key={session.id}
              className={`session-card ${session.theme} ${
                activeSession?.id === session.id ? 'active-session' : ''
              }`}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6 }
                }
              }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
            >
              <div className="session-content">
                <h3 className="session-name">{session.name}</h3>
                <p className="session-time">
                  🕒 {session.startTime > 12 ? session.startTime - 12 : session.startTime}
                  {session.startTime >= 12 ? 'PM' : 'AM'} - 
                  {session.endTime > 12 ? session.endTime - 12 : session.endTime}
                  {session.endTime >= 12 ? 'PM' : 'AM'}
                </p>
                
                {activeSession?.id === session.id && (
                  <motion.div 
                    className="live-badge"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      backgroundColor: ['#eab308', '#fef08a', '#eab308']
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity
                    }}
                  >
                    LIVE NOW
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Symbols Grid */}
        <motion.div 
          className="symbols-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.h2 
            className="symbols-title"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            🎯 Choose Your Lucky Symbol
          </motion.h2>
          
          <div className="symbols-grid">
            {symbols.map((symbol, idx) => (
              <motion.div
                key={idx}
                className={`symbol-card ${symbol.color} ${
                  selectedSymbol?.value === symbol.value ? 'selected-symbol' : ''
                }`}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 15px rgba(255,255,255,0.5)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSymbol(symbol)}
                animate={selectedSymbol?.value === symbol.value ? {
                  boxShadow: ["0 0 0px rgba(255,255,255,0.2)", "0 0 20px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0.2)"],
                } : {}}
                transition={selectedSymbol?.value === symbol.value ? {
                  repeat: Infinity,
                  duration: 1.5
                } : {}}
              >
                <span className="symbol-value">{symbol.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Betting Section */}
        <motion.div 
          className="betting-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="betting-content">
            <div className="bet-controls">
              <h3 className="bet-title">Your Bet</h3>
              
              <div className="amount-control">
                <div className="amount-label">Amount</div>
                <div className="amount-selector">
                  <motion.button 
                    className="amount-button decrease"
                    whileHover={{ backgroundColor: "#be185d" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBetChange(-5)}
                  >
                    -
                  </motion.button>
                  <div className="amount-display">
                    INR {betAmount}
                  </div>
                  <motion.button 
                    className="amount-button increase"
                    whileHover={{ backgroundColor: "#be185d" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleBetChange(5)}
                  >
                    +
                  </motion.button>
                </div>
              </div>

              <div className="quick-bets">
                {[10, 25, 50, 100].map(amount => (
                  <motion.button 
                    key={amount}
                    className="quick-bet-button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setBetAmount(amount)}
                  >
                    INR {amount}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="bet-summary">
              <div className="potential-win">
                <div className="win-label">Potential Win</div>
                <div className="win-amount">INR{betAmount * 15}</div>
              </div>

              <motion.button
                className="place-bet-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={simulateDraw}
                disabled={!selectedSymbol || isDrawing}
              >
                <span className="button-text">
                  {isDrawing ? 'Drawing...' : selectedSymbol ? 'Place Bet' : 'Select a Symbol'}
                </span>
                <motion.div
                  className="button-overlay"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Draw Animation */}
        <AnimatePresence>
          {isDrawing && (
            <motion.div
              className="draw-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="draw-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <h3 className="draw-title">Drawing Your Fortune!</h3>
                <div className="draw-animation">
                  {[...Array(3)].map((_, i) => (
                    <motion.div 
                      key={i}
                      className="draw-box"
                      animate={{
                        y: [0, -20, 0],
                        backgroundColor: ['#ec4899', '#f43f5e', '#ec4899']
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    >
                      <span className="draw-question">?</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div 
          className="game-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <p>© 2025 Goa Kard. Play responsibly. 18+ only.</p>
          <div className="footer-links">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Help</a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LotteryGame;
