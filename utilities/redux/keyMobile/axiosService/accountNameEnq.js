import { axiosNoAuth } from "../../../api";
import { getItem } from "../../../asyncStorage";
import { createHeader } from "../../../api";

const accountNameAction = async(payload) => {
    let token = await getItem("token");
 const {timestamp, apiKey} = createHeader()
  
  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };

  return axiosNoAuth.post(`/Enquiry/NIPNameEnquiry`, payload, {

      headers: headers,
    })
    .catch((err) => err);
};

export {accountNameAction };
