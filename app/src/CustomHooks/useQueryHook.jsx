import { useQuery } from "@tanstack/react-query";

// Stars Hook
export const useQueryStatsHook = (
  data,
  isLoadingStats,
  isErrorStats,
  errorStats,
  GetStatsInfo,
  key
) =>
  useQuery({
    queryKey: key,
    queryFn: GetStatsInfo,
    refetchInterval: 300000,
    staleTime: 300000,
  });

export default {
  useQueryStatsHook,
};
