import React, { useState } from "react";
import { useTranslation } from "i18n";
import { PieChart } from "react-minimal-pie-chart";

const networkData = [
  { title: "cosmosHub", value: 20, color: "#FF6767" },
  // { title: "irisnet", value: 20, color: "#50FFB4" },
  { title: "terra", value: 20, color: "#499EFC" },
  { title: "kava", value: 15, color: "#31DDE6" },
  { title: "likecoin", value: 10, color: "#E6A531" },
  { title: "startname", value: 5, color: "#CB86FF" },
  { title: "band-protocol", value: 3, color: "#FF7753" },
  { title: "akash", value: 2, color: "#FDE425" },
  { title: "emoney", value: 5, color: "#FDE688" },
  { title: "vsys", value: 5, color: "#FFF688" },
];

const Chart = (props: any) => {
  const { t } = useTranslation("stake_now");
  const { selected, setSelected } = props;

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
