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
  const { cosmosNetwork, iris, vsys, selected } = hookProps;
  console.log(`index:>>>>>>>>>>>>>>>`, cosmosNetwork);
  //console.log(selectedData[selected]?.network)
  const selectedData = [
    { network: cosmosNetwork, icon: "cosmos-hub" },
    { network: cosmosNetwork, icon: "terra" },
    { network: cosmosNetwork, icon: "kava" },
    { network: cosmosNetwork, icon: "likecoin" },
    { network: cosmosNetwork, icon: "iov" },
    { network: cosmosNetwork, icon: "band-protocol" },
    { network: cosmosNetwork, icon: "akash" },
    { network: cosmosNetwork, icon: "e-money" },
    { network: iris, icon: "iris" },
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
            name={selectedData[selected]?.icon}
            denom={selectedData[selected]?.network[selected]?.denom}
            title={selectedData[selected]?.network[selected]?.title}
            // title={cosmos.title}
            atom={selectedData[selected]?.network[selected]?.totalAtom}
            usd={selectedData[selected]?.network[selected]?.totalMarketValue}
            perAtom={
              selectedData[selected]?.network[selected]?.currentMarketValue
            }
          />
          <hr className="stats-hr" />
          <HubDetail
            denom={selectedData[selected]?.network[selected]?.denom}
            title={selectedData[selected]?.network[selected]?.voting.title}
            atom={selectedData[selected]?.network[selected]?.voting.atom}
            percent={selectedData[selected]?.network[selected]?.voting.percent}
          />
          <hr className="stats-hr" />
          <HubDetail
            denom={selectedData[selected]?.network[selected]?.denom}
            title={
              selectedData[selected]?.network[selected]?.selfDelegations.title
            }
            atom={
              selectedData[selected]?.network[selected]?.selfDelegations.atom
            }
            percent={
              selectedData[selected]?.network[selected]?.selfDelegations.percent
            }
          />
          <hr className="stats-hr" />
          <HubDetail
            denom={selectedData[selected]?.network[selected]?.denom}
            title={
              selectedData[selected]?.network[selected]?.otherDelegations.title
            }
            atom={
              selectedData[selected]?.network[selected]?.otherDelegations.atom
            }
            percent={
              selectedData[selected]?.network[selected]?.otherDelegations
                .percent
            }
          />
        </StakesDetailsContainerCSS>
      </FlexContainerCSS>
    </ForboleStakesCSS>
  );
};

export default ForboleStakes;
