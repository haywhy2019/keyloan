import { createHeader, axiosNoAuth } from "../../../api";
import { bvnPending, bvnFailure, bvnSuccess, reset } from "../slice/bvnSlice";

import { getItem } from "../../../asyncStorage";

const bvnAction = (payload) => async (dispatch) => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()
 
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
 
  dispatch(bvnPending());
  try {
    const res = await axiosNoAuth.post(`/Operations/BvnValidation`, payload, {
      headers: headers,
    });

    if (res.data.resultStatus === "00") {
      dispatch(bvnSuccess(res.data.bvnSearchResult));
    } else {
      dispatch(bvnFailure("Something went wrong"));
    }
  } catch (err) {
    dispatch(bvnFailure(err.message || "Something went wrong"));
  }
};

export { bvnAction };
