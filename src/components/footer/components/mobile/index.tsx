import React from "react";
import SocialMedia from "../social_media";
import Subscribe from "../subscribe";
import Forbole from "../forbole";
import { MobileFooterCSS } from "./styles";

const MobileFooterLoop = () => {
  const forbole = ["Forbole", "Stake Now", "Staking"];
  const bigdipper = ["Big Dipper", "Source Code", "Issues"];
  const desmos = ["Desmos", "Souce Code", "Issues"];
  // const items: string[] = [];

  // for (const [index, value] of elements.entries()) {
  //   items.push(<li key={index}>{value}</li>);
  // }

  return (
    <MobileFooterCSS>
      <Forbole />
      <hr />
      <div>
        {forbole.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </div>
      <hr />
      <div>
        {bigdipper.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </div>
      <hr />
      <div>
        {desmos.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </div>
      <hr />
      <Subscribe />
      <SocialMedia />
    </MobileFooterCSS>
  );
};

export default MobileFooterLoop;

/*
const MobileFooter = () => {
  return (
    <footer>
      <Forbole />
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
*/
