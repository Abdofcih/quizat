import React from "react";
import "./Landing.css";
import { Logo } from "../../components";
import main from "../../assets/images/main.png";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <main className="appLanding">
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
          <Link to="/register" className="btn btn-hero">
            Get started - it's free
          </Link>
        </div>
        {/* End Landing info */}
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </main>
  );
};

export default Landing;
