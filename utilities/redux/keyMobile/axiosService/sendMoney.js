import { axiosNoAuth, createHeader } from "../../../api";
import { getItem } from "../../../asyncStorage";

const sendMoneyKeyStoneAction = async (payload) => {
  let token = await getItem("token");
 
  const {timestamp, apiKey} = createHeader()
 

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };
  return axiosNoAuth.post(`/Transactions/IntrafundTransfer`, payload, {
    headers: headers,
  }).catch((err) => err)
};

const sendMoneyOthersAction = async (payload) => {
    let token = await getItem("token");
   
 const {timestamp, apiKey} = createHeader()
   
  
    const headers = {
      timestamp: timestamp,
      API_KEY: apiKey,
      authtoken: token,
  
    };
    return axiosNoAuth.post(`/Transactions/InterfundTransfer`, payload, {
      headers: headers,
    }).catch((err) => err)
  };

  const validateTPinAction = async (payload) => {
    let token = await getItem("token");
   
 const {timestamp, apiKey} = createHeader()
  
  
    const headers = {
      timestamp: timestamp,
      API_KEY: apiKey,
      authtoken: token,
  
    };
    return axiosNoAuth.post(`/Transactions/ValidateTpin`, payload, {
      headers: headers,
    }).catch((err) => err)
  };

export { sendMoneyKeyStoneAction, sendMoneyOthersAction , validateTPinAction};
