import { axiosNoAuth, createHeader } from "../../../api";
import { getItem } from "../../../asyncStorage";

const sendStatement = async(payload) => {
  let token = await getItem("token");
  const {timestamp, apiKey} = createHeader()
 

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.post("/Enquiry/SendStatement", payload, {
    headers: headers,
  }).catch((err) => err)
};

const rangeStatement = async(payload) => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()


  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.post("/Enquiry/Statement", payload, {
    headers: headers,
  }).catch((err) => err)
};

export { sendStatement, rangeStatement };
