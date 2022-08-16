import { axiosNoAuth, createHeader } from "../../../api";
import { getItem } from "../../../asyncStorage";


const tLimitPinAction = async(payload) => {
  let token = await getItem("token");
  
  const {timestamp, apiKey} = createHeader()
 
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };

  return axiosNoAuth.post("/Operations/LimitUpdate", payload, {
      headers: headers,
    })
    .catch((err) => err);
};

const tLimitCardAction = async(payload) => {
    let token = await getItem("token");
 const {timestamp, apiKey} = createHeader()
   
    const headers = {
      timestamp: timestamp,
      API_KEY: apiKey,
      authtoken: token,
  
    };
  
    return axiosNoAuth.post("/Operations/LimitUpdate", payload, {
        headers: headers,
      })
      .catch((err) => err);
  };

  const tLimitTokenAction = async(payload) => {
    let token = await getItem("token");
    
 const {timestamp, apiKey} = createHeader()
   
    const headers = {
      timestamp: timestamp,
      API_KEY: apiKey,
      authtoken: token,
  
    };
  
    return axiosNoAuth.post("/Operations/LimitUpdate", payload, {
        headers: headers,
      })
      .catch((err) => err);
  };

export {tLimitPinAction, tLimitCardAction, tLimitTokenAction };
