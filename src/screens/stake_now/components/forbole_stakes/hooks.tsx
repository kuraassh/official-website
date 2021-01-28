import { useState, useEffect } from "react";
import axios from "axios";
import * as R from "ramda";
import { getNetworkInfo } from "@utils/network_info";
import { networkFunctions } from "../../utils";
import { convertToMoney } from "@utils/convert_to_money";
import { Network } from "@models";

// const solanaWeb3 = require("@solana/web3.js");

const cosmosData = [
  {
    title: "Cosmos",
    name: "cosmos",
    network: "cosmos",
    denom: "ATOM",
    delegationsApi:
      "http://lcd.cosmoshub.bigdipper.live/staking/delegators/cosmos14kn0kk33szpwus9nh8n87fjel8djx0y0mmswhp/delegations",
    x: "validator_address",
    delegationsJson_R: ["result"],
    validator_address: ["cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj"],
  },
  {
    title: "Terra",
    name: "terra",
    network: "terra-money",
    denom: "LUNA",
    x: "delegator_address",
    delegationsApi:
      "https://lcd.terra.bigdipper.live/staking/validators/terravaloper1jkqr2vfg4krfd4zwmsf7elfj07cjuzss30ux8g/delegations",
    delegationsJson_R: ["result"],
    validator_address: ["terra1jkqr2vfg4krfd4zwmsf7elfj07cjuzss3qsmhm"],
  },
  {
    title: "Kava",
    name: "kava",
    network: "kava",
    denom: "KAVA",
    x: "delegator_address",
    delegationsApi:
      "http://lcd.kava.forbole.com/staking/validators/kavavaloper14kn0kk33szpwus9nh8n87fjel8djx0y02c7me3/delegations",
    validator_address: [
      "kava1axa2p2klp4er2z0a29msplf9mtmq7ven0hkqw3",
      "kava14kn0kk33szpwus9nh8n87fjel8djx0y08wynpx",
    ],
  },
  {
    title: "Likecoin",
    name: "likecoin",
    network: "likecoin",
    denom: "LIKE",
    x: "delegator_address",
    delegationsApi:
      "http://lcd.likecoin.forbole.com/staking/validators/cosmosvaloper1v8njts96gl5eqstnen4gksdy5k860fau65c3sw/delegations",
    validator_address: ["cosmos1v8njts96gl5eqstnen4gksdy5k860faulqvyua"],
  },
  {
    title: "Starname",
    name: "iov",
    network: "iov",
    denom: "IOV",
    x: "delegator_address",
    delegationsApi:
      "http://lcd.iov.forbole.com/staking/validators/starvaloper1jkv2qkpq6cfplx6put7f00wzuyds57fnmtgde0/delegations",
    validator_address: [
      "star1jkv2qkpq6cfplx6put7f00wzuyds57fn7qva4x",
      "star1j02u9tpjtse9fyd398xvsdfn6caw7ju9xfqa3z",
    ],
  },
  {
    title: "Band-Protocol",
    name: "band",
    network: "band-protocol",
    denom: "BAND",
    x: "delegator_address",
    delegationsApi:
      "http://lcd.band.forbole.com/staking/validators/bandvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0wz502z/delegations",
    validator_address: ["band14kn0kk33szpwus9nh8n87fjel8djx0y0z5sv0f"],
  },
  {
    title: "Akash",
    name: "akash",
    network: "akash",
    denom: "AKT",
    x: "delegator_address",
    delegationsApi:
      "http://lcd.akash.forbole.com/staking/validators/akashvaloper14kn0kk33szpwus9nh8n87fjel8djx0y0uzn073/delegations",
    validator_address: [
      "akash14kn0kk33szpwus9nh8n87fjel8djx0y0kqafwm",
      "akash1axa2p2klp4er2z0a29msplf9mtmq7ven7e06pv",
      "akash1scc089xs8m67e34pt837z3je8m7950rvkzz88g",
      "akash1scc089xs8m67e34pt837z3je8m7950rvkzz88g",
      "akash1d3925a6vx08htfyzwf6al8xeq07a8re7zscprk",
    ],
  },
  {
    title: "E-Money",
    name: "emoney",
    network: "e-money",
    denom: "NGM",
    x: "delegator_address",
    delegationsApi:
      "http://lcd.emoney.forbole.com/staking/validators/emoneyvaloper1293pqwtzu67zp8txuya4yts03ccw5kgf98hz9y/delegations",
    validator_address: ["emoney1293pqwtzu67zp8txuya4yts03ccw5kgfz83kmf"],
  },
];

