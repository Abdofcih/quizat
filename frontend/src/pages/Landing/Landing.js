import React from "react";
import "./Landing.css";
import { Logo } from "../../components";
import main from "../../assets/images/main.png";
const Landing = () => {
  return (
    <main>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* Start Landing info */}
        <div className="info">
          <h1>
            Quiz <span>Taking</span> app
          </h1>
          <p>Test your english level by taking quizes .</p>
          {/* button to Link */}
          <button to="/register" className="btn btn-hero">
            Login/Register
          </button>
        </div>
        {/* End Landing info */}
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </main>
  );
};

export default Landing;
