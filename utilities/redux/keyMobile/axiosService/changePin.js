import { axiosNoAuth } from "../../../api";
import { getItem } from "../../../asyncStorage";


const changePinAction = async(payload) => {
  let token = await getItem("token");
  
  const {timestamp, apiKey} = createHeader()
 
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };

  return axiosNoAuth.post("/Operations/ChangeMobileTPin", payload, {
      headers: headers,
    })
    .catch((err) => err);
};

export {changePinAction };
