// I choose to handle the api calls in two different ways. 
import data from './tweetsdatatask.json';

import { useQuery } from "@tanstack/react-query";

const BASE_URL = data;

export const getProfileInfo = () => {
    const rVal = new Promise((res) => {
        res(BASE_URL.Profile_Info['User Info'])
    });

    return rVal;
}

export const useGetStats = () => {
    const getStats = () => {
        const rVal = new Promise((res) => {
            res(BASE_URL.stats.twitter)
        });
    
        return rVal;
    }
    const useGetStatsResponse = useQuery({
            queryKey:["stats"],
            queryFn: getStats,
            refetchInterval: 300 * 1000,
    })

    return useGetStatsResponse;
}