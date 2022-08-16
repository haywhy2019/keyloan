import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import { GLOBAL_STYLE, COLORS, FONTS } from "../../../../constants";
import {
  SpinnerImage,
  DatePicker,
  CustomButton,
  CustomSnackBar,
} from "../../../components";
import { NoDataFound } from "../../../components";
import { rangeStatement } from "../../../../utilities/redux/keyMobile/axiosService/accountStatement";
import { useSelector } from "react-redux";
import { DebitAccountIcon, CreditAccountIcon } from "../../../../constants/icons";
import moment from "moment";



const SecondTab = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataErr, setDataErr] = useState(false);

  const [showDialogue, setShowDialogue] = useState(false);
  const [errors, setErrors] = useState({});
  const [startDateRment, setStartDateRment] = useState(new Date());
  const [showStartDateRment, setShowStartDateRment] = useState(false);
  const [endDateRment, setEndDateRment] = useState(new Date());
  const [showEndDateRment, setShowEndDateRment] = useState(false);
  const [startDateRPlaceHolder, setStartDateRPlaceholder] =
    useState("DD/MM/YYYY");
  const [endDateRPlaceHolder, setEndDateRPlaceholder] = useState("DD/MM/YYYY");

  const selectedAccount = useSelector(
    (state) => state.selectedAccount.accountDetails.accountno
  );

  const HistoryCard = ({ item }) => {
  
    return (
      <View style={styles.mainContainer}>
        <View style={styles.imageNameContainer}>
          {item?.Craccount == selectedAccount ? (
            <CreditAccountIcon />
          ) : (
            <DebitAccountIcon />
          )}
          <View>
            <Text style={styles.name}>{item?.Craccountname?.slice(0, 16) || "Not Available"}</Text>
            <Text style={styles.narration}>{item?.Narration?.slice(0, 16)  || "Not Available"}</Text>
          </View>
        </View>
        <View>
          {item?.Craccount == selectedAccount ? (
            <Text style={styles.amount}>{+item?.Amount  || "Not Available"}</Text>
          ) : (
            <Text style={[styles.amount, { color: "red" }]}>{-item?.Amount  || "Not Available"}</Text>
          )}
  
          <Text style={styles.date}>
            {moment(item?.transactiondate).format(" MMM Do YYYY")}
          </Text>
        </View>
      </View>
    );
  };
  const submitHandlerRange = () => {
   
    if (startDateRPlaceHolder) {
      return setErrors({ startDateRment: "This field is required" });
    }
    if (endDateRPlaceHolder) {
      return setErrors({ endDateRment: "This field is required" });
    }

    setErrors({});

    const payload = {
      startdate: startDateRment,
      enddate: endDateRment,
      accountno: selectedAccount,
    };

    setLoading(true);
    setDataErr("")
    rangeStatement(payload)
      .then((res) => {
        if (res.status == 200) { 
          setData(res.data.statement);
         
        } else {
          setDataErr(res.data.errormessage || "An error occured");
          setData("")
        }
      })
      .catch((err) => {
        setDataErr(err.message || "An error occured");
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <SpinnerImage bgColor={"white"} />;
  }
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 40,
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <View>
          <Pressable onPress={() => setShowStartDateRment(true)}>
            <DatePicker
              inputLabel="Enter Start Date"
              placeholder={startDateRPlaceHolder}
              show={showStartDateRment}
              value={startDateRment}
              onChange={(event, date) => {
                setShowStartDateRment(false);
                setStartDateRPlaceholder(false);
                setStartDateRment(date);
              }}
              error={errors.startDateRment}
            />
          </Pressable>

          <Pressable
            onPress={() => setShowEndDateRment(true)}
            style={{ marginVertical: 20 }}
          >
            <DatePicker
              inputLabel="Enter End Date"
              placeholder={endDateRPlaceHolder}
              show={showEndDateRment}
              value={endDateRment}
              onChange={(event, date) => {
                setShowEndDateRment(false);
                setEndDateRment(date);
                setEndDateRPlaceholder(false);
              }}
              error={errors.endDateRment}
            />
          </Pressable>
        </View>
        <CustomSnackBar show={dataErr} message={dataErr} />
        <CustomButton
          buttonText={"Show Transaction"}
          onPress={submitHandlerRange}
        />
      </View>
      {data ? (
 <FlatList 
 data={data}
 renderItem={HistoryCard}
 keyExtractor={(item, index) => index.toString()}
 />
      ): (
  <NoDataFound 
  heading={"No Transaction!"}
  infoText="Dear customer, No transaction found for the selected range"
  />      
      )}
     
    </View>
  );
};

export default SecondTab;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(163, 216, 245, 0.2)",
    paddingVertical: 10,
  },
  imageNameContainer: { flexDirection: "row", alignItems: "center" },
  logo: { width: 40, height: 40 },
  name: { marginLeft: 10, color: COLORS.primaryBlue, fontFamily: FONTS.normal },
  amount: {
    color: COLORS.primaryGreen,
    textAlign: "right",
    fontFamily: FONTS.normal,
  },
  date: {
    color: COLORS.primaryBlue,
    textAlign: "right",
    fontFamily: FONTS.normal,
  },
  narration: { marginLeft: 10, color: COLORS.grey, fontFamily: FONTS.normal },
 
});
