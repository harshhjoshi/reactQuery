import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { TwitterAPI } from "../src/data/service";
import './App.css';
import Charts from './Components/Charts/Charts';

function App() {
  const { data: stats, isLoadingStats, isErrorStats, errorStats } = useQuery({ queryKey: ["stats"], queryFn: TwitterAPI, refetchInterval: 300000 }); //Custom Hooks

  // Charts Button
  var [chatButtons, setchatButtons] = useState([{
    id: 0,
    title: 'Twitter',
    isSelected: true,
    childButtons: [{
      id: 0,
      title: 'Followers',
      isSelected: false,
      chartType: 'bar'
    },
    {
      id: 1,
      title: 'Sentiment',
      isSelected: false,
      chartType: 'line'
    }]
  },
  {
    id: 1,
    title: 'Instagram',
    isSelected: false,
    childButtons: [{
      id: 0,
      title: 'Followers',
      isSelected: false,
      chartType: 'treemap'
    },
    {
      id: 1,
      title: 'Sentiment',
      isSelected: false,
      chartType: 'bubble'
    },
    {
      id: 2,
      title: 'Sentiment - 1',
      isSelected: false,
      chartType: 'bubble'
    }]
  },
  ]);

  const isLoading = isLoadingStats; // Loading Handlling
  const isError = isErrorStats; // Error Handlling
  const error = [errorStats]; // Error Message Handlling

  // If Query Loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If Query Have error
  if (isError) {
    return (
      <span>
        {error.forEach((e) => (e ? console.log(e) : null))}
        Error: see console!
      </span>
    );
  }

  // Select Flavor Buttons
  const selectFlavors = (item, index) => {
    const flovorsArray = [...chatButtons];
    for (let i = 0; i < chatButtons.length; i++) {
      if (flovorsArray[i].isSelected) {
        flovorsArray[i].childButtons[index].isSelected = !flovorsArray[i].childButtons[index].isSelected;
      }
    }
    setchatButtons(flovorsArray)
  }

  // Select Social Media Buttons
  const selectSocialMedial = (item, index) => {
    const socialMediaArray = [...chatButtons];
    socialMediaArray[index].isSelected = !socialMediaArray[index].isSelected;
    for (let i = 0; i < socialMediaArray.length; i++) {
      if (socialMediaArray[index].id === i) {
        socialMediaArray[i].isSelected = true;
        setchatButtons(socialMediaArray)
      } else {
        socialMediaArray[i].isSelected = false;
        setchatButtons(socialMediaArray)
      }
    }
  }

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

  var values = ["11", "12", "13", "14", "15", "20", "30"];
  var labels = ["A1", "A2", "A3", "A4", "A5", "B1", "B2"];
  var parents = ["", "A1", "A2", "A3", "A4", "", "B1"];

  return (
    <React.Fragment>
      {/* Main Container */}
      <div class="container">
        <div class="row justify-content-between mt-5">
          {
            chatButtons.map((item, index) => <>
              <div class="col-md-4">
                <button onClick={() => selectSocialMedial(item, index)} class={item.isSelected === true ? 'btn btn-danger w-100' : 'btn btn-dark w-100'}>{item.title}</button>
              </div>
            </>)
          }
        </div>
        <div class="row justify-content-between mt-5">
          {
            chatButtons.map((item, index) => <>
              {item.isSelected === true ? chatButtons[index].childButtons.map((item, index) =>
                <>
                  <div onClick={() => selectFlavors(item, index)} class={`col-md-3`}>
                    <button class={item.isSelected === true ? 'btn btn-info w-100' : 'btn btn-red w-100'}>{item.title}</button>
                  </div>
                </>
              ) : null}
            </>)
          }
          <div class="col-md-2">
            <button onClick={() => TwitterAPI()} class='btn btn-warning w-100'>Refresh Charts </button>
          </div>
        </div>
      </div>
      {/* Chart Section */}
      <div className="App">
        {
          chatButtons.map((item, index) => <>
            {item.isSelected === true ? chatButtons[index].childButtons.map((item, index) =>
              <>
                {item.isSelected === true ?
                  <Charts data={item.chartType === "bar" ? [
                    {
                      y: [10, 25, 30],
                      x: ["Negative", "Neutral", "Positive"],
                      type: item.chartType,
                      marker: { color: ["#E03C32", "#FFD301", "7BB662"] },
                    },
                  ] : item.chartType === "line" ? [
                    {
                      y: [20, 30],
                      x: [20, 30],
                      type: item.chartType,
                      mode: "lines",
                    },
                  ] : item.chartType === "treemap" ? [
                    {
                      type: item.chartType,
                      values: values,
                      labels: labels,
                      parents: parents,
                    },
                  ] : item.chartType === "bubble" ? [trace1, trace2, trace3] : null} stat={stats}></Charts>
                  :
                  null
                }
              </>
            ) : null}
          </>)
        }
      </div>
    </React.Fragment>
  );
}

export default App;
