import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as Splash from "expo-splash-screen";
import { useCallback } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { colors } from "./src/assets/styles/colors";
import { TabRouter } from "./src/routes/router";

export default function App() {
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

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <NavigationContainer
        theme={{ colors: { background: colors.quaternary } }}>
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
