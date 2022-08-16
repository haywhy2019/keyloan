import { axiosNoAuth, createHeader } from "../../../api";
import { getItem } from "../../../asyncStorage";

const bankListAction = async(payload) => {
    let token = await getItem("token");
  
 const {timestamp, apiKey} = createHeader()
 
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };

  return axiosNoAuth.get(`/Enquiry/GetNigerianBanks`, {

      headers: headers,
    })
    .catch((err) => err);
};

export {bankListAction };
