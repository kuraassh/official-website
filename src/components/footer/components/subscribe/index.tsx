import React from "react";
import { Input } from "semantic-ui-react";
import { SubscribeCSS } from "./styles";

const Subscribe = () => {
  return (
    <SubscribeCSS>
      <div className="subscribe">
        <h1>SUBSCRIBE</h1>
        <h2>Subscribe to our news and regular updates</h2>
        <Input action="Subscribe" placeholder="Your email address" />
        <input type="text" placeholder="Your email address"></input>
        <button>SUBSCRIBE</button>
      </div>
    </SubscribeCSS>
  );
};

export default Subscribe;
