import { axiosNoAuth, createHeader } from "../../../api";
import {
  resetPasswordPending,
  resetPasswordSuccess,
  resetPasswordFailure,
  resetPasswordReset
} from "../slice/resetPasswordSlice";
import uuid from "react-native-uuid";
import { getItem } from "../../../asyncStorage";


const sendOTPAction = (payload) => async (dispatch) => {
  let token = await getItem("token");

  const {timestamp, apiKey} = createHeader()
 
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  dispatch(resetPasswordPending());
  try {
    const res = await axiosNoAuth.post(
      "/Operations/SendUserOTP",
      {
        username: payload.username,
        action: "ForgotPassword",
        requestid: payload.id,
        source: "mobile",
      },
      {
        headers: headers,
      }
    );
  
    if (res.data.ResponseCode == "00") {
      dispatch(resetPasswordSuccess(res.data.ResponseDescription));

      setTimeout(() => dispatch(resetPasswordReset()), 6000)
    } else {
      dispatch(resetPasswordFailure(res.data.ResponseDescription));
      setTimeout(() => dispatch(resetPasswordReset()), 6000)
    }
  } catch (err) {
    
    dispatch(resetPasswordFailure(err.message));

   
  }
};

const changePasswordAction = (payload) => async (dispatch) => {
 
  const id = uuid.v4();
 const {timestamp, apiKey} = createHeader()
  
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
  };
  dispatch(resetPasswordPending());
  try {
    const res = await axiosNoAuth.post("/Operations/ForgotPassword", 
    {
      "source": "mobile",
      "otp": payload.otp,
      "pin": payload.pin,
      "RequestID": payload.id,
      "username": payload.username,
      "NewPassword": payload.password
    }
    ,
      {
        headers: headers,
      });

    if (res.data.ResponseCode == "00") {
      dispatch(resetPasswordSuccess(res.data.ResponseMessage));
      setTimeout(() => dispatch(resetPasswordReset()), 6000)

    } else {
      dispatch(resetPasswordFailure(res.data.ResponseMessage));
      setTimeout(() => dispatch(resetPasswordReset()), 6000)

    }
  } catch (err) {

    dispatch(resetPasswordFailure(err.message));
    setTimeout(() => dispatch(resetPasswordReset()), 6000)

  }
};

export { sendOTPAction, changePasswordAction };
