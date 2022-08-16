import { View, Text , Pressable, StyleSheet} from 'react-native'
import React from 'react'
import { isAndroid, FONTS, COLORS } from '../../constants';

const MenuIconCard = ({ item, navigation }) => (
    <Pressable style={styles.menuIconCard} onPress={() => navigation.navigate(item.screen)}>
      <View>

        {item.icon}
      </View>
  
      <Text style={styles.menuText}>{item.label}</Text>
    </Pressable>
  );

export default MenuIconCard


const styles = StyleSheet.create({
    menuIconCard: {
        height: 80,
        width: 80,
        backgroundColor: "white",
        marginHorizontal: isAndroid? 3 : 5,
        marginVertical: 6,
        elevation:  5 ,
        // borderWidth: isAndroid? 0 : 5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      menuContainer: {
        alignItems: "center",
        justifyContent: "center",
       
      },
      menuText: {
        color: COLORS.primaryBlue,
        paddingHorizontal: 5,
        fontSize: 10,
        fontFamily: FONTS.normal,
        textAlign: "center",
        marginTop: 10,
      },
})

