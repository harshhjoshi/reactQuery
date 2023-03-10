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
                  <Charts chartType={item.chartType} stat={stats}></Charts>
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
