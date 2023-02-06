import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Button } from "react-native";
import * as Splash from "expo-splash-screen";
import { useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
} from "react-native";
import { colors } from "./src/assets/styles/colors";
import { TabRouter } from "./src/routes/router";

export default function App() {
  const [isFirstTime, setIsFirstTime] = useState(true);
  useEffect(() => {
    async function loadStorageData() {
      const isFirstTimeLocal = await AsyncStorage.getItem("firstTime");
      if (isFirstTimeLocal === "true") {
        setIsFirstTime(false);
      }
    }
    loadStorageData();
  }, []);

  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require("./src/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-Medium": require("./src/assets/fonts/Montserrat-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await Splash.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (isFirstTime) {
    return (
      <SafeAreaView
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}>
        <Text>First Time</Text>
        <Button
          onPress={() => {
            AsyncStorage.setItem("firstTime", "false");
            setIsFirstTime(false);
          }}
          title="Confirmar"
        />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            background: colors.quaternary,
            primary: "",
            card: "",
            text: "",
            border: "",
            notification: "",
          },
        }}>
        <TabRouter />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
