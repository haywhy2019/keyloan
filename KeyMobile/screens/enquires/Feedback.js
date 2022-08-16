import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, {useState, useEffect} from "react";
import { Input, DatePicker, CustomButton } from "../../components";
import { GLOBAL_STYLE } from "../../../constants";
import { useSelector } from "react-redux";
import moment from "moment";
import { enquiresAction } from "../../../utilities/redux/keyMobile/axiosService/enquiries";
import { SpinnerImage, BottomNotification, CustomSnackBar } from "../../components";




const Feedback = ({navigation}) => {

  const[name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [userEmail, setuserEmail] = useState("")
  const [date, setDate] = useState(new Date())
  const [comment, setComment] = useState("")
  const [phoneNo, setPhoneNo] = useState("")
  const [error, setError] = useState({})
  const {CustomerName,email,phoneno } = useSelector(state => state.auth.user)
 const [success, setSuccess] = useState(false)
 const [sendError, setSendError] = useState(false)
  useEffect(() => {
    setName(CustomerName)
    setuserEmail(email)
    setPhoneNo(phoneno)
  },[])
  const selectedAccount = useSelector(
    (state) => state.selectedAccount.accountDetails.accountno
  );

  const payload = {
    id: 0,
    FeedbackType: "feedback",
    customername: name,
    entrydate: date,
    phone: phoneNo,
    email: userEmail,
    comment: comment,
    accountno: selectedAccount,
    source: "mobile"

  }
  const submitHandler = () => {
   if(!comment){
    return setError({comment:"message cannot be empty"})
   }
   setError({})
  setLoading(true)
  enquiresAction(payload)
  .then(res => {
    if(res.status == 200){
      setSuccess(res.data)
      setTimeout(() => navigation.goBack(), 3000)
    }else {
      setSendError("An error occured. try again")
    }
  })
  .catch(err => {
    setSendError(err.message || "An error occured. try again")
  }).finally(() =>  setLoading(false))
  }
  if(loading){
    return (<SpinnerImage />)
  }
  return (
      <ScrollView contentContainerStyle={[GLOBAL_STYLE.scrollViewGlobalNopadding, {justifyContent: 'flex-start'}]}>
      <View style={{marginTop: 15, paddingHorizontal: '5%'}}>
      <Input 
        label="Name"
        placeholder="Enter your name" 
           value={name}
           onChange={(text) => setName(text)}
           editable={false}
        />
        <Input 
        label="Email"
        placeholder="Enter your email" 
        value={userEmail}
        onChange={(text) => setuserEmail(text)}
        editable={false}
        />
        <Input 
        label="Phone number"
        placeholder="Enter your number" 
        value={phoneNo}
        onChange={(text) => setPhoneNo(text)}
        />
      
        <Input 
        label="Date"
        value={moment(date).format("DD - MM - YYYY")}
        editable={false}
        />
      
        <Input
          placeholder="Enter your message"
          multiline={true}
          numberOfLines={7}
          inputCustomStyle={{
            height: 100,
            flexDirection: "row",
            alignItems: "flex-start",
          
          }}
          style={{ textAlignVertical: "top" }}
          value={comment}
          onChangeText={(text) => setComment(text)}
          error={error.comment}
        />
        <CustomButton buttonText="Send message"
        onPress={submitHandler}
        />
      
        </View> 
       
        <CustomSnackBar 
        show={sendError || success} 
        message={sendError || success}
        success={success ? success : false}
        />
      </ScrollView>
   
  );
};

export default Feedback;