const irisData = [
  {
    title: "Iris",
    name: "iris",
    network: "iris",
    denom: "IRIS",
    x: "delegator_addr",
    delegationsApi:
      "http://lcd.iris.bigdipper.live/stake/validators/iva1msqqkd3v0gmullzwm56c4frevyczzxfeczvjru/delegations",
    delegationsJson_R: ["result"],
    validator_address: ["iaa1msqqkd3v0gmullzwm56c4frevyczzxfednxa7m"],
  },
];
const vsysData = [
  {
    title: "V Systems",
    name: "vsys",
    network: "vsys",
    denom: "NGM",
    x: "delegator_address",
    bondedApi: "https://api.vsys.forbole.com/consensus/allSlotsInfo",
    selfSelegationsApi:
      "https://api.vsys.forbole.com/addresses/balance/details/AR6AnRmynHBchobnxTr8rUvZyYEPNFsBBqE",
    tokensApi: "https://api.vsys.forbole.com/consensus/slotInfo/32",
  },
];

export const useForboleStakesHook = () => {
  const [selected, setSelected] = useState(0);
  // Cosmos Hub / ATOM

  const [cosmosNetwork, setCosmosNetwork] = useState([
    {
      title: cosmosData[0].title ?? null,
      totalAtom: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[0].denom ?? null,
      voting: {
        title: "votingPower",
        atom: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        atom: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        atom: 0,
        percent: 0,
      },
    },
    {
      title: cosmosData[1].title ?? null,
      totalAtom: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[1].denom ?? null,
      voting: {
        title: "votingPower",
        atom: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        atom: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        atom: 0,
        percent: 0,
      },
    },
    {
      title: cosmosData[2].title ?? null,
      totalAtom: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[2].denom ?? null,
      voting: {
        title: "votingPower",
        atom: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        atom: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        atom: 0,
        percent: 0,
      },
    },
    {
      title: cosmosData[3].title ?? null,
      totalAtom: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[3].denom ?? null,
      voting: {
        title: "votingPower",
        atom: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        atom: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        atom: 0,
        percent: 0,
      },
    },
    {
      title: cosmosData[4].title ?? null,
      totalAtom: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[4].denom ?? null,
      voting: {
        title: "votingPower",
        atom: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        atom: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        atom: 0,
        percent: 0,
      },
    },
    {
      title: cosmosData[5].title ?? null,
      totalAtom: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[5].denom ?? null,
      voting: {
        title: "votingPower",
        atom: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        atom: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        atom: 0,
        percent: 0,
      },
    },
    {
      title: cosmosData[6].title ?? null,
      totalAtom: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[6].denom ?? null,
      voting: {
        title: "votingPower",
        atom: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        atom: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        atom: 0,
        percent: 0,
      },
    },
    {
      title: cosmosData[7].title ?? null,
      totalAtom: 0,
      totalMarketValue: "0.00",
      currentMarketValue: "0.00",
      denom: cosmosData[7].denom ?? null,
      voting: {
        title: "votingPower",
        atom: 0,
        percent: 0,
      },
      selfDelegations: {
        title: "selfDelegations",
        atom: 0,
        percent: 0,
      },
      otherDelegations: {
        title: "otherDelegations",
        atom: 0,
        percent: 0,
      },
    },
  ]);

  const getCosmosBasedNetwork = async () => {
    const updatedArr = [];
    for (let x = 0; x < cosmosData.length; x++) {
      const networkFunction = networkFunctions[cosmosData[x]?.name] ?? null;
      console.log(cosmosData[x]);
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
      const totalAtom = networkFunction?.converter(
        Number(R.pathOr(0, ["result", "tokens"], stakingParamsJson))
      );
      const totalAtomFormat = convertToMoney(
        networkFunction?.converter(
          Number(R.pathOr(0, ["result", "tokens"], stakingParamsJson))
        )
      );

      const bonded = networkFunction?.bonded(bondedJson);
      const currentMarketValue = networkFunction.marketPrice(marketPriceJson);

      const totalMarketValue = convertToMoney(currentMarketValue * totalAtom);
      const votingPowerPercent = convertToMoney((totalAtom / bonded) * 100, 2);
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
      const otherDelegations = totalAtom - totalSelfDelegations;
      const otherDelegationsFormat = convertToMoney(otherDelegations);
      const otherDelegationsPercent = convertToMoney(
        (otherDelegations / bonded) * 100,
        2
      );

      // const totalUSD = async () => {
      //   for (let x = 0; x < networkData.length; x++) {
      //     const marketPriceApi = await axios.get(
      //       networkFunction[networkData[x].name]?.gecko
      //     );
      //     console.log(marketPriceApi);
      //   }
      // };
      // console.log(cosmosData[x]?.title);

      updatedArr.push({
        // totalUSD: setInterval(totalUSD, 100000000),
        title: cosmosData[x]?.title,
        denom: cosmosData[x]?.denom,
        totalAtom: totalAtomFormat,
        totalMarketValue,
        currentMarketValue,
        voting: {
          title: "votingPower",
          atom: totalAtomFormat,
          percent: votingPowerPercent,
        },
        selfDelegations: {
          title: "selfDelegations",
          atom: totalSelfDelegationsFormat,
          percent: totalSelfDelegationsPercent,
        },
        otherDelegations: {
          title: "otherDelegations",
          atom: otherDelegationsFormat,
          percent: otherDelegationsPercent,
        },
      });
      //console.log(updatedArr);
    }
    // setCosmosNetwork((oldArr) => ({
    //   ...oldArr,
    //   x: R.mergeDeepLeft({
    //     // totalUSD: setInterval(totalUSD, 100000000),
    //     title: cosmosData[x]?.title,
    //     denom: cosmosData[x]?.denom,
    //     totalAtom: totalAtomFormat,
    //     totalMarketValue,
    //     currentMarketValue,
    //     voting: {
    //       atom: totalAtomFormat,
    //       percent: votingPowerPercent,
    //     },
    //     selfDelegations: {
    //       atom: totalSelfDelegationsFormat,
    //       percent: totalSelfDelegationsPercent,
    //     },
    //     otherDelegations: {
    //       atom: otherDelegationsFormat,
    //       percent: otherDelegationsPercent,
    //     },
    //   }),
    // }));

    setCosmosNetwork(updatedArr, cosmosNetwork);
  };
  console.log(typeof cosmosNetwork, cosmosNetwork);

  // // IRIS
  // const [iris, setIris] = useState({
  //   title: "irisnet",
  //   totalAtom: 0,
  //   totalMarketValue: "0.00",
  //   currentMarketValue: "0.00",
  //   denom: "IRIS",
  //   voting: {
  //     title: "votingPower",
  //     atom: 0,
  //     percent: 0,
  //   },
  //   selfDelegations: {
  //     title: "selfDelegations",
  //     atom: 0,
  //     percent: 0,
  //   },
  //   otherDelegations: {
  //     title: "otherDelegations",
  //     atom: 0,
  //     percent: 0,
  //   },
  // });

  const getIrisNetwork = async () => {
    const arr = [...cosmosNetwork];
    const networkFunction = networkFunctions["iris"] ?? null;
    //console.log(networkFunction);

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
    console.log(delegationsApi);
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

    //console.log(totalIRIS);

    const totalIRISFormat = convertToMoney(
      Number(R.pathOr(0, ["tokens"], stakingParamsJson))
    );
    console.log(totalIRISFormat);

    const bonded = networkFunctions.iris.bonded(bondedJson);
    //console.log(bonded);

    const currentMarketValue = networkFunctions.iris.marketPrice(
      marketPriceJson
    );
    //console.log(currentMarketValue);
    const totalMarketValue = convertToMoney(currentMarketValue * totalIRIS);
    const votingPowerPercent = convertToMoney((totalIRIS / bonded) * 100, 2);

    //==========================
    // self-delegations
    //==========================
    console.log(delegationsJson);
    const totalSelfDelegations = R.pathOr([], [], delegationsJson)
      .filter(
        (x) =>
          x?.["delegator_addr"] === "iaa1msqqkd3v0gmullzwm56c4frevyczzxfednxa7m"
      )
      .reduce((a, b) => (a += Number(b?.shares) ?? 0), 0);
    console.log(totalSelfDelegations);
    const totalSelfDelegationsFormat = convertToMoney(totalSelfDelegations);
    console.log(totalSelfDelegationsFormat);
    const totalSelfDelegationsPercent = convertToMoney(
      (totalSelfDelegations / bonded) * 100,
      2
    );
    console.log(totalSelfDelegationsPercent);

    //==========================
    // other-delegations
    //==========================
    const otherDelegations = totalIRIS - totalSelfDelegations;
    const otherDelegationsFormat = convertToMoney(otherDelegations);
    const otherDelegationsPercent = convertToMoney(
      (otherDelegations / bonded) * 100,
      2
    );

    arr.push({
      title: irisData[0]?.title,
      denom: irisData[0]?.denom,
      totalAtom: totalIRISFormat,
      totalMarketValue,
      currentMarketValue,
      voting: {
        title: "votingPower",
        atom: totalIRISFormat,
        percent: votingPowerPercent,
      },
      selfDelegations: {
        title: "selfDelegations",
        atom: totalSelfDelegationsFormat,
        percent: totalSelfDelegationsPercent,
      },
      otherDelegations: {
        title: "otherDelegations",
        atom: otherDelegationsFormat,
        percent: otherDelegationsPercent,
      },
    });

    setCosmosNetwork(arr, cosmosNetwork);
    console.log(`irisnet>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`, arr);
  };

  // V System
  const [vsys, setVSYS] = useState({
    title: "V Systems",
    totalAtom: 0,
    totalMarketValue: "0.00",
    currentMarketValue: "0.00",
    denom: "VSYS",
    voting: {
      title: "votingPower",
      atom: 0,
      percent: 0,
    },
    selfDelegations: {
      title: "selfDelegations",
      atom: 0,
      percent: 0,
    },
    otherDelegations: {
      title: "otherDelegations",
      atom: 0,
      percent: 0,
    },
  });

  // const networkArr = [...cosmosNetwork];
  // console.log(`networkArr>>>>>>>>>>>>>>>`, networkArr);

  const getVSYSNetwork = async () => {
    // getCosmosBasedNetwork();
    // getIrisNetwork();
    // const networkArr = [...cosmosNetwork];
    // console.log(`networkArr>>>>>>>>>>>>>>>`, networkArr);
    const networkFunction = networkFunctions["vsys"] ?? null;
    // const { calculator } = getNetworkInfo(["vsys"]);
    //console.log(getNetworkInfo(""));
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
    //console.log(marketPriceApi);
    const promises = [bondedApi, selfDelegationsApi, tokensApi, marketPriceApi];

    const [
      { data: bondedJson },
      { data: selfDelegationsJson },
      { data: tokensJson },
      { data: marketPriceJson },
    ] = await Promise.all(promises);
    //console.log(tokensJson);

    const totalVSYS = networkFunction?.converter(
      Number(R.pathOr(0, ["mintingAverageBalance"], tokensJson))
    );

    const totalVSYStokens = totalVSYS / 100;
    const totalVSYSFormat = convertToMoney(totalVSYStokens);
    // console.log(totalVSYSFormat);
    // console.log(`bonded`, bondedJson);
    let bonded = 0;
    for (let i = 1; i < bondedJson.length - 1; i++) {
      bonded = bonded + bondedJson[i].mintingAverageBalance;
    }
    console.log(`bonded`, bonded);
    const bondedTokens = bonded / 100000000;
    console.log(`bonded tokens`, bondedTokens);

    const currentMarketValue = networkFunction.marketPrice(marketPriceJson);
    //console.log(currentMarketValue);
    const totalMarketValue = convertToMoney(
      currentMarketValue * totalVSYStokens
    );
    //console.log(totalMarketValue);
    const votingPowerPercent = convertToMoney(
      (totalVSYStokens / bondedTokens) * 100,
      2
    );
    //console.log(votingPowerPercent);
    //==========================
    // self-delegations
    //==========================
    const totalSelfDelegations = networkFunction?.converter(
      R.pathOr([], ["mintingAverage"], selfDelegationsJson)
    );
    console.log(`self delegation`, totalSelfDelegations);
    const totalSelfDelegationsFormat = convertToMoney(totalSelfDelegations);

    const totalSelfDelegationsPercent = convertToMoney(
      (totalSelfDelegations / bondedTokens) * 100,
      2
    );
    //console.log(totalSelfDelegationsPercent);

    //==========================
    // other-delegations
    //==========================
    const otherDelegations = totalVSYStokens - totalSelfDelegations;
    console.log(otherDelegations);
    const otherDelegationsFormat = convertToMoney(otherDelegations);
    const otherDelegationsPercent = convertToMoney(
      (otherDelegations / bondedTokens) * 100,
      2
    );

    // networkArr.push({
    //   title: vsysData[0]?.title,
    //   denom: vsysData[0]?.denom,
    //   totalAtom: totalVSYSFormat,
    //   totalMarketValue,
    //   currentMarketValue,
    //   voting: {
    //     title: "votingPower",
    //     atom: totalVSYSFormat,
    //     percent: votingPowerPercent,
    //   },
    //   selfDelegations: {
    //     title: "selfDelegations",
    //     atom: totalSelfDelegationsFormat,
    //     percent: totalSelfDelegationsPercent,
    //   },
    //   otherDelegations: {
    //     title: "otherDelegations",
    //     atom: otherDelegationsFormat,
    //     percent: otherDelegationsPercent,
    //   },
    // });
    // //console.log(networkArr);
    // setCosmosNetwork(networkArr, cosmosNetwork);

    setVSYS(
      R.mergeDeepLeft(
        {
          totalAtom: totalVSYSFormat,
          totalMarketValue,
          currentMarketValue,
          voting: {
            atom: totalVSYSFormat,
            percent: votingPowerPercent,
          },
          selfDelegations: {
            atom: totalSelfDelegationsFormat,
            percent: totalSelfDelegationsPercent,
          },
          otherDelegations: {
            atom: otherDelegationsFormat,
            percent: otherDelegationsPercent,
          },
        },
        vsys
      )
    );
  };

  // console.log(getCosmosBasedNetwork(0));
  // console.log(getCosmosBasedNetwork(1));

  const main = async () => {
    await delay(2000);
    getCosmosBasedNetwork();
    await delay(2000);
    getIrisNetwork();
    await delay(2000);
    getVSYSNetwork();
    // do something else
  };

  async function delay(ms) {
    // return await for better async stack trace support in case of errors.
    return await new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    try {
      getCosmosBasedNetwork();
      //getIrisNetwork();
      // getVSYSNetwork();
      getVSYSNetwork();
      //main();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return {
    cosmosNetwork,
    // cosmos,
    // iris,
    vsys,
    selected,
    setSelected,
  };
};
