import { axiosNoAuth, createHeader } from "../../../api";
import { getItem } from "../../../asyncStorage";

const beneficiaryListAction = async(payload) => {
    let token = await getItem("token");
  
    const {timestamp, apiKey} = createHeader()

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,

  };

  return axiosNoAuth.get(`/Beneficiary/get?username=${payload}`, {
      headers: headers,
    })
    .catch((err) => err);
};

export {beneficiaryListAction };
