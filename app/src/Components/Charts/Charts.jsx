import React from "react";
import Plot from "react-plotly.js";

const charts = ({ stat, data, chartType }) => {
  console.log("chartType:", chartType);
  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 11, 12, 13],
    mode: "markers",
    marker: {
      color: [
        "hsl(0,100,40)",
        "hsl(33,100,40)",
        "hsl(66,100,40)",
        "hsl(99,100,40)",
      ],
      size: [12, 22, 32, 42],
      opacity: [0.6, 0.7, 0.8, 0.9],
    },
    type: "scatter",
  };

  var trace2 = {
    x: [1, 2, 3, 4],
    y: [11, 12, 13, 14],
    mode: "markers",
    marker: {
      color: "rgb(31, 119, 180)",
      size: 18,
      symbol: ["circle", "square", "diamond", "cross"],
    },
    type: "scatter",
  };

  var trace3 = {
    x: [1, 2, 3, 4],
    y: [12, 13, 14, 15],
    mode: "markers",
    marker: {
      size: 18,
      line: {
        color: [
          "rgb(120,120,120)",
          "rgb(120,120,120)",
          "red",
          "rgb(120,120,120)",
        ],
        width: [2, 2, 6, 2],
      },
    },
    type: "scatter",
  };

  const plotLayoutStyle = {
    width: 500,
    height: 500,
    title: "Average Sentiment Timeline - 1",
  };
  // Left to Call API and GET values in Chat.
  var values = ["11", "12", "13", "14", "15", "20", "30"];
  var labels = ["A1", "A2", "A3", "A4", "A5", "B1", "B2"];
  var parents = ["", "A1", "A2", "A3", "A4", "", "B1"];
  // console.log("stat?.stats?.twitter::", stat?.stats?.twitter);
  return (
    <div>
      <Plot
        className="Chart"
        data={
          chartType === "bar"
            ? [
                {
                  y: [10, 25, 30],
                  x: ["Negative", "Neutral", "Positive"],
                  type: chartType,
                  marker: { color: ["#E03C32", "#FFD301", "7BB662"] },
                },
              ]
            : chartType === "line"
            ? [
                {
                  y: [20, 30],
                  x: [20, 30],
                  type: chartType,
                  mode: "lines",
                },
              ]
            : chartType === "treemap"
            ? [
                {
                  type: chartType,
                  values: values,
                  labels: labels,
                  parents: parents,
                },
              ]
            : chartType === "bubble"
            ? [trace1, trace2, trace3]
            : null
        }
        layout={plotLayoutStyle}
      />
    </div>
  );
};

export default charts;
