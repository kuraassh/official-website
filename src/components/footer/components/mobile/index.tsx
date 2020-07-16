import React from "react";
import SocialMedia from "../social_media";
import Subscribe from "../subscribe";

const MobileFooter = () => {
  return (
    <footer>
      <img
        src="/forbole_logo/forbole_logo_white.svg"
        alt="forbole footer logo"
      ></img>
      <p>YOUR TRUSTED STAKING PARTNER</p>
      <ul className="forbole-footer-links">
        <li>Forbole</li>
        <li>Stake Now</li>
        <li>Staking</li>
      </ul>
      <ul className="big-dipper-footer-links">
        <li>Big Dipper</li>
        <li>Source Code</li>
        <li>Issues</li>
      </ul>
      <ul className="desmos-footer-links">
        <li>Desmos</li>
        <li>Source Code</li>
        <li>Issues</li>
      </ul>
      <Subscribe />
      <SocialMedia />
    </footer>
  );
};

export default MobileFooter;
