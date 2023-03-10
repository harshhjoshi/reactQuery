import request from "../data/api";

/**
 * @GetMethod
 */
export const TwitterAPI = (networkrequest) =>
  request.getApiCall("TwitterAPI", networkrequest);
