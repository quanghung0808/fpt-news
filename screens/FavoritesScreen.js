import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import Card from "../components/Card";
import useFavorite from "../hooks/useFavorite";
import Loading from "../components/Loading";
const minCols = 2;

export default function FavoritesScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { favorites, loading, removeFavorite, removeAllFavorites } =
    useFavorite(isFocused);
  const { top } = useSafeAreaInsets();
  const [numColumns, setNumColumns] = useState(2);

  const goBack = () => {
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <>
      <TouchableOpacity onPress={() => goToDetailScreen(item)}>
        <Card
          onPress={() =>
            Alert.alert(
              `Unlike ${item.name} ?`,
              `Are you sure you want to remove this from the favorites list?`,
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                { text: "OK", onPress: () => removeFavorite(item) },
              ],
              { cancelable: false }
            )
          }
          item={item}
        />
      </TouchableOpacity>
    </>
  );

  const goToDetailScreen = (news) => {
    navigation.navigate("News Detail", { news });
  };

  return (
    <View
      style={{ marginTop: top, backgroundColor: "#F4F9F4" }}
      className="flex-1"
    >
      <View className="flex-row justify-between items-center px-2 my-4">
        <View className="h-6 w-6"></View>

        <Text className="text-3xl font-bold text-red-500 ">
          Favorites <AntDesign name="heart" size={28} color="red" />
        </Text>
        {favorites?.length == 0 && <View className="h-6 w-6"></View>}
        {favorites?.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              favorites?.length > 0
                ? Alert.alert(
                    "Remove All Favorites",
                    "Are you sure you want to remove all favorites?",
                    [
                      {
                        text: "Cancel",
                        style: "cancel",
                      },
                      { text: "OK", onPress: removeAllFavorites },
                    ],
                    { cancelable: false }
                  )
                : Alert.alert(
                    "Not found",
                    "There are no favorite news to remove.",
                    [
                      {
                        text: "OK",
                        style: "cancel",
                      },
                    ],
                    { cancelable: false }
                  );
            }}
          >
            <AntDesign name="delete" size={28} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {loading ? (
        <Loading />
      ) : (
        <>
          {favorites.length > 0 ? (
            <FlatList
              numColumns={numColumns}
              data={favorites}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              className="px-4"
            />
          ) : (
            <View className="justify-center items-center h-4/5">
              <Text className="text-base font-bold text-slate-600 ">
                No favorite news
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 10,
  },
});
