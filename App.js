import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Dimensions, Animated } from "react-native";
import CircularCarousel from "./src/components/CircularCarousel";

const data = [
  require("./src/assets/images/image_1.jpg"),
  require("./src/assets/images/image_2.jpg"),
  require("./src/assets/images/image_3.jpg"),
  require("./src/assets/images/image_4.jpg"),
  require("./src/assets/images/image_5.jpg"),
  require("./src/assets/images/image_6.jpg"),
  require("./src/assets/images/image_7.jpg"),
  require("./src/assets/images/image_8.jpg"),
];

export default function App() {
  return (
    <View style={styles.container}>
      <CircularCarousel data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
