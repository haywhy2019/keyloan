import { axiosNoAuth, createHeader } from "../../../api";
import moment from "moment";
import sha512 from "@cryptography/sha512";
import { setItem } from "../../../asyncStorage";
import {
  userImageFailure,
  userImageSuccess,
  userImagePending,
} from "../slice/userImageSlice";
import { getItem } from "../../../asyncStorage";


const userImageAction = (payload) => async (dispatch) => {
  let token = await getItem("token");
 const {timestamp, apiKey} = createHeader()
  
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  
  dispatch(userImagePending());
  try {

    const res = await axiosNoAuth.post(
      "/Operations/UploadProfilePic",
      payload,
      {
        headers: headers,
      }
    );

    if (res.data.ResponseCode == "00") {
      dispatch(userImageSuccess(payload.Base64ProfilePic));
      setItem("profileImage",payload.Base64ProfilePic)
    } else {
      dispatch(userImageFailure("An error occured"));
    }
  } catch (err){
      dispatch(userImageFailure("Image not uploaded, try again later"));
    };
  
};

export { userImageAction };
