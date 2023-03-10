// I choose to handle the api calls in two different ways.
import axios from "axios";
const handleCallUrl = "https://alivecore360.com/api/stats/v5?key=10df4436-c66a-4259-aad7-aa66f92c4432&Twitter_handler=kesharose&lang=en&days=2&type=followers&interval=day&start_date=undefined&end_date=undefined";
const stateCallUrl = "https://alivecore360.com/api/stats/v5?key=10df4436-c66a-4259-aad7-aa66f92c4432&Twitter_handler=nike&lang=en&days=2&type=sentiment&interval=day&start_date=undefined&end_date=undefined";

// This Function use to fetch Twitter Data
export const getProfileInfo = () => {
    const rVal = new Promise(async (res) => {
        await axios.get(handleCallUrl).then((response) => {
            res(response.data) // Sending Response Return
            console.log('Handlling API FIRST :', response.data);
        });
    });

    return rVal;
}

// This Function use to fetch Chart Datas and That Refresh Button works with this Function
export const GetStatsInfo = () => {
    const rVal = new Promise(async (res) => {
        await axios.get(stateCallUrl).then((response) => {
            res(response.data) // Sending Response Return
            console.log('Stats API SECOND:', response.data);
        });
    });

    return rVal;
}