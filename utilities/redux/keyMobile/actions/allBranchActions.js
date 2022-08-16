import { createHeader, axiosNoAuth } from "../../../api";
import {
  branchPending,
  branchFailure,
  branchSuccess,
  branchReset,
} from "../slice/allBranchSlice";





const getAllBranchAction = (payload) => async (dispatch) => {
 
  const {timestamp, apiKey} = createHeader()

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
  };
  dispatch(branchPending());
  try {
    const res = await axiosNoAuth.get(`/Branch/getlist`, {
      headers: headers,
    });

    if (res.status === 200) {
      dispatch(branchSuccess(res.data));
    } else {
      dispatch(branchFailure("Something went wrong"));
    }
  } catch (err) {
    dispatch(branchFailure(err.message || "Something went wrong"));
  }
};

export { getAllBranchAction };
