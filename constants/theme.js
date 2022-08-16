import { Dimensions, Platform, StyleSheet  } from "react-native";
const { width, height } = Dimensions.get("window");
import {widthPercentageToDP as responsiveWidth, heightPercentageToDP as responsiveHeight} from 'react-native-responsive-screen';



export const COLORS = {
    primaryBlue: "#002561",
    primaryBlue2: "#4EABE9",
    secondaryBlue: '#BDE4FE',
    secondaryBlue2: '#D7EFFF',
    secondaryBlue3: '#77869E',
    primaryGreen: '#1EBD71',
    primaryYellow: '#FFDD67',
    white: "#FFFFFF",
    grey: '#C4C4C4',
    grey2: "#F2F2F2",
    danger: '#FF0000',
    error: '#ff0033'

}

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';


export const SIZES = {
    height,
    width,
    responsiveHeight,
    responsiveWidth
}

const globalstyle = StyleSheet.create({
    customFont: {
        fontFamily: 'Poppins_400Regular'
    },
    customFontBold: {
        fontFamily: 'Poppins_500Medium',
        // fontFamily: 'Poppins_700Bold'

        
    },
    background: {
        backgroundColor: COLORS.white, 
        flex: 1,
        paddingHorizontal: '5%'
    },
    backgroundNoPadding: {
      backgroundColor: COLORS.white, 
      flex: 1,
   
  },
    scrollStyle:  {
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    backgroundColor: 'white',
    paddingHorizontal: '5%'
       
      },
      scrollStyleNoPadding:  {
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    backgroundColor: 'white',
  
       
      },
      rowBetween: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      rowAround: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      columnAround: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
      },
      columnBetween: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      },
      h1Bold: {
        // fontSize: 20,
        fontSize: SIZES.responsiveHeight("3%"),
        fontFamily:  'Poppins_500Medium',
        color: COLORS.primaryBlue
      },
      h2Bold:{
        // fontSize: 16,
        fontSize: SIZES.responsiveHeight("2.5%"),
        fontFamily:  'Poppins_500Medium',
        color: COLORS.primaryBlue
      },
      h3Bold: {
        // fontSize: 14,
        fontSize: SIZES.responsiveHeight("2.3%"),
        fontFamily:  'Poppins_500Medium',
        color: COLORS.primaryBlue
      },
      h4Bold: {
        fontSize: SIZES.responsiveHeight("2%"),
        fontFamily:  'Poppins_500Medium',
        color: COLORS.primaryBlue
      },
      h5Bold: {
        // fontSize: 10,
        fontSize: SIZES.responsiveHeight("1.5%"),
        fontFamily:  'Poppins_500Medium',
        color: COLORS.primaryBlue
      },
      h1: {
        // fontSize: 20,
        fontSize: SIZES.responsiveHeight("3%"),
        fontFamily: 'Poppins_400Regular',
        color: COLORS.primaryBlue
      },
      h2:{
        // fontSize: 16,
        fontSize: SIZES.responsiveHeight("2.5%"),
        fontFamily: 'Poppins_400Regular',
        color: COLORS.primaryBlue
      },
      h3: {
        // fontSize: 14,
        fontSize: SIZES.responsiveHeight("2.3%"),
        fontFamily: 'Poppins_400Regular',
        color: COLORS.primaryBlue,
      },
      h4: {
        fontSize: SIZES.responsiveHeight("2%"),
        fontFamily: 'Poppins_400Regular',
        color: COLORS.primaryBlue
      },
      h5: {
        fontSize: SIZES.responsiveHeight("1.5%"),
        fontFamily: 'Poppins_400Regular',
        color: COLORS.primaryBlue
      }
})
export const FONTS = {
    normal: globalstyle.customFont.fontFamily,
    bold:  globalstyle.customFontBold.fontFamily 
}

export const GLOBAL_STYLE = {
background: globalstyle.background,
backgroundNoPadding: globalstyle.backgroundNoPadding,
scrollViewGlobal: globalstyle.scrollStyle,
scrollViewGlobalNopadding: globalstyle.scrollStyleNoPadding,
rowBetween: globalstyle.rowBetween,
rowAround: globalstyle.rowAround,
columnBetween: globalstyle.columnBetween,
columnAround: globalstyle.columnAround,
h1: globalstyle.h1,
h2: globalstyle.h2,
h3: globalstyle.h3,
h4: globalstyle.h4,
h5: globalstyle.h5,
h1Bold: globalstyle.h1Bold,
h2Bold: globalstyle.h2Bold,
h3Bold: globalstyle.h3Bold,
h4Bold: globalstyle.h4Bold,
h5Bold: globalstyle.h5Bold
}
const appTheme = {COLORS, SIZES, isIOS, isAndroid, FONTS, isAndroid, isIOS, GLOBAL_STYLE};


export default appTheme;