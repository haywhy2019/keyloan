import { createHeader, axiosNoAuth } from "../../../api";
import {
 accountTypePending,
 accountTypeSuccess,
 accountTypeFailure,
 accountTypeReset
} from "../slice/accountTypeSlice";

import moment from "moment";
import sha512 from "@cryptography/sha512";
import * as Device from "expo-device";



const getAccountTypeAction = (payload) => async (dispatch) => {
 
  const {timestamp, apiKey} = createHeader()

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
  };
  dispatch(accountTypePending());
  try {
    const res = await axiosNoAuth.get(`/Operations/GetProducts`, {
      headers: headers,
    });

   
    if (res.status === 200) {
      dispatch(accountTypeSuccess(res.data));
    } else {
      dispatch(accountTypeFailure("Something went wrong"));
    }
  } catch (err) {
    dispatch(accountTypeFailure(err.message || "Something went wrong"));
  }
};

export { getAccountTypeAction};
