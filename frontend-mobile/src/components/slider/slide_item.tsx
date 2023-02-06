import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import type { ImageSourcePropType } from "react-native";

const { width, height } = Dimensions.get("screen");
export function SlideItem({
  title,
  image,
}: {
  title: string;
  image: ImageSourcePropType;
}) {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      {image ? (
        <Image resizeMode="contain" style={styles.container} source={image} />
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
