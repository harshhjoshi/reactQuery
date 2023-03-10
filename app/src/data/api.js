// I choose to handle the api calls in two different ways.
import axios from "axios";
import { endpointhairx } from "./EndPoints";

function generalUrl(url) {
    const apiUrl = "https://alivecore360.com/api/stats/v5?key=10df4436-c66a-4259-aad7-aa66f92c4425&";  //BaseUrl

    let baseURL = apiUrl + endpointhairx.routes[url];
    return {
        baseURL,
    };
}

const getApiCall = (url, data) => {
    return new Promise(async (resolve, reject) => {
        const { baseURL } = generalUrl(url);
        await axios.get(baseURL).then((data) => {
            resolve(data.data);
        })
            .catch((error) => {
                return error;
            });
    });
};

export default {
    getApiCall,
};
