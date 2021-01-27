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
    akash,
    emoney,
    vsys,
    selected,
  } = hookProps;
  const selectedData = [
    { network: cosmos, icon: "cosmos-hub" },
    { network: iris, icon: "iris" },
    { network: terra, icon: "terra" },
    { network: kava, icon: "kava" },
    { network: likecoin, icon: "likecoin" },
    { network: iov, icon: "iov" },
    { network: band, icon: "band-protocol" },
    { network: akash, icon: "akash" },
    { network: emoney, icon: "e-money" },
    { network: vsys, icon: "v-system" },
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
            name={selectedData[selected].icon}
            denom={selectedData[selected]?.network.denom}
            title={selectedData[selected]?.network.title}
            // title={cosmos.title}
            atom={selectedData[selected]?.network.totalAtom}
            usd={selectedData[selected]?.network.totalMarketValue}
            perAtom={selectedData[selected]?.network.currentMarketValue}
          />
          <hr className="stats-hr" />
          <HubDetail
            denom={selectedData[selected]?.network.denom}
            title={selectedData[selected]?.network.voting.title}
            atom={selectedData[selected]?.network.voting.atom}
            percent={selectedData[selected]?.network.voting.percent}
          />
          <hr className="stats-hr" />
          <HubDetail
            denom={selectedData[selected]?.network.denom}
            title={selectedData[selected]?.network.selfDelegations.title}
            atom={selectedData[selected]?.network.selfDelegations.atom}
            percent={selectedData[selected]?.network.selfDelegations.percent}
          />
          <hr className="stats-hr" />
          <HubDetail
            denom={selectedData[selected]?.network.denom}
            title={selectedData[selected]?.network.otherDelegations.title}
            atom={selectedData[selected]?.network.otherDelegations.atom}
            percent={selectedData[selected]?.network.otherDelegations.percent}
          />
        </StakesDetailsContainerCSS>
      </FlexContainerCSS>
    </ForboleStakesCSS>
  );
};

export default ForboleStakes;
