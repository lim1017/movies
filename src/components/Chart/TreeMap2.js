import React from "react";
import Chart from "react-google-charts";

import Loading from "../Loading/Loading";

const Tree = (props) => {
  const randomNumber = () => {
    return Math.floor(Math.random() * 100);
  };

  const convertData = (data) => {
    let finalOP = [
      [
        "Location",
        "Parent",
        "Market trade volume (size)",
        "Market increase/decrease (color)",
      ],
      ["Nominations", null, 0, 0],
    ];

    data.forEach((element) => {
      finalOP.push([
        `${element[0]} : ${element[1]} Votes`,
        "Nominations",
        element[1],
        randomNumber(),
      ]);
    });

    return finalOP;
  };

  const data = Object.entries(props.data);
  const formattedData = convertData(data);

  return (
    <div>
      <Chart
        width={"60vw"}
        height={"60vh"}
        chartType="TreeMap"
        loader={<Loading />}
        data={formattedData}
        options={{
          maxDepth: 0,
          maxPostDepth: 0,
          title: "Total Nominations",
          titleTextStyle: { color: "white", fontSize: 22, bold: true },
          minColor: "#f00",
          midColor: "#ddd",
          maxColor: "#0d0",
          headerHeight: 25,
          fontColor: "black",
          showScale: true,
          generateTooltip: (row, size, value) => {
            return (
              '<div style="background:#fd9; padding:10px; border-style:solid; position:relative; z-index:9999;"> ' +
              formattedData[row + 1][0] +
              " : " +
              formattedData[row + 1][2] +
              " votes" +
              "</div>"
            );
          },
        }}
        rootProps={{ "data-testid": "3" }}
      />
    </div>
  );
};

export default Tree;
