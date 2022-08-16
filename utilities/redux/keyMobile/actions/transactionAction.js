import { axiosNoAuth, createHeader } from "../../../api";
import {
  transactionPending,
  transactionFailure,
  transactionSuccess,
} from "../slice/transactionSlice";

import { getItem } from "../../../asyncStorage";

const transactionAction = (payload) => async (dispatch) => {
  let token = await getItem("token");
  const { timestamp, apiKey } = createHeader();
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,
  };
  dispatch(transactionPending());
  try {
    const res = await axiosNoAuth.post("/Operations/TransactionList", payload, {
      headers: headers,
    });

    if (res.status === 200) {
      dispatch(transactionSuccess(res.data));
    } else {
      dispatch(transactionFailure("Something went wrong"));
    }
  } catch (err) {
    dispatch(transactionFailure(err.message || "Something went wrong"));
  }
};

export { transactionAction };
