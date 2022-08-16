import { configureStore,
  combineReducers,

} from "@reduxjs/toolkit";
import authReducer from "./keyMobile/slice/authSlice"
import resetPasswordReducer from "./keyMobile/slice/resetPasswordSlice"
import loanAccountReducer from "./keyMobile/slice/loanAccountDetailsSlice"
import loanCreateReducer from "./keyMobile/slice/loanCreateSlice"
import allBranchReducer from "./keyMobile/slice/allBranchSlice";
import accountTypeReducer from "./keyMobile/slice/accountTypeSlice"
import createAccountReducer from "./keyMobile/slice/createNewAccountSlice"
import bvnReducer from "./keyMobile/slice/bvnSlice"
import accountDetailsReducer from "./keyMobile/slice/selectAccountSlice"
import transactionReducer from "./keyMobile/slice/transactionSlice"
import userImageReducer from "./keyMobile/slice/userImageSlice"
import accountBalanceReducer from "./keyMobile/slice/accountBalanceSlice"
import loanAllReducer from "./keyMobile/slice/loanAllSlice"
const combinedReducer = combineReducers({
       auth: authReducer,
      resetPasswordReducer: resetPasswordReducer,
      loan: loanAccountReducer,
      loanCreate: loanCreateReducer,
      loanAll: loanAllReducer,
      allBranch: allBranchReducer,
      accountType: accountTypeReducer,
      createNewAccount: createAccountReducer,
      bvn: bvnReducer,
      selectedAccount: accountDetailsReducer,
      transaction: transactionReducer,
      userImage: userImageReducer,
      accountBalance: accountBalanceReducer,
  

});

const rootReducer = (state, action) => {
 
  if (action.type === 'auth/logout') {
    state = undefined;
   
    
  }
  return combinedReducer(state, action);
};

export const store =  configureStore({
  reducer: rootReducer
});



