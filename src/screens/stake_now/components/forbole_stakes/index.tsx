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
  const { cosmosNetwork, vsys, selected } = hookProps;
  console.log(`index:>>>>>>>>>>>>>>>`, hookProps);
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
    { network: cosmosNetwork, icon: "iris" },
    { network: vsys, icon: "v-system" },
  ];
  console.log(selectedData[selected]?.network[!!(selected == 9) && ""]?.title);
  console.log(
    selectedData[selected]?.network[selected]?.title ??
      selectedData[selected]?.network?.title
  );
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
            denom={
              // selectedData[selected]?.network?.denom ??
              selectedData[selected]?.network[selected]?.denom
            }
            title={
              // selectedData[selected]?.network[selected]?.title ??
              selectedData[selected]?.network?.title
            }
            // title={cosmos.title}
            atom={
              // selectedData[selected]?.network?.totalAtom ??
              selectedData[selected]?.network[selected]?.totalAtom
            }
            usd={
              // selectedData[selected]?.network?.totalMarketValue ??
              selectedData[selected]?.network[selected]?.totalMarketValue
            }
            perAtom={
              // selectedData[selected]?.network?.currentMarketValue ??
              selectedData[selected]?.network[selected]?.currentMarketValue
            }
          />
          <hr className="stats-hr" />
          <HubDetail
            denom={
              // selectedData[selected]?.network?.denom ??
              selectedData[selected]?.network[selected]?.denom
            }
            title={
              // selectedData[selected]?.network?.voting.title ??
              selectedData[selected]?.network[selected]?.voting.title
            }
            atom={
              // selectedData[selected]?.network?.voting.atom ??
              selectedData[selected]?.network[selected]?.voting.atom
            }
            percent={
              // selectedData[selected]?.network?.voting.percent ??
              selectedData[selected]?.network[selected]?.voting.percent
            }
          />
          <hr className="stats-hr" />
          <HubDetail
            denom={
              // selectedData[selected]?.network?.denom ??
              selectedData[selected]?.network[selected]?.denom
            }
            title={
              // selectedData[selected]?.network?.selfDelegations.title ??
              selectedData[selected]?.network[selected]?.selfDelegations.title
            }
            atom={
              // selectedData[selected]?.network?.selfDelegations.atom ??
              selectedData[selected]?.network[selected]?.selfDelegations.atom
            }
            percent={
              // selectedData[selected]?.network?.selfDelegations.percent ??
              selectedData[selected]?.network[selected]?.selfDelegations.percent
            }
          />
          <hr className="stats-hr" />
          <HubDetail
            denom={
              // selectedData[selected]?.network?.denom ??
              selectedData[selected]?.network[selected]?.denom
            }
            title={
              // selectedData[selected]?.network?.otherDelegations.title ??
              selectedData[selected]?.network[selected]?.otherDelegations.title
            }
            atom={
              selected == 9
                ? selectedData[selected]?.network?.otherDelegations.atom
                : selectedData[selected]?.network[selected]?.otherDelegations
                    .atom
            }
            percent={
              selected == 9
                ? selectedData[selected]?.network?.otherDelegations.percent
                : selectedData[selected]?.network[selected]?.otherDelegations
                    .percent
            }
          />
        </StakesDetailsContainerCSS>
      </FlexContainerCSS>
    </ForboleStakesCSS>
  );
};

export default ForboleStakes;
