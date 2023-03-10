import React from "react";
import Plot from "react-plotly.js";

const charts = ({ stat, data }) => {
  const plotLayoutStyle = {
    width: 500,
    height: 500,
    title: "Average Sentiment Timeline - 1",
  };

  return (
    <div>
      <Plot className="Chart" data={data} layout={plotLayoutStyle} />
    </div>
  );
};

export default charts;
