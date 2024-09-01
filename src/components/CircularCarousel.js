import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import CircularCarouselListItem, {
  ListItemWidth,
} from "./CircularCarouselListItem";
import { useSharedValue } from "react-native-reanimated";
import React from "react";

const { width } = Dimensions.get("screen");

export default function CircularCarousel({ data }) {
  const contentOffset = useSharedValue(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const handleScrollEvent = (event) => {
    // Atualize o valor de scrollX
    contentOffset.value = event.nativeEvent.contentOffset.x;
  };

  return (
    <>
      {/* Background Images */}
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((image, index) => {
          const inputRange = [
            (index - 1) * ListItemWidth,
            index * ListItemWidth,
            (index + 1) * ListItemWidth,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          return (
            <Animated.Image
              key={`image-${index}`}
              source={image}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={5}
              resizeMode="cover"
            />
          );
        })}
      </View>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        pagingEnabled
        snapToInterval={ListItemWidth}
        keyExtractor={(_, index) => index.toString()}
        scrollEventThrottle={16} // 60FPS -> 16ms ( 1000 / 60fps )
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
            listener: handleScrollEvent, // Adiciona o listener para executar a função adicional
          }
        )}
        style={{ position: "absolute", top: 0, height: 300 }}
        contentContainerStyle={{
          paddingRight: 3 * ListItemWidth,
          justifyContent: "center",
          alignItems: "center",
        }}
        horizontal
        renderItem={({ item, index }) => {
          return (
            <CircularCarouselListItem
              contentOffset={contentOffset}
              imageSrc={item}
              index={index}
            />
          );
        }}
      />
    </>
  );
}
