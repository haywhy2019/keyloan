import { createHeader, axiosNoAuth } from "../../../api";
import {
  createNewAccountFailure,
  createNewAccountPending,
  createNewAccountSuccess,
  createNewAccountReset,
} from "../slice/createNewAccountSlice";



const createNewAccountAction = (payload) => async (dispatch) => {
  const {timestamp, apiKey} = createHeader()
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
  };
  dispatch(createNewAccountPending());
  try {
    const res = await axiosNoAuth.post(`/Operations/OpenAccount`, payload, {
      headers: headers,
    });

  
    if (res.data.ResponseCode === "00") {
      dispatch(createNewAccountSuccess(res.data));
      setTimeout(() => dispatch(createNewAccountReset()), 3000);
    } else {
      dispatch(createNewAccountFailure(res.data.ResponseMessage || "Something went wrong" ));
      setTimeout(() => dispatch(createNewAccountReset()), 3000);
    }
  } catch (err) {
    dispatch(createNewAccountFailure(err.message || "Something went wrong"));
    setTimeout(() => dispatch(createNewAccountReset()), 3000);
  }
};

export { createNewAccountAction };
