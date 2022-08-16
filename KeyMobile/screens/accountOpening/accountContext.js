import React, { useState, createContext } from "react";
import uuid from "react-native-uuid";

export const AccountFormContext = createContext();
const tokenId = uuid.v4();
export const Provider = (props) => {
  
  const [bvn, setBvn] = useState("");
  const [bvnToken, setBvnToken] = useState("")
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [gender, setGender] = useState("select gender");
  const [marital, setMarital] = useState("");
  const [date, setDate] = useState("");
  const [resAddress, setResaddress] = useState("");
  const [number, setNumber] = useState("");
  const [resState, setResState] = useState("");
  const [resCity, setResCity] = useState("");
  const [resCountry, setResCountry] = useState("");
  const [email, setEmail] = useState("");
  const [branch, setBranch] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [acctType, setAcctType] = useState("");
  const [passport, setPassport] = useState("");
  const [id, setId] = useState("");
  const [utility, setUtility] = useState("");
  const [signature, setSignature] = useState("");
  const [file1Name, setFile1name] = useState("");
  const [file2Name, setFile2name] = useState("");
  const [file3Name, setFile3name] = useState("");
  const [file4Name, setFile4name] = useState("");
  const [requestId, setRequestId] = useState(tokenId)
  const [] = useState("");

  return (
    <AccountFormContext.Provider
      value={{
        first: {
          bvn,
          setBvn,
          bvnToken,
          setBvnToken,
          firstName,
          setFirstName,
          lastName,
          setLastName,
          middleName,
          setMiddleName,
          number,
          setNumber,
          date,
          setDate,
          requestId,
          setRequestId
        },
        second: {
          gender,
          setGender,
          marital,
          setMarital,
          resAddress,
          setResaddress,
          resState,
          setResState,
          resCity,
          setResCity,
          resCountry,
           setResCountry,
          email,
          setEmail,
        },
        third: {
          branch,
          setBranch,
          referralCode,
          setReferralCode,
          acctType,
          setAcctType,
          passport,
          setPassport,
          utility,
          setUtility,
          signature,
          setSignature,
          id,
          setId,
          file1Name,
          setFile1name,
          file2Name,
          setFile2name,
          file3Name,
          setFile3name,
          file4Name,
          setFile4name,
          
      
          
        },
      }}
    >
      {props.children}
    </AccountFormContext.Provider>
  );
};
