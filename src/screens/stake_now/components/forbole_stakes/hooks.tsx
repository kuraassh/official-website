import { useState, useEffect } from "react";
import axios from "axios";
import * as R from "ramda";
import { getNetworkInfo } from "@utils/network_info";
import { networkFunctions } from "../../utils";
import { convertToMoney, moneyToInt } from "@utils/convert_to_money";
import { cosmosData, irisData, vsysData } from "./config";

// const solanaWeb3 = require("@solana/web3.js");

export const useForboleStakesHook = () => {
  const [selected, setSelected] = useState(0);

  // Cosmos Hub / ATOM
  const [cosmosNetwork, setCosmosNetwork] = useState([
    {
      title: cosmosData[0].title ?? null,
      totalToken: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[0].denom ?? null,
      voting: {
        title: "votingPower",
        token: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        token: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        token: 0,
        percent: 0,
      },
    },
    {
      title: cosmosData[1].title ?? null,
      totalToken: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[1].denom ?? null,
      voting: {
        title: "votingPower",
        token: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        token: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        token: 0,
        percent: 0,
      },
    },
    {
      title: cosmosData[2].title ?? null,
      totalToken: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[2].denom ?? null,
      voting: {
        title: "votingPower",
        token: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        token: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        token: 0,
        percent: 0,
      },
    },
    {
      title: cosmosData[3].title ?? null,
      totalToken: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[3].denom ?? null,
      voting: {
        title: "votingPower",
        token: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        token: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        token: 0,
        percent: 0,
      },
    },
    {
      title: cosmosData[4].title ?? null,
      totalToken: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[4].denom ?? null,
      voting: {
        title: "votingPower",
        token: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        token: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        token: 0,
        percent: 0,
      },
    },
    {
      title: cosmosData[5].title ?? null,
      totalToken: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[5].denom ?? null,
      voting: {
        title: "votingPower",
        token: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        token: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        token: 0,
        percent: 0,
      },
    },
    {
      title: cosmosData[6].title ?? null,
      totalToken: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[6].denom ?? null,
      voting: {
        title: "votingPower",
        token: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        token: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        token: 0,
        percent: 0,
      },
    },
    {
      title: cosmosData[7].title ?? null,
      totalToken: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[7].denom ?? null,
      voting: {
        title: "votingPower",
        token: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        token: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        token: 0,
        percent: 0,
      },
    },
  ]);

  const getCosmosBasedNetwork = async () => {
    const updatedArr = [];
    for (let x = 0; x < cosmosData.length; x++) {
      const networkFunction = networkFunctions[cosmosData[x]?.name] ?? null;
      const { calculator } = getNetworkInfo(cosmosData[x]?.network ?? null);
      const bondedApi = axios.post("/api/proxy", {
        url: calculator.bonded,
      });
      const stakingParamsApi = axios.post("/api/proxy", {
        url: calculator.stakingParams,
      });
      const delegationsApi = axios.post("/api/proxy", {
        url: cosmosData[x]?.delegationsApi,
      });
      const marketPriceApi = axios.get(networkFunction?.gecko);

      const promises = [
        bondedApi,
        stakingParamsApi,
        delegationsApi,
        marketPriceApi,
      ];

      const [
        { data: bondedJson },
        { data: stakingParamsJson },
        { data: delegationsJson },
        { data: marketPriceJson },
      ] = await Promise.all(promises);
      const totalToken = networkFunction?.converter(
        Number(R.pathOr(0, ["result", "tokens"], stakingParamsJson))
      );
      const totalTokenFormat = convertToMoney(
        networkFunction?.converter(
          Number(R.pathOr(0, ["result", "tokens"], stakingParamsJson))
        )
      );

      const bonded = networkFunction?.bonded(bondedJson);
      const currentMarketValue = networkFunction.marketPrice(marketPriceJson);
      const totalMarketValue = convertToMoney(currentMarketValue * totalToken);
      const votingPowerPercent = convertToMoney((totalToken / bonded) * 100, 2);
      //==========================
      // self-delegations
      //==========================

      let totalSelfDelegations = 0;

      for (let i = 0; i < cosmosData[x].validator_address.length; i++) {
        const totalSelfDelegation = networkFunction?.converter(
          R.pathOr([], ["result"], delegationsJson)
            .filter(
              (y) =>
                y?.[cosmosData[x]?.x ?? null] ===
                  cosmosData[x]?.validator_address[i] ?? null
            )
            .reduce(
              (a, b) => (a += Number(b?.balance?.amount ?? b?.balance) ?? 0),
              totalSelfDelegations ?? 0
            )
        );
        totalSelfDelegations += totalSelfDelegation;
      }

      const totalSelfDelegationsFormat = convertToMoney(totalSelfDelegations);
      const totalSelfDelegationsPercent = convertToMoney(
        (totalSelfDelegations / bonded) * 100,
        2
      );

      //==========================
      // other-delegations
      //==========================
      const otherDelegations = totalToken - totalSelfDelegations;
      const otherDelegationsFormat = convertToMoney(otherDelegations);
      const otherDelegationsPercent = convertToMoney(
        (otherDelegations / bonded) * 100,
        2
      );

      updatedArr.push({
        title: cosmosData[x]?.title,
        denom: cosmosData[x]?.denom,
        totalToken: totalTokenFormat,
        totalMarketValue,
        currentMarketValue,
        voting: {
          title: "votingPower",
          token: totalTokenFormat,
          percent: votingPowerPercent,
        },
        selfDelegations: {
          title: "selfDelegations",
          token: totalSelfDelegationsFormat,
          percent: totalSelfDelegationsPercent,
        },
        otherDelegations: {
          title: "otherDelegations",
          token: otherDelegationsFormat,
          percent: otherDelegationsPercent,
        },
      });
    }
    setCosmosNetwork(updatedArr, cosmosNetwork);
  };

  // IRIS
  const [iris, setIris] = useState({
    title: irisData[0].title,
    totalToken: 0,
    totalMarketValue: "0.00",
    currentMarketValue: "0.00",
    denom: irisData[0].denom,
    voting: {
      title: "votingPower",
      token: 0,
      percent: 0,
    },
    selfDelegations: {
      title: "selfDelegations",
      token: 0,
      percent: 0,
    },
    otherDelegations: {
      title: "otherDelegations",
      token: 0,
      percent: 0,
    },
  });

  const getIrisNetwork = async () => {
    const networkFunction = networkFunctions["iris"] ?? null;
    const { calculator } = getNetworkInfo("iris");
    const bondedApi = axios.post("/api/proxy", {
      url: calculator.bonded,
    });
    const stakingParamsApi = axios.post("/api/proxy", {
      url: calculator.stakingParams,
    });
    const delegationsApi = axios.post("/api/proxy", {
      url:
        "http://lcd.iris.bigdipper.live/stake/validators/iva1msqqkd3v0gmullzwm56c4frevyczzxfeczvjru/delegations",
    });
    const marketPriceApi = axios.get(networkFunction.gecko);

    const promises = [
      bondedApi,
      stakingParamsApi,
      delegationsApi,
      marketPriceApi,
    ];

    const [
      { data: bondedJson },
      { data: stakingParamsJson },
      { data: delegationsJson },
      { data: marketPriceJson },
    ] = await Promise.all(promises);

    const totalIRIS = Number(R.pathOr(0, ["tokens"], stakingParamsJson));

    const totalIRISFormat = convertToMoney(
      Number(R.pathOr(0, ["tokens"], stakingParamsJson))
    );

    const bonded = networkFunctions.iris.bonded(bondedJson);

    const currentMarketValue = networkFunctions.iris.marketPrice(
      marketPriceJson
    );
    const totalMarketValue = convertToMoney(currentMarketValue * totalIRIS);
    const votingPowerPercent = convertToMoney((totalIRIS / bonded) * 100, 2);

    //==========================
    // self-delegations
    //==========================
    const totalSelfDelegations = R.pathOr([], [], delegationsJson)
      .filter(
        (x) =>
          x?.["delegator_addr"] === "iaa1msqqkd3v0gmullzwm56c4frevyczzxfednxa7m"
      )
      .reduce((a, b) => (a += Number(b?.shares) ?? 0), 0);

    const totalSelfDelegationsFormat = convertToMoney(totalSelfDelegations);
    const totalSelfDelegationsPercent = convertToMoney(
      (totalSelfDelegations / bonded) * 100,
      2
    );

    //==========================
    // other-delegations
    //==========================
    const otherDelegations = totalIRIS - totalSelfDelegations;
    const otherDelegationsFormat = convertToMoney(otherDelegations);
    const otherDelegationsPercent = convertToMoney(
      (otherDelegations / bonded) * 100,
      2
    );

    setIris(
      R.mergeDeepLeft(
        {
          totalToken: totalIRISFormat,
          totalMarketValue,
          currentMarketValue,
          voting: {
            token: totalIRISFormat,
            percent: votingPowerPercent,
          },
          selfDelegations: {
            token: totalSelfDelegationsFormat,
            percent: totalSelfDelegationsPercent,
          },
          otherDelegations: {
            token: otherDelegationsFormat,
            percent: otherDelegationsPercent,
          },
        },
        iris
      )
    );
  };

  // V System
  const [vsys, setVSYS] = useState({
    title: vsysData[0].title,
    totalToken: 0,
    totalMarketValue: "0.00",
    currentMarketValue: "0.00",
    denom: vsysData[0].denom,
    voting: {
      title: "votingPower",
      token: 0,
      percent: 0,
    },
    selfDelegations: {
      title: "selfDelegations",
      token: 0,
      percent: 0,
    },
    otherDelegations: {
      title: "otherDelegations",
      token: 0,
      percent: 0,
    },
  });

  const getVSYSNetwork = async () => {
    const networkFunction = networkFunctions["vsys"] ?? null;

    const bondedApi = axios.post("/api/proxy", {
      url: "https://api.vsys.forbole.com/consensus/allSlotsInfo",
    });
    const selfDelegationsApi = axios.post("/api/proxy", {
      url:
        "https://api.vsys.forbole.com/addresses/balance/details/AR6AnRmynHBchobnxTr8rUvZyYEPNFsBBqE",
    });
    const tokensApi = axios.post("/api/proxy", {
      url: "https://api.vsys.forbole.com/consensus/slotInfo/32",
    });
    const marketPriceApi = axios.get(networkFunction?.gecko);

    const promises = [bondedApi, selfDelegationsApi, tokensApi, marketPriceApi];

    const [
      { data: bondedJson },
      { data: selfDelegationsJson },
      { data: tokensJson },
      { data: marketPriceJson },
    ] = await Promise.all(promises);

    const totalVSYS = networkFunction?.converter(
      Number(R.pathOr(0, ["mintingAverageBalance"], tokensJson))
    );
    const totalVSYStokens = totalVSYS / 100;
    const totalVSYSFormat = convertToMoney(totalVSYStokens);

    let bonded = 0;
    for (let i = 1; i < bondedJson.length - 1; i++) {
      bonded = bonded + bondedJson[i].mintingAverageBalance;
    }
    const bondedTokens = bonded / 100000000;

    const currentMarketValue = networkFunction.marketPrice(marketPriceJson);
    const totalMarketValue = convertToMoney(
      currentMarketValue * totalVSYStokens
    );
    const votingPowerPercent = convertToMoney(
      (totalVSYStokens / bondedTokens) * 100,
      2
    );

    //==========================
    // self-delegations
    //==========================
    const totalSelfDelegations = networkFunction?.converter(
      R.pathOr([], ["mintingAverage"], selfDelegationsJson)
    );

    const totalSelfDelegationsFormat = convertToMoney(totalSelfDelegations);

    const totalSelfDelegationsPercent = convertToMoney(
      (totalSelfDelegations / bondedTokens) * 100,
      2
    );
    //==========================
    // other-delegations
    //==========================
    const otherDelegations = totalVSYStokens - totalSelfDelegations;
    const otherDelegationsFormat = convertToMoney(otherDelegations);
    const otherDelegationsPercent = convertToMoney(
      (otherDelegations / bondedTokens) * 100,
      2
    );

    setVSYS(
      R.mergeDeepLeft(
        {
          totalToken: totalVSYSFormat,
          totalMarketValue,
          currentMarketValue,
          voting: {
            token: totalVSYSFormat,
            percent: votingPowerPercent,
          },
          selfDelegations: {
            token: totalSelfDelegationsFormat,
            percent: totalSelfDelegationsPercent,
          },
          otherDelegations: {
            token: otherDelegationsFormat,
            percent: otherDelegationsPercent,
          },
        },
        vsys
      )
    );
  };

  const [totalUSD, setNetworkUSD] = useState(0);

  const getNetworkUSD = async () => {
    const cosmosNetworkTotalUSD = await cosmosNetwork
      .map((x) => moneyToInt(x.totalMarketValue))
      .reduce((a, b) => (a += b));

    const vsysTotalUSD = await moneyToInt(vsys.totalMarketValue);

    const irisTotalUSD = await moneyToInt(iris.totalMarketValue);

    const totalUSD = cosmosNetworkTotalUSD + vsysTotalUSD + irisTotalUSD;

    setNetworkUSD(totalUSD);
  };

  useEffect(() => {
    try {
      getCosmosBasedNetwork();
      getIrisNetwork();
      getVSYSNetwork();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      getNetworkUSD();
    } catch (err) {
      console.log(err);
    }
  }, [cosmosNetwork, vsys, iris]);

  return {
    cosmosNetwork,
    iris,
    vsys,
    totalUSD,
    selected,
    setSelected,
  };
};
