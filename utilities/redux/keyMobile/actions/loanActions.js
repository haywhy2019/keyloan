import {createHeader, axiosNoAuth } from "../../../api";
import {
  loanPending,
  loanFailure,
  loanSuccess,
  loanErrReset,
  loanSuccessRest
} from "../slice/loanAccountDetailsSlice";
import {
  loanCreatePending,
  loanCreateFailure,
  loanCreateSuccess,
  loanCreateErrReset,
} from "../slice/loanCreateSlice";
import {
  loanAllPending,
  loanAllFailure,
  loanAllSuccess
} from "../slice/loanAllSlice"

import { getItem } from "../../../asyncStorage";

const loanAccountDetailAction = (payload) => async (dispatch) => {
  let token = await getItem("token");

 const {timestamp, apiKey} = createHeader()


  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,
  };
  dispatch(loanPending());
  try {
    const res = await axiosNoAuth.get(
      `/DigitalLending/AccountEnquiry/${payload}`,
      {
        headers: headers,
      }
    );

    if (res.status === 200) {
      dispatch(loanSuccess(res.data));
    } else {
      dispatch(loanFailure("Something went wrong"));
    }
  } catch (err) {
    dispatch(loanFailure(err.message || "Something went wrong"));
  }
};
const createLoan = (payload) => async (dispatch) => {
  const {timestamp, apiKey} = createHeader()

  let token = await getItem("token");

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,
  };

  dispatch(loanCreatePending());
  try {
    const res = await axiosNoAuth.post("/DigitalLending/CreateLoan", payload, {
      headers: headers,
    });
    if (res.data.status === "00") {
      dispatch(loanCreateSuccess(res.data));
     
    } else {
      dispatch(loanCreateFailure(res.data.errormessage));
      setTimeout(() => dispatch(loanCreateErrReset()),3000)
    }
  } catch (err) {
    dispatch(loanCreateFailure(err.message || "Something went wrong"));
    setTimeout(() => dispatch(loanCreateErrReset()),3000)
  }
};

const createLoanDoc = (payload) => async (dispatch) => {
  const {timestamp, apiKey} = createHeader()
 
  let token = await getItem("token");

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,
  };

  dispatch(loanCreatePending());
  try {
    const res = await axiosNoAuth.post("/DigitalLending/CreateLoanDoc", payload, {
      headers: headers,
    });
 
    if (res.data[0].status === "00") {
      dispatch(loanCreateSuccess(res.data));
     
    } else {
      dispatch(loanCreateFailure(res.data.errormessage));
      setTimeout(() => dispatch(loanCreateErrReset()),3000)
    }
  } catch (err) {
  
    dispatch(loanCreateFailure(err.message || "Something went wrong"));
    setTimeout(() => dispatch(loanCreateErrReset()),3000)
  }
};


const allLoans = (payload) => async (dispatch) => {
  const {timestamp, apiKey} = createHeader()

  let token = await getItem("token");

  const headers = {
    timestamp: timestamp,
    API_KEY: apiKey,
    authtoken: token,
  };

  dispatch(loanAllPending());
  try {
    const res = await axiosNoAuth.get(`/DigitalLending/CustomerLoans/${payload}`,payload,{
      headers: headers,
    });
    
  
    if (res.status == 200) {
  
      dispatch(loanAllSuccess(res.data));
     
    } else {
      dispatch(loanAllFailure(res.data.errormessage));
    
    }
  } catch (err) {
  
    dispatch(loanAllFailure(err.message || "Something went wrong"));
  }
};


export { loanAccountDetailAction, createLoan, allLoans , createLoanDoc};




