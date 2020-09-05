import React from "react";

import Chart from "react-google-charts";

export default class MyComponent extends React.Component {
  render() {
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

      console.log(data);

      data.forEach((element) => {
        finalOP.push([element[0], "Nominations", element[1], randomNumber()]);
      });

      console.log(finalOP);
      return finalOP;
    };

    const data = Object.entries(this.props.data);
    const formattedData = convertData(data);

    return (
      <div>
        <Chart
          width={"500px"}
          height={"300px"}
          chartType="TreeMap"
          loader={<div>Loading Chart</div>}
          data={formattedData}
          options={{
            minColor: "#f00",
            midColor: "#ddd",
            maxColor: "#0d0",
            headerHeight: 15,
            fontColor: "black",
            showScale: true,
            generateTooltip: (row, size, value) => {
              console.log(row, "row-----", value, "value");

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
  }
}
