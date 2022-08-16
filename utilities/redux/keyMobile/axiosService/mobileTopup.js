import { axiosNoAuth, createHeader } from "../../../api";
import { getItem } from "../../../asyncStorage";

const airTimeAction = async (payload) => {
  let token = await getItem("token");
  const {timestamp, apiKey} = createHeader()
 
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.post(`/Airtime/Recharge`, payload, {
    headers: headers,
  }).catch((err) => err)
};

const dataPlanAction = async (payload) => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()


  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  // /​MobileData/Products?PhoneNumber=08035614725
  return axiosNoAuth.get(`/MobileData/Products?PhoneNumber=${payload}`, {
    headers: headers,
  }).catch((err) => err)
};
const dataAction = async (payload) => {
  let token = await getItem("token");
 
 const {timestamp, apiKey} = createHeader()
  
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.post(`/MobileData/Recharge`,payload, {
    headers: headers,
  }).catch((err) => err)
};



export { airTimeAction, dataPlanAction, dataAction};
