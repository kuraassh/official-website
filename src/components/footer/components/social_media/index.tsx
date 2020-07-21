import React from "react";
import { SocialMediaCSS } from "./styles";
import { Telegram, Facebook, Medium, Twitter, Github } from "../../../icons";

const SocialMedia = () => {
  return (
    <SocialMediaCSS>
      <a href="#">
        <Telegram />
      </a>
      <a href="#">
        <Facebook />
      </a>
      <a href="#">
        <Medium />
      </a>
      <a href="#">
        <Twitter />
      </a>
      <a href="#">
        <Github />
      </a>
    </SocialMediaCSS>
  );
};

export default SocialMedia;
