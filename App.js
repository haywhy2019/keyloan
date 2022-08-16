import "react-native-gesture-handler";
import React from "react";
// import { useFonts } from "expo-font";
import AllNavigation from "./navigation/navigation";
import { Provider } from "react-redux";
import { store } from "./utilities/redux/store";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

function App() {
  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaProvider>
      <AllNavigation />
      </SafeAreaProvider>
     
    </Provider>
  );
}

export default App;
