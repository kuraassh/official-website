import React, { useState } from "react";
import { useTranslation } from "i18n";
import { PieChart } from "react-minimal-pie-chart";
import { useForboleStakesHook } from "../../hooks";
import { moneyToInt } from "@utils/convert_to_money";

const Chart = (props: any) => {
  const { t } = useTranslation("stake_now");
  const { selected, setSelected } = props;
  const hookProps = useForboleStakesHook();
  const { cosmosNetwork, iris, vsys, totalUSD } = hookProps;

  const networkData = [
    {
      title: "cosmosHub",
      value: (moneyToInt(cosmosNetwork[0].totalMarketValue) / totalUSD) * 100,
      color: "#FF6767",
    },
    {
      title: "terra",
      value: (moneyToInt(cosmosNetwork[1].totalMarketValue) / totalUSD) * 100,
      color: "#499EFC",
    },
    {
      title: "kava",
      value: (moneyToInt(cosmosNetwork[2].totalMarketValue) / totalUSD) * 100,
      color: "#31DDE6",
    },
    {
      title: "likecoin",
      value: (moneyToInt(cosmosNetwork[3].totalMarketValue) / totalUSD) * 100,
      color: "#E6A531",
    },
    {
      title: "starname",
      value: (moneyToInt(cosmosNetwork[4].totalMarketValue) / totalUSD) * 100,
      color: "#CB86FF",
    },
    {
      title: "band-protocol",
      value: (moneyToInt(cosmosNetwork[5].totalMarketValue) / totalUSD) * 100,
      color: "#FF7753",
    },
    {
      title: "akash",
      value: (moneyToInt(cosmosNetwork[6].totalMarketValue) / totalUSD) * 100,
      color: "#FDE425",
    },
    {
      title: "emoney",
      value: (moneyToInt(cosmosNetwork[7].totalMarketValue) / totalUSD) * 100,
      color: "#FDE688",
    },
    {
      title: "irisnet",
      value: (moneyToInt(iris.totalMarketValue) / totalUSD) * 100,
      color: "#50FFB4",
    },
    {
      title: "vsys",
      value: (moneyToInt(vsys.totalMarketValue) / totalUSD) * 100,
      color: "#FFF688",
    },
  ];

  const lineWidth = 50;
  // change to pointer in future
  const segmentsStyle = { transition: "stroke .3s", cursor: "initial" };

  return (
    <PieChart
      style={{
        fontSize: "8px",
      }}
      data={networkData}
      radius={PieChart.defaultProps.radius - 6}
      lineWidth={lineWidth}
      segmentsStyle={(index) => {
        return index === selected
          ? { ...segmentsStyle, strokeWidth: 25 }
          : segmentsStyle;
      }}
      animate
      label={() =>
        `${t(
          networkData && networkData[selected] && networkData[selected].title
        )}`
      }
      labelPosition={0}
      startAngle={285}
      onClick={(_, index) => {
        setSelected(index === selected ? undefined : index);
      }}
      labelStyle={{
        fill: "#fff",
        opacity: 0.75,
        pointerEvents: "none",
        fontWeight: 300,
        fontSize: "0.3rem",
      }}
    />
  );
};

export default Chart;
