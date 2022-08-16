import { axiosNoAuth, createHeader, logoutTimer } from "../../../api";
import {
  loginPending,
  loginSuccess,
  loginFailure,
  resetError,
} from "../slice/authSlice";
import { defaultAccount } from "../slice/selectAccountSlice";
import * as Device from "expo-device";
import { setItem} from "../../../asyncStorage";



const deviceName = Device.brand;
const deviceManufacturer = Device.manufacturer;
const deviceDetail = Device.modelName;
const devicePlatform = Device.osName;
const deviceVersion = Device.osVersion;
const deviceSerial = Device.osBuildId;
const deviceId = Device.osInternalBuildId;

const loginAction = (payload) => async (dispatch) => {
 const {timestamp, apiKey} = createHeader()

const headers = {
  "timestamp": timestamp,
  "API_KEY": apiKey
}


  dispatch(loginPending());
  try {
    const res = await axiosNoAuth.post(
      "/userlogin/authenticate",

      {
        username: payload.username,
        password: payload.password,
        source: "mobile",
        mobiledevicedetails: deviceDetail,
        devicemanufacturer: deviceManufacturer,
        deviceplatform: devicePlatform,
        mobiledeviceid: deviceId,
        deviceserial: deviceSerial,
        deviceversion: deviceVersion,
      },
      {
       headers: headers
 
     }
    );
    
 
    if (res.data.ResponseCode === "00") {
      dispatch(loginSuccess(res.data));
      dispatch(defaultAccount(res.data.accounts[0]))
      setItem("username", payload.username);
      setItem("password", payload.password);
      setItem('token',res.data.jWTTokenResponse.Token)
      
    } else {
      dispatch(loginFailure(res.data.ResponseMessage));
    }

    console.log(res.data.jWTTokenResponse.Token, "token res");
  } catch (err) {
    
    dispatch(loginFailure(err.message || "Something went wrong"));
    setTimeout(() => dispatch(resetError()), 6000)
  }
};

export { loginAction };
