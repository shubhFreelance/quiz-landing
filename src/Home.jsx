import React from "react";

const Home = () => {
  return (
    <>
      {/* Header */}
      <div className="sticky-top">
        <h1 className="d-flex justify-content-center align-items-center text-white alex-brush-regular p-3 sm:text-3xl md:text-5xl blueColor ">
          Goa Winner
        </h1>
      </div>

      {/* Welcome */}
      <div className="d-flex flex-column justify-content-center align-items-center welcome parkinsans-all position-relative">
        <img
          src="./src/assets/cash-falling.gif"
          alt="a"
          className="giffy  img-fluid"
        />
        <p className=" m-0 fs-1 fw-bold text-center">
          Welcome to Goa Winner international!!
        </p>
        <p className="m-0 fs-1 fw-bold text-center">
          Live Satta Matka Fast Result!!
        </p>
        <img
          src="./src/assets/cash-falling.gif"
          alt="a"
          className="giffy2 d-none d-md-block"
        />
      </div>

      {/* section */}
      <div className=" d-center text-center flex-column blueSection">
        <h3 className="mt-md-0 mt-4">Satta Matka Goa Winner Result</h3>
        <p className=" w-75 mt-2 font16">
          Goa Winner is the No. 1 Matka Sites welcomes you full-heartedly. Here
          below you can find the perfect guess by the top guesser along with the
          Fast Matka Result too. Aaj Ka Satta Kalyan Fix Single Jodi free update
          here you find top Matka Market of India Kalyan Main Milan Rajdhani*
          *kalyan Matka Tips *fast Matka Result *kalyan Main Rajdhani Matka
          Chart *Matka Guessing by GOA WINNER By App Best Matka Site By Goa
          Winner
        </p>
      </div>

      {/* Live result */}
      <div className="d-center flex-column mt-4">
        <div className="d-flex justify-content-center align-items-center ">
          <span className="live"></span>
          <h3 className="m-0">Live Result</h3>
        </div>

        <div className="d-flex flex-column justify-content-evenly align-items-center w-100  mt-4 flex-lg-row gap-2 gap-lg-0">
          <div className="crd  d-center flex-column pointer">
            <h3>Kalyan</h3>
            <h3 className="">9am -12am</h3>
            <h2 className="fw-semibold color2">2</h2>
          </div>
          <div className="crd d-center flex-column pointer">
            <h3>Kalyan</h3>
            <h3 className="">12pm - 3pm</h3>
            <h2 className="fw-semibold color2">4</h2>
          </div>
          <div className="crd d-center flex-column pointer">
            <h3>Kalyan</h3>
            <h3 className="">3pm -6p m</h3>
            <h2 className="fw-semibold color2">7</h2>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="d-center mt-5 flex-column  ">
        <h3 className="w-100 text-center py-3 blueColor text-white">
          Introduction to Goa Winner Services
        </h3>
        <h5 className="mt-2">WHAT IS SATTA MATKA?</h5>
        <p className="text-center font16 w-75">
          Satta Matka originated in India and is one of the popular forms of
          Lottery and gambling games. The game involves placing bets on
          different numbers and earning potential winning on the outcome.
        </p>
        <h5>HOW DOES MATKA WORK?</h5>
        <p className="text-center font16 w-75">
          In Matka, players need to choose a specific set of numbers from any
          predefined range and place bets on these numbers so that while any
          random number drawn if the number is the same the player chooses, they
          win.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="d-center flex-column pt-2 mt-3 ">
        <h4 className=" w-100 text-center py-3 blueColor text-white">
          Disclaimer
        </h4>
        <p className="w-75 text-center mt-2 font12">
          Visiting this site and browsing it is strictly recommended at your own
          risk. Every information available here is only according to
          informational purpose and based on astrology and number calculations.
          We are no associated or affiliated with any illegal Matka business. We
          make sure we follow all rules and regulations of the regions where you
          are accessing the website. There are also chances that the website may
          be banned in your area and after that if you are using it, you are
          solely dependable and responsible for any damage, loss or legal action
          taken. If you are the one who does not like our disclaimer it is
          advised that you leave our website immediately. Copying of any
          information/contents posted on the website is strictly prohibited and
          against the law
        </p>
      </div>

      {/* Footer */}
      <div className="d-center blueColor pt-2 mt-3 text-white">
        <h4>Powered By Goa Winner</h4>
      </div>
      <div className="d-center m-0">
        <p className="m-0 font12">ⓒ2025 Goa Winner</p>
      </div>
    </>
  );
};

export default Home;
