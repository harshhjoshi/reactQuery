import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Plot from "react-plotly.js";
import './App.css';
import { getProfileInfo, GetStatsInfo } from "./data/api";

function App() {
  const [buttonSelected, setButtonSelected] = useState("0")
  const { isLoading: isLoadingStats, isError: isErrorStats, error: errorStats, data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: GetStatsInfo,
    refetchInterval: 300000,
    staleTime: 300000
  })

  const { isLoading: isLoadingProfile, isError: isErrorProfile, error: errorProfile, data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileInfo,
    refetchInterval: 300000,
    staleTime: 300000
  })

  const isLoading = isLoadingProfile || isLoadingStats;
  const isError = isErrorProfile || isErrorStats;
  const error = [errorProfile, errorStats];

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

  return (
    <React.Fragment>
      {/* Main Container */}
      <div class="container">
        <div class="row justify-content-between mt-5">
          {/* Top Buttons */}
          <div class="col-md-4">
            {buttonSelected === "0" ?
              <button class='btn btn-info w-100'>Followers (Selected)</button>
              :
              <button onClick={() => setButtonSelected('0')} class='btn btn-success w-100'>Followers </button>
            }
          </div>
          <div class="col-md-4">
            {buttonSelected === "0" ?
              <button onClick={() => setButtonSelected('1')} class='btn btn-success w-100'>Sentiment</button>
              :
              <button class='btn btn-info w-100'>Sentiment (Selected)</button>
            }
          </div>
          <div class="col-md-2">
            <button onClick={() => GetStatsInfo()} class='btn btn-warning w-100'>Refresh Charts </button>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="App">
        {/* First Chart */}
        <Plot
          className='Chart'
          data={buttonSelected === "0" ? [{
            y: [stats.stats.twitter?.timelineStats?.timeline[0].sentimentAsCategories.negativeExternalTweets + 10, stats.stats.twitter?.timelineStats?.timeline[0].sentimentAsCategories.neutralExternalTweets, stats.stats.twitter?.timelineStats?.timeline[0].sentimentAsCategories.positiveExternalTweets],
            x: ['Negative', 'Neutral', 'Positive'],
            type: 'bar',
            marker: { color: ['#E03C32', '#FFD301', '7BB662'] },
          }] :
            [{
              y: [stats.stats.twitter?.timelineStats?.timeline[0].meanSentimentExternal, stats.stats.twitter?.timelineStats?.timeline[0].meanSubjectivity],
              x: [stats.stats.twitter?.timelineStats?.timeline[0].meanSentimentExternal, stats.stats.twitter?.timelineStats?.timeline[0].meanSubjectivity],
              type: 'line',
              mode: 'lines',
            }]
          }
          layout={{ width: 500, height: 400, title: buttonSelected === "1" ? 'Sentiment Category Timeline - 1' : 'Average Sentiment Timeline - 1' }}
        />

        {/* Second Chart */}
        <Plot
          className='Chart'
          data={buttonSelected === "0" ? [{
            y: [stats.stats.twitter?.timelineStats?.timeline[0].sentimentAsCategories.negativeExternalTweets + 10, stats.stats.twitter?.timelineStats?.timeline[0].sentimentAsCategories.neutralExternalTweets, stats.stats.twitter?.timelineStats?.timeline[0].sentimentAsCategories.positiveExternalTweets],
            x: ['Negative', 'Neutral', 'Positive'],
            type: 'histogram2dcontour',
            marker: { color: ['#E03C32', '#FFD301', '7BB662'] },
          }] :
            [{
              y: [stats.stats.twitter?.timelineStats?.timeline[0].meanSentimentExternal, stats.stats.twitter?.timelineStats?.timeline[0].meanSubjectivity],
              x: [stats.stats.twitter?.timelineStats?.timeline[0].meanSentimentExternal, stats.stats.twitter?.timelineStats?.timeline[0].meanSubjectivity],
              type: 'waterfall',
              mode: 'lines',
            }]
          }
          layout={{ width: 500, height: 400, title: buttonSelected === "1" ? 'Sentiment Category Timeline - 2' : 'Average Sentiment Timeline - 2' }}
        />
      </div>
    </React.Fragment>

  );
}

export default App;
