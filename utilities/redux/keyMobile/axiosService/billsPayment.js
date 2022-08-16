import { axiosNoAuth, createHeader } from "../../../api";
import { getItem } from "../../../asyncStorage";

const billsCategoryAction = async (payload) => {
  let token = await getItem("token");
  const {timestamp, apiKey} = createHeader()
 
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.post(`/Billspayments/GetBillerCategory`, payload, {
    headers: headers,
  }).catch((err) => err)
};

const billCategoryOptionAction = async (payload) => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()


  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  
  return axiosNoAuth.get(`/Billspayments/GetBillerByCategory?categoryid=${payload}`, {
    headers: headers,
  }).catch((err) => err)
};
const billItemsAction = async (payload) => {
  let token = await getItem("token");
 console.log(payload, "payload")
 const {timestamp, apiKey} = createHeader()
  
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.get(`/Billspayments/GetBillerItems?billerid=${payload}`,{
    headers: headers,
  }).catch((err) => err)
};
const billPaymentAction = async (payload) => {
  let token = await getItem("token");
 
 const {timestamp, apiKey} = createHeader()
  
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.post(`/Billspayments/Billsadvice`,payload, {
    headers: headers,
  }).catch((err) => err)
};

const billValidateAction = async (payload) => {
  let token = await getItem("token");
 
 const {timestamp, apiKey} = createHeader()
  
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.post(`/Billspayments/CustomerValidation`,payload, {
    headers: headers,
  }).catch((err) => err)
};



export { billsCategoryAction, billPaymentAction, billCategoryOptionAction,billItemsAction, billValidateAction};
