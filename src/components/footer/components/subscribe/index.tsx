import React from "react";
import { Input } from "semantic-ui-react";
import { SubscribeCSS } from "./styles";

const Subscribe = () => {
  return (
    <SubscribeCSS>
      <h1>SUBSCRIBE</h1>
      <h2>Subscribe to our news and regular updates</h2>
      <Input action="SUBSCRIBE" placeholder="Your email address" />
    </SubscribeCSS>
  );
};

export default Subscribe;
