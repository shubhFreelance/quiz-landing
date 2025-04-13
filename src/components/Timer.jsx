import { useState, useEffect } from 'react';

export default function Timer() {
  const [time, setTime] = useState({
    hours: 2,
    minutes: 24,
    seconds: 45
  });
  
  const [activeSession, setActiveSession] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Demo effect to simulate countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { ...prevTime, hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          // Just for demo purposes - toggle between active/inactive
          setActiveSession({ name: "Golden Lucky Draw" });
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
      
      // Trigger pulse animation every 10 seconds
      if (time.seconds % 10 === 0) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [time]);
  
  return (
    <div className="max-w-3xl mx-auto my-8">
      {/* Header notification */}
      <div className="text-center text-sm text-gray-500 italic mb-2">
        Next draw starts in {Math.floor(Math.random() * 45) + 15} minutes
      </div>
      
      {/* Main timer container */}
      <div className={`relative overflow-hidden rounded-xl shadow-lg ${activeSession ? 'bg-gradient-to-r from-purple-600 to-indigo-700' : 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500'}`}>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-white bg-opacity-10"></div>
          <div className="absolute bottom-8 right-8 w-20 h-20 rounded-full bg-white bg-opacity-10"></div>
          <div className="absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-white bg-opacity-10"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 p-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            {activeSession ? 'Current Session in Progress' : 'Next Session Starts In'}
          </h3>
          
          {activeSession ? (
            <div className="text-center py-6 px-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg mb-4">
              <p className="text-xl font-semibold text-white mb-2">
                {activeSession.name} is currently active!
              </p>
              <button className="mt-4 px-8 py-3 bg-white text-purple-700 font-bold rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
                Place Your Bet Now
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-center space-x-6 mb-6">
                <div className={`text-center transform ${isAnimating ? 'scale-110' : ''} transition-transform duration-300`}>
                  <div className="text-4xl font-bold text-white bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white border-opacity-20 w-24 h-28 flex items-center justify-center">
                    {time.hours.toString().padStart(2, '0')}
                  </div>
                  <span className="text-sm font-medium text-white mt-2 block">Hours</span>
                </div>
                
                <div className="text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-yellow-400 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative text-4xl font-bold text-white bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white border-opacity-20 w-24 h-28 flex items-center justify-center">
                    {time.minutes.toString().padStart(2, '0')}
                  </div>
                  <span className="text-sm font-medium text-white mt-2 block">Minutes</span>
                </div>
                
                <div className={`text-center ${isAnimating ? 'animate-pulse' : ''}`}>
                  <div className="text-4xl font-bold text-white bg-white bg-opacity-20 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white border-opacity-20 w-24 h-28 flex items-center justify-center">
                    {time.seconds.toString().padStart(2, '0')}
                  </div>
                  <span className="text-sm font-medium text-white mt-2 block">Seconds</span>
                </div>
              </div>
              
              <div className="text-center">
                <button className="px-8 py-3 bg-white text-pink-600 font-bold rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
                  Remind Me
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom decoration */}
        <div className="h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
      </div>
      
      {/* Recent winners or stats could go here */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Over 2,000 players waiting for the next session
      </div>
    </div>
  );
}