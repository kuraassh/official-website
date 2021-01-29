import React from "react";
import classNames from "classnames";
import { useTranslation } from "i18n";
import { HubDetailCSS, StatDetailsCSS } from "./styles";
// finalize once more details are given
const HubDetail = (props: any) => {
  const {
    title = "",
    name = "",
    token = 0,
    percent = 0,
    main = false,
    usd = 0,
    perToken = 0,
    denom,
  } = props;

  const { t } = useTranslation("stake_now");

  return (
    <HubDetailCSS className={classNames({ main })}>
      <p className={classNames("title", { main })}>
        {!!main && <img src={`/static/images/icons/${name}.png`} />}
        {t(title)}
      </p>
      <StatDetailsCSS className={classNames({ main })}>
        <p className={classNames("token", { main })}>
          {token} {denom}
        </p>
        {main ? (
          <>
            <div className="main-only-content">
              <p className="usd">
                {usd} {t("usd")}
              </p>
              <p className="per-token">
                (${perToken}/${denom})
              </p>
            </div>
            <hr className="main-content-hr" />
          </>
        ) : (
          <p>{percent}%</p>
        )}
      </StatDetailsCSS>
    </HubDetailCSS>
  );
};

export default HubDetail;
