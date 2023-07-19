import { useIsFocused, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../components/Card";
import Loading from "../components/Loading";
import useFavorite from "../hooks/useFavorite";
import { useState } from "react";

import { StyleSheet } from "react-native";
import { data } from "../db";

const HomeScreen = () => {
  const filterStatusData = [];
  data.map((i) => {
    if (i.status) {
      filterStatusData.push(i);
    }
  });
  const [numColumns, setNumColumns] = useState(2);

  const navigation = useNavigation();
  const { addToFavorites, favorites, loading } = useFavorite(useIsFocused());

  const goToDetailScreen = (news) => {
    navigation.navigate("News Detail", { news });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => goToDetailScreen(item)}>
      <Card item={item} data={favorites} onPress={() => addToFavorites(item)} />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1" style={styles.background}>
      <View style={styles.headerText}>
        <Text className="text-3xl font-bold  text-teal-700">
          FPT UNIVERSITY
        </Text>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          numColumns={numColumns}
          data={filterStatusData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          className="px-4"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    borderColor: "#5C8D89",
  },
  background: {
    flex: 1,
    backgroundColor: "#F4F9F4",
  },
  headerText: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  category: {
    backgroundColor: "#F4F9F4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    padding: 4,
    marginHorizontal: 5,
  },
  imageCategory: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#5C8D89",
  },
  dividerContainer: {
    alignItems: "center",
  },
  dividerText: {
    color: "gray",
  },
});

export default HomeScreen;
