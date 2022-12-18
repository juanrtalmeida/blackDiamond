import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Teste } from "./src/components/test";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.teste}>Testando o app</Text>
      <StatusBar style="auto" />
      <Teste />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A40000",
    alignItems: "center",
    justifyContent: "center",
  },

  teste: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A40000",
    color: "#Afff",
  },
});
