// import {
//   StyleSheet,
//   Text,
//   View,
//   ImageBackground,
//   TouchableOpacity,
// } from "react-native";
// import React from "react";
// import { isAndroid, COLORS, images, FONTS } from "../../constants";
// import { Ionicons } from "@expo/vector-icons";
// import {
//   MenuIcon,
//   NotifcationMesgIcon,
//   SendMoneyDrawerIcon,
//   SendMoneyPhoneDrawerIcon,
//   RewardsDrawerIcon,
//   DrawerIcon2,
//   DrawerIcon3,
//   MobileBankingLimitDrawerIcon,
//   AccountSecurityDrawerIcon,
//   LocateUsDrawerIcon,
// } from "../../constants/icons";

// const CustomHeader = ({ title, drawer, navigation }) => {
//   return (
//     <View>
//       {isAndroid ? (
//         <ImageBackground
//           source={images.headerImg}
//           style={{ width: "100%", height: 90 }}
//         >
//           <View>
//             {drawer ? (
//               <View style={styles.container}>
//                 <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
//                   <View style={styles.menuIcon}>
//                     <MenuIcon
//                       height={40}
//                       color={isAndroid ? "white" : COLORS.primaryBlue}
//                     />
//                   </View>
//                 </TouchableOpacity>
//                 <View>
//                   <Text style={styles.title}>{`Hi ${title}`}</Text>
//                 </View>
//                 <View style={styles.messageIcon}>
//                   <NotifcationMesgIcon
//                     height={40}
//                     color={isAndroid ? "white" : COLORS.primaryBlue}
//                   />
//                 </View>
//               </View>
//             ) : (
//               <View style={styles.container2}>
//                 <TouchableOpacity style={styles.backContainer} onPress={() => navigation.goBack()}>
//                   <Ionicons name="chevron-back" size={20} color="white" />
//                   <Text style={styles.backText}>Back</Text>
//                 </TouchableOpacity>
//                 <View style={styles.container2Title}>
//                   <Text style={styles.title2}>{title}</Text>
//                 </View>

//               </View>
//             )}
//           </View>
//         </ImageBackground>
//       ) : (
//         <View>
//           <Text>ios</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default CustomHeader;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingTop: 22,
//     alignItems: "center",
//   },
//   menuIcon: { marginTop: 20, paddingLeft: 10 },
//   messageIcon: { marginTop: 20, paddingRight: 10 },
//   title: {
//     color: isAndroid ? "white" : COLORS.primaryBlue,
//     fontFamily: FONTS.bold,
//     fontSize: 20,
//   },
//   container2: {
//     flexDirection: "row",
  
//     paddingTop: 40,
  
//   },
//   backContainer: {
//     flexDirection: "row",
//     alignItems: "center",

//     paddingLeft: 10,
//   },
//   backText: {
//     color: COLORS.white,
//   },
//   container2Title: {
//     flexGrow: 1,
  
//   },
//   title2: {
//     color: isAndroid ? "white" : COLORS.primaryBlue,
//     fontFamily: FONTS.bold,
//     fontSize: 20,
//     textAlign: 'center',
//     paddingRight: 45
//   },
  
// });
