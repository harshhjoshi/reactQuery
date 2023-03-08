import React, { useState } from "react";
import './App.css';
import Charts from './Components/Charts/Charts';
import { useQueryStatsHook, useQueryTwitterHook } from "./CustomHooks/useQueryHook";
import { GetStatsInfo } from "./data/api";

function App() {
  const [buttonSelected, setButtonSelected] = useState("0")
  const { data: stats, isLoadingStats, isErrorStats, errorStats } = useQueryStatsHook();
  const { data: twitter, isLoadingtwitter, isErrortwitter, errortwitter } = useQueryTwitterHook();
  var [buttonFlavors, setbuttonFlavor] = useState([{
    id: 0,
    title: 'Followers',
    isSelected: false
  },
  {
    id: 1,
    title: 'Sentiment',
    isSelected: false
  },
  ]);

  const isLoading = isLoadingtwitter || isLoadingStats;
  const isError = isErrortwitter || isErrorStats;
  const error = [errorStats, errortwitter];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <span>
        {error.forEach((e) => (e ? console.log(e) : null))}
        Error: see console!
      </span>
    );
  }

  const selectFlavors = (item, index) => {
    const flovorsArray = [...buttonFlavors];
    flovorsArray[index].isSelected = !flovorsArray[index].isSelected;
    setbuttonFlavor(flovorsArray)
  }

  return (
    <React.Fragment>
      {/* Main Container */}
      <div class="container">
        <div class="row justify-content-between mt-5">
          {/* Top Buttons */}
          <div class="col-md-4">
            {buttonSelected === "0" ?
              <button class='btn btn-danger w-100'>Twitter (Selected)</button>
              :
              <button onClick={() => setButtonSelected('0')} class='btn btn-dark w-100'>Twitter</button>
            }
          </div>
          <div class="col-md-4">
            {buttonSelected === "1" ?
              <button class='btn btn-danger w-100'>Instagram (Selected)</button>
              :
              <button onClick={() => setButtonSelected('1')} class='btn btn-dark w-100'>Instagram</button>
            }
          </div>
        </div>
        <div class="row justify-content-between mt-5">
          {
            buttonFlavors.map((item, index) =>
              <>
                {/* Top Buttons */}
                <div onClick={() => selectFlavors(item, index)} class="col-md-4">
                  <button class={item.isSelected === true ? 'btn btn-info w-100' : 'btn btn-red w-100'}>{item.title}</button>
                </div>
              </>
            )
          }
          <div class="col-md-2">
            <button onClick={() => GetStatsInfo()} class='btn btn-warning w-100'>Refresh Charts </button>
          </div>
        </div>
      </div>
      {/* Chart Section */}
      <div className="App">
        {
          buttonSelected === "0" && stats != undefined ?
            <>
              {
                buttonFlavors[0].isSelected === true ?
                  <Charts chartType="bar" Selected={buttonSelected} stat={stats}></Charts>
                  : null
              }
              {
                buttonFlavors[1].isSelected === true ?
                  <Charts chartType="line" Selected={buttonSelected} stat={stats}></Charts>
                  : null
              }
            </>
            :
            <>
              {
                buttonFlavors[0].isSelected === true ?
                  <Charts chartType="treemap" Selected={buttonSelected} stat={stats}></Charts>
                  : null
              }
              {
                buttonFlavors[1].isSelected === true ?
                  <Charts chartType="bubble" Selected={buttonSelected} stat={stats}></Charts>
                  : null
              }

            </>
        }
      </div>
    </React.Fragment>
  );
}

export default App;
