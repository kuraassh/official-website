import React from "react";
import SocialMedia from "../social_media";
import Subscribe from "../subscribe";
import Forbole from "../forbole";
import FooterItems from "../footer_items";
import { MobileFooterCSS } from "./styles";

const MobileFooter = () => {
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
      <FooterItems />
      <Subscribe />
      <SocialMedia />
    </MobileFooterCSS>
  );
};

export default MobileFooter;

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
