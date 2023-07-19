import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FAIcon from "react-native-vector-icons/FontAwesome";

export default function DetailScreen({ route }) {
  const { news } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  console.log(route);
  useEffect(() => {
    checkFavoriteStatus();
  }, []);

  const checkFavoriteStatus = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem("favorites");
      if (favoritesString) {
        const favoritesArray = JSON.parse(favoritesString);
        const isFavorite = favoritesArray.some((item) => item.id === news.id);
        setIsFavorite(isFavorite);
      }
    } catch (error) {
      console.log("Error checking favorite status:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem("favorites");
      let favoritesArray = [];

      if (favoritesString) {
        favoritesArray = JSON.parse(favoritesString);
      }

      if (isFavorite) {
        favoritesArray = favoritesArray.filter((item) => item.id !== news.id);
      } else {
        favoritesArray.push(news);
      }

      const updatedFavoritesString = JSON.stringify(favoritesArray);
      await AsyncStorage.setItem("favorites", updatedFavoritesString);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.log("Error toggling favorite:", error);
    }
  };

  return (
    <View
    // className=" items-center justify-center  p-4"
    // style={styles.background}
    >
      <ScrollView>
        <View
          className=" items-center justify-center  p-4"
          style={styles.background}
        >
          <View className="flex mb-2">
            <TouchableOpacity
              onPress={toggleFavorite}
              className="p-2 rounded-full bg-neutral-200 mb-2"
            >
              <Icon
                name={isFavorite ? "heart" : "heart-o"}
                size={28}
                color={"red"}
              />
            </TouchableOpacity>
            <Text>
              <FAIcon name={"eye"} size={13} className="text-black mb-2" />
              {} {news.views}
            </Text>
          </View>
          <Image
            source={{ uri: news.img }}
            className="w-80 h-80 mb-8 rounded-lg"
          />
          <Text className="text-red-400 text-base font-extrabold">{news.actractive ? "Actractive news" : ""}</Text>

          <Text className="text-xl font-bold mb-1  text-emerald-700">
            {news.title}
          </Text>
          <Text className="text-lg mb-4  text-emerald-500">
            {news.description}
          </Text>
          <Text className="text-lg mb-4 text-emerald-600 text-justify">
            {news.content}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F4F9F4",
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 10,
  },
});
