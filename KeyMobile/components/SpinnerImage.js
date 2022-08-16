import * as React from 'react';
import { View, Animated, Text, Easing, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import { images, COLORS } from '../../constants';

const spinValue = new Animated.Value(0);

export default function App({bgColor}) {
  React.useEffect(() => {
   Animated.loop(Animated.timing(spinValue, {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear,
    useNativeDriver: true,
  })).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
     <View style={[styles.container,{backgroundColor: bgColor ? bgColor : 'rgba(0, 37, 97, 0.5)'}]}>
   <Animated.Image
      style={{ transform: [{ rotate: spin }], width: 50, height: 50 }}
      source={images.keyMobileLogoRound}
    />
     </View> 
 
  );
}
const styles = StyleSheet.create({
    container: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      opacity: 0.7,
      justifyContent: "center",
      alignItems: "center",
    },
  });