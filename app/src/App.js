import './App.css';
import { useQuery } from "@tanstack/react-query";

import { getProfileInfo, useGetStats } from "./data/api";
import Plot from "react-plotly.js";

function App() {
  const {isLoading: isLoadingStats, isErrorStats, error: errorStats, data: stats} = useGetStats();

  const {isLoading: isLoadingProfile, isError: isErrorProfile, error: errorProfile, data: profile} = useQuery({
    queryKey:["profile"],
    queryFn: getProfileInfo,
    refetchInterval: 300 * 1000
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
    <div className="App">
      <Plot 
        className='Chart'
        data={[{
          y: [stats?.timelineStats?.timeline[0].sentimentAsCategories.negativeExternalTweets, stats?.timelineStats?.timeline[0].sentimentAsCategories.neutralExternalTweets,stats?.timelineStats?.timeline[0].sentimentAsCategories.positiveExternalTweets ],
          x: ['Negative', 'Neutral', 'Positive'],
          type: 'bar',
          marker: {color: ['#E03C32', '#FFD301', '7BB662']},
        }]}
        layout={ {width: 500, height: 400, title: 'Sentiment Category Timeline'} }
      />
      <Plot 
        className='Chart'
        data={[{
          y: [stats?.timelineStats?.timeline[0].meanSentimentExternal, stats?.timelineStats?.timeline[1].meanSentimentExternal ],
          x: [stats?.timelineStats?.timeline[0].meanSentimentExternal, stats?.timelineStats?.timeline[1].meanSentimentExternal],
          type: 'line',
          mode: 'lines',
        }]}
        layout={ {width: 500, height: 400, title: 'Average Sentiment Timeline'} }
      />
    </div>
  );
}

export default App;
