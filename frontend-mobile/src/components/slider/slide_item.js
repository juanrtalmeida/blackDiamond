import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const { width, height } = Dimensions.get("screen");
export function SlideItem({ item }) {
  return (
    <View style={styles.container}>
      <Text>{item.title}</Text>
      {item.image ? (
        <Image
          resizeMode="contain"
          style={styles.container}
          source={item.image}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 500,
  },
});
