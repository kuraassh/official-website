import { useState, useEffect } from "react";
import axios from "axios";
import * as R from "ramda";
import { getNetworkInfo } from "@utils/network_info";
import { networkFunctions, uIrisToIris } from "../../utils";
import { convertToMoney } from "@utils/convert_to_money";

export const useForboleStakesHook = () => {
  const [selected, setSelected] = useState(0);

  // Cosmos Hub / ATOM
  const [cosmos, setCosmos] = useState({
    title: "cosmosHub",
    totalAtom: 0,
    totalMarketValue: "0.00",
    currentMarketValue: "0.00",
    denom: "ATOM",
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

  const getCosmos = async () => {
    const networkFunction = networkFunctions["cosmos"] ?? null;
    const { calculator } = getNetworkInfo("cosmos");
    const bondedApi = axios.post("/api/proxy", {
      url: calculator.bonded,
    });
    const stakingParamsApi = axios.post("/api/proxy", {
      url: calculator.stakingParams,
    });
    const delegationsApi = axios.post("/api/proxy", {
      url:
        "http://lcd.cosmoshub.bigdipper.live/staking/delegators/cosmos14kn0kk33szpwus9nh8n87fjel8djx0y0mmswhp/delegations",
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
    //console.log(stakingParamsJson);
    const totalAtomFormat = convertToMoney(
      networkFunction?.converter(
        Number(R.pathOr(0, ["result", "tokens"], stakingParamsJson))
      )
    );
    //console.log(totalAtomFormat);
    const bonded = networkFunction?.bonded(bondedJson);
    const currentMarketValue = networkFunction.marketPrice(marketPriceJson);
    //console.log(currentMarketValue);
    const totalMarketValue = convertToMoney(currentMarketValue * totalAtom);
    const votingPowerPercent = convertToMoney((totalAtom / bonded) * 100, 2);
    //==========================
    // self-delegations
    //==========================

    const totalSelfDelegations = networkFunction?.converter(
      R.pathOr([], ["result"], delegationsJson)
        .filter(
          (x) =>
            x?.["validator_address"] ===
            "cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj"
        )
        .reduce((a, b) => (a += Number(b?.balance) ?? 0), 0)
    );
    //console.log(totalSelfDelegations);
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
    setCosmos(
      R.mergeDeepLeft(
        {
          totalAtom: totalAtomFormat,
          totalMarketValue,
          currentMarketValue,
          voting: {
            atom: totalAtomFormat,
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
        cosmos
      )
    );
  };

  // IRIS
  const [iris, setIris] = useState({
    title: "irisnet",
    totalAtom: 0,
    totalMarketValue: "0.00",
    currentMarketValue: "0.00",
    denom: "IRIS",
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

  const getIris = async () => {
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
    setIris(
      R.mergeDeepLeft(
        {
          totalAtom: totalIRISFormat,
          totalMarketValue,
          currentMarketValue,
          voting: {
            atom: totalIRISFormat,
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
        iris
      )
    );
  };

  // TERRA
  const [terra, setTerra] = useState({
    title: "Terra",
    totalAtom: 0,
    totalMarketValue: "0.00",
    currentMarketValue: "0.00",
    denom: "LUNA",
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

  const getTerra = async () => {
    const networkFunction = networkFunctions["terra"] ?? null;
    const { calculator } = getNetworkInfo("terra-money");
    const bondedApi = axios.post("/api/proxy", {
      url: calculator.bonded,
    });
    const stakingParamsApi = axios.post("/api/proxy", {
      url: calculator.stakingParams,
    });
    const delegationsApi = axios.post("/api/proxy", {
      url:
        "https://lcd.terra.bigdipper.live/staking/validators/terravaloper1jkqr2vfg4krfd4zwmsf7elfj07cjuzss30ux8g/delegations",
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
    const totalLUNA = networkFunction?.converter(
      Number(R.pathOr(0, ["result", "tokens"], stakingParamsJson))
    );
    //console.log(totalLUNA);
    const totalLUNAFormat = convertToMoney(
      networkFunction?.converter(
        Number(R.pathOr(0, ["result", "tokens"], stakingParamsJson))
      )
    );
    //console.log(totalLUNAFormat);
    const bonded = networkFunction?.bonded(bondedJson);
    const currentMarketValue = networkFunction.marketPrice(marketPriceJson);
    //console.log(currentMarketValue);
    const totalMarketValue = convertToMoney(currentMarketValue * totalLUNA);
    const votingPowerPercent = convertToMoney((totalLUNA / bonded) * 100, 2);
    //==========================
    // self-delegations
    //==========================

    const totalSelfDelegations = networkFunction?.converter(
      R.pathOr([], ["result"], delegationsJson)
        .filter(
          (x) =>
            x?.["delegator_address"] ===
            "terra1jkqr2vfg4krfd4zwmsf7elfj07cjuzss3qsmhm"
        )
        .reduce((a, b) => (a += Number(b?.balance.amount) ?? 0), 0)
    );

    const totalSelfDelegationsFormat = convertToMoney(totalSelfDelegations);
    //console.log(totalSelfDelegationsFormat);
    const totalSelfDelegationsPercent = convertToMoney(
      (totalSelfDelegations / bonded) * 100,
      2
    );
    //console.log(totalSelfDelegationsPercent);
    //==========================
    // other-delegations
    //==========================
    const otherDelegations = totalLUNA - totalSelfDelegations;
    const otherDelegationsFormat = convertToMoney(otherDelegations);
    const otherDelegationsPercent = convertToMoney(
      (otherDelegations / bonded) * 100,
      2
    );
    setTerra(
      R.mergeDeepLeft(
        {
          totalAtom: totalLUNAFormat,
          totalMarketValue,
          currentMarketValue,
          voting: {
            atom: totalLUNAFormat,
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
        terra
      )
    );
  };

  // KAVA
  const [kava, setKava] = useState({
    title: "Kava",
    totalAtom: 0,
    totalMarketValue: "0.00",
    currentMarketValue: "0.00",
    denom: "KAVA",
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

  const getKava = async () => {
    const networkFunction = networkFunctions["kava"] ?? null;
    const { calculator } = getNetworkInfo("kava");
    const bondedApi = axios.post("/api/proxy", {
      url: calculator.bonded,
    });
    const stakingParamsApi = axios.post("/api/proxy", {
      url: calculator.stakingParams,
    });
    const delegationsApi = axios.post("/api/proxy", {
      url:
        "http://lcd.kava.forbole.com/staking/validators/kavavaloper14kn0kk33szpwus9nh8n87fjel8djx0y02c7me3/delegations",
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
    const totalKAVA = networkFunction?.converter(
      Number(R.pathOr(0, ["result", "tokens"], stakingParamsJson))
    );
    //console.log(totalLUNA);
    const totalKAVAFormat = convertToMoney(
      networkFunction?.converter(
        Number(R.pathOr(0, ["result", "tokens"], stakingParamsJson))
      )
    );
    //console.log(totalLUNAFormat);
    const bonded = networkFunction?.bonded(bondedJson);
    const currentMarketValue = networkFunction.marketPrice(marketPriceJson);
    //console.log(currentMarketValue);
    const totalMarketValue = convertToMoney(currentMarketValue * totalKAVA);
    const votingPowerPercent = convertToMoney((totalKAVA / bonded) * 100, 2);
    //==========================
    // self-delegations
    //==========================

    const totalSelfDelegations1 = networkFunction?.converter(
      R.pathOr([], ["result"], delegationsJson)
        .filter(
          (x) =>
            x?.["delegator_address"] ===
            "kava1axa2p2klp4er2z0a29msplf9mtmq7ven0hkqw3"
        )
        .reduce((a, b) => (a += Number(b?.balance.amount) ?? 0), 0)
    );

    const totalSelfDelegations2 = networkFunction?.converter(
      R.pathOr([], ["result"], delegationsJson)
        .filter(
          (x) =>
            x?.["delegator_address"] ===
            "kava14kn0kk33szpwus9nh8n87fjel8djx0y08wynpx"
        )
        .reduce((a, b) => (a += Number(b?.balance.amount) ?? 0), 0)
    );
    const totalSelfDelegations = totalSelfDelegations1 + totalSelfDelegations2;

    const totalSelfDelegationsFormat = convertToMoney(totalSelfDelegations);

    const totalSelfDelegationsPercent = convertToMoney(
      (totalSelfDelegations / bonded) * 100,
      2
    );
    //console.log(totalSelfDelegationsPercent);
    //==========================
    // other-delegations
    //==========================
    const otherDelegations = totalKAVA - totalSelfDelegations;
    const otherDelegationsFormat = convertToMoney(otherDelegations);
    const otherDelegationsPercent = convertToMoney(
      (otherDelegations / bonded) * 100,
      2
    );
    setKava(
      R.mergeDeepLeft(
        {
          totalAtom: totalKAVAFormat,
          totalMarketValue,
          currentMarketValue,
          voting: {
            atom: totalKAVAFormat,
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
        kava
      )
    );
  };

  // LikeCoin
  const [likecoin, setLikeCoin] = useState({
    title: "likecoin",
    totalAtom: 0,
    totalMarketValue: "0.00",
    currentMarketValue: "0.00",
    denom: "LIKE",
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

  const getLikeCoin = async () => {
    const networkFunction = networkFunctions["likecoin"] ?? null;
    const { calculator } = getNetworkInfo("likecoin");
    const bondedApi = axios.post("/api/proxy", {
      url: calculator.bonded,
    });
    const stakingParamsApi = axios.post("/api/proxy", {
      url: calculator.stakingParams,
    });
    const delegationsApi = axios.post("/api/proxy", {
      url:
        "http://lcd.likecoin.forbole.com/staking/validators/cosmosvaloper1v8njts96gl5eqstnen4gksdy5k860fau65c3sw/delegations",
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
    const totalLIKE = networkFunction?.converter(
      Number(R.pathOr(0, ["result", "tokens"], stakingParamsJson))
    );
    console.log(`totalLIKE`, totalLIKE / 1000);
    const totalLIKEtokens = totalLIKE / 1000;
    const totalLIKEtokensFormat = convertToMoney(totalLIKEtokens);
    const totalLIKEFormat = convertToMoney(
      networkFunction?.converter(
        Number(R.pathOr(0, ["result", "tokens"], stakingParamsJson))
      )
    );
    //console.log(totalLUNAFormat);
    const bonded = networkFunction?.bonded(bondedJson);
    const currentMarketValue = networkFunction.marketPrice(marketPriceJson);
    //console.log(currentMarketValue);
    const totalMarketValue = convertToMoney(
      currentMarketValue * totalLIKEtokens
    );
    const votingPowerPercent = convertToMoney((totalLIKE / bonded) * 100, 2);
    //==========================
    // self-delegations
    //==========================

    const totalSelfDelegations = networkFunction?.converter(
      R.pathOr([], ["result"], delegationsJson)
        .filter(
          (x) =>
            x?.["delegator_address"] ===
            "cosmos1v8njts96gl5eqstnen4gksdy5k860faulqvyua"
        )
        .reduce((a, b) => (a += Number(b?.balance) ?? 0), 0)
    );
    console.log(totalSelfDelegations);
    const totalSelfDelegationsFormat = convertToMoney(totalSelfDelegations);

    const totalSelfDelegationsPercent = convertToMoney(
      (totalSelfDelegations / bonded) * 100,
      2
    );
    //console.log(totalSelfDelegationsPercent);
    //==========================
    // other-delegations
    //==========================
    const otherDelegations = totalLIKE - totalSelfDelegations;
    const otherDelegationsFormat = convertToMoney(otherDelegations);
    const otherDelegationsPercent = convertToMoney(
      (otherDelegations / bonded) * 100,
      2
    );
    setLikeCoin(
      R.mergeDeepLeft(
        {
          totalAtom: totalLIKEtokensFormat,
          totalMarketValue,
          currentMarketValue,
          voting: {
            atom: totalLIKEFormat,
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
        likecoin
      )
    );
  };

  // iov / Startname
  const [iov, setIOV] = useState({
    title: "Startname",
    totalAtom: 0,
    totalMarketValue: "0.00",
    currentMarketValue: "0.00",
    denom: "IOV",
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

  const getIOV = async () => {
    const networkFunction = networkFunctions["iov"] ?? null;
    const { calculator } = getNetworkInfo("iov");
    const bondedApi = axios.post("/api/proxy", {
      url: calculator.bonded,
    });
    const stakingParamsApi = axios.post("/api/proxy", {
      url: calculator.stakingParams,
    });
    const delegationsApi = axios.post("/api/proxy", {
      url:
        "http://lcd.iov.forbole.com/staking/validators/starvaloper1jkv2qkpq6cfplx6put7f00wzuyds57fnmtgde0/delegations",
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

    const totalIOV = networkFunction?.converter(
      Number(R.pathOr(0, ["result", "tokens"], stakingParamsJson))
    );
    //console.log(totalLUNA);
    const totalIOVFormat = convertToMoney(
      networkFunction?.converter(
        Number(R.pathOr(0, ["result", "tokens"], stakingParamsJson))
      )
    );
    //console.log(totalLUNAFormat);
    const bonded = networkFunction?.bonded(bondedJson);
    const currentMarketValue = networkFunction.marketPrice(marketPriceJson);
    //console.log(currentMarketValue);
    const totalMarketValue = convertToMoney(currentMarketValue * totalIOV);
    const votingPowerPercent = convertToMoney((totalIOV / bonded) * 100, 2);
    //==========================
    // self-delegations
    //==========================

    const totalSelfDelegations1 = networkFunction?.converter(
      R.pathOr([], ["result"], delegationsJson)
        .filter(
          (x) =>
            x?.["delegator_address"] ===
            "star1jkv2qkpq6cfplx6put7f00wzuyds57fn7qva4x"
        )
        .reduce((a, b) => (a += Number(b?.balance.amount) ?? 0), 0)
    );
    const totalSelfDelegations2 = networkFunction?.converter(
      R.pathOr([], ["result"], delegationsJson)
        .filter(
          (x) =>
            x?.["delegator_address"] ===
            "star1j02u9tpjtse9fyd398xvsdfn6caw7ju9xfqa3z"
        )
        .reduce((a, b) => (a += Number(b?.balance.amount) ?? 0), 0)
    );
    const totalSelfDelegations = totalSelfDelegations1 + totalSelfDelegations2;
    //console.log(totalSelfDelegations);
    const totalSelfDelegationsFormat = convertToMoney(totalSelfDelegations);

    const totalSelfDelegationsPercent = convertToMoney(
      (totalSelfDelegations / bonded) * 100,
      2
    );
    //console.log(totalSelfDelegationsPercent);
    //==========================
    // other-delegations
    //==========================
    const otherDelegations = totalIOV - totalSelfDelegations;
    const otherDelegationsFormat = convertToMoney(otherDelegations);
    const otherDelegationsPercent = convertToMoney(
      (otherDelegations / bonded) * 100,
      2
    );
    setIOV(
      R.mergeDeepLeft(
        {
          totalAtom: totalIOVFormat,
          totalMarketValue,
          currentMarketValue,
          voting: {
            atom: totalIOVFormat,
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
        iov
      )
    );
  };

  // Band Protocol

  // Akash

  // V Systems

  // e-Money

  // Solana

  useEffect(() => {
    try {
      getCosmos();
      getIris();
      getTerra();
      getKava();
      getLikeCoin();
      getIOV();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return {
    cosmos,
    iris,
    terra,
    kava,
    likecoin,
    iov,
    selected,
    setSelected,
  };
};
