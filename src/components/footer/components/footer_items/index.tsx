import React from "react";
import Link from "next/link";
import { FooterItemsCSS } from "./styles";
import {
  forboleFooterItems,
  bigDipperFooterItems,
  desmosFooterItems,
} from "../../config";

const FooterItems = () => {
  return (
    <FooterItemsCSS>
      <hr />
      <div>
        {forboleFooterItems.map((x, i) => {
          if (i == 0) {
            return <li key={x.title}>{x.title}</li>;
          } else {
            return (
              <Link href={x.to} key={x.display}>
                <a>
                  <li>{x.display}</li>
                </a>
              </Link>
            );
          }
        })}
      </div>
      <hr />
      <div>
        {bigDipperFooterItems.map((y, i) => {
          if (i == 0) {
            return <li key={y.title}>{y.title}</li>;
          } else {
            return (
              <a href={y.to} key={y.to}>
                <li>{y.display}</li>
              </a>
            );
          }
        })}
      </div>
      <hr />
      <div>
        {desmosFooterItems.map((z, i) => {
          if (i == 0) {
            return <li key={z.title}>{z.title}</li>;
          } else {
            return (
              <a href={z.to} key={z.to}>
                <li>{z.display}</li>
              </a>
            );
          }
        })}
      </div>
      <hr />
    </FooterItemsCSS>
  );
};

export default FooterItems;
