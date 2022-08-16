import { axiosNoAuth, createHeader } from "../../../api";
import { getItem } from "../../../asyncStorage";


const changePasswordAction = async(payload) => {
  let token = await getItem("token");
  
 const {timestamp, apiKey} = createHeader()
  
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };

  return axiosNoAuth.post("/Operations/ChangePassword", payload, {
      headers: headers,
    })
    .catch((err) => err);
};

export {changePasswordAction };
