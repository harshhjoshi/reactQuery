import { useQuery } from "@tanstack/react-query";
import { getProfileInfo, GetStatsInfo } from "../data/api";

export const useQueryStatsHook = () =>
  useQuery({
    queryKey: ["stats"],
    queryFn: GetStatsInfo,
    refetchInterval: 300000,
    staleTime: 300000,
  });

export const useQueryTwitterHook = () =>
  useQuery({
    queryKey: ["twitter"],
    queryFn: getProfileInfo,
    refetchInterval: 300000,
    staleTime: 300000,
  });
