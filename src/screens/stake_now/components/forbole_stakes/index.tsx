import React from "react";
import { useTranslation } from "i18n";
import { convertToMoney } from "@utils/convert_to_money";
import {
  ForboleStakesCSS,
  StakesDetailsContainerCSS,
  ChartContainerCSS,
  FlexContainerCSS,
} from "./styles";
import HubDetail from "./components/hub_detail";
import Chart from "./components/chart";
import { useForboleStakesHook } from "./hooks";

const ForboleStakes = () => {
  const { t } = useTranslation("stake_now");
  const hookProps = useForboleStakesHook();
  const {
    cosmos,
    iris,
    terra,
    kava,
    likecoin,
    iov,
    band,
    selected,
  } = hookProps;
  const selectedData = {
    0: cosmos,
    1: iris,
    2: terra,
    3: kava,
    4: likecoin,
    5: iov,
    6: band,
  };
  const iconData = [
    "cosmos-hub",
    "iris",
    "terra",
    "kava",
    "likecoin",
    "iov",
    "band-protocol",
  ];
  return (
    <ForboleStakesCSS>
      <p>{t("tokensStakedWithForbole")}</p>
      {/* fix later */}
      <h1>${convertToMoney(30791930)}</h1>
      <FlexContainerCSS>
        <ChartContainerCSS>
          <Chart {...hookProps} />
        </ChartContainerCSS>
        <StakesDetailsContainerCSS>
          <HubDetail
            main
            name={iconData[selected]}
            denom={selectedData[selected]?.denom}
            title={selectedData[selected]?.title}
            // title={cosmos.title}
            atom={selectedData[selected]?.totalAtom}
            usd={selectedData[selected]?.totalMarketValue}
            perAtom={selectedData[selected]?.currentMarketValue}
          />
          <hr className="stats-hr" />
          <HubDetail
            denom={selectedData[selected]?.denom}
            title={selectedData[selected]?.voting.title}
            atom={selectedData[selected]?.voting.atom}
            percent={selectedData[selected]?.voting.percent}
          />
          <hr className="stats-hr" />
          <HubDetail
            denom={selectedData[selected]?.denom}
            title={selectedData[selected]?.selfDelegations.title}
            atom={selectedData[selected]?.selfDelegations.atom}
            percent={selectedData[selected]?.selfDelegations.percent}
          />
          <hr className="stats-hr" />
          <HubDetail
            denom={selectedData[selected]?.denom}
            title={selectedData[selected]?.otherDelegations.title}
            atom={selectedData[selected]?.otherDelegations.atom}
            percent={selectedData[selected]?.otherDelegations.percent}
          />
        </StakesDetailsContainerCSS>
      </FlexContainerCSS>
    </ForboleStakesCSS>
  );
};

export default ForboleStakes;
