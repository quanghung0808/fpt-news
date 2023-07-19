import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";

export default function Card({ item, data, onPress }) {
  return (
    <View className="border border-gray-300 rounded-md mb-4 items-center h-56 flex justify-between mr-2 w-44">
      <ImageBackground
        className="border border-gray-300 rounded-md"
        source={{ uri: item.img }}
        style={{
          flex: 1,
          width: "100%",
          resizeMode: "cover",
        }}
      >
        <Text className="m-2 text-xs py-1 px-1 rounded-xl font-semibold text-emerald-700 text-center absolute bg-slate-200  bottom-0 w-11/12">
          {item.title}
        </Text>
        <Text className="m-2 text-xs  py-1 px-2  rounded-xl break-words font-semibold text-emerald-700 text-center absolute bg-slate-200 top-0">
          <FAIcon name={"eye"} size={13} className="text-black " />
          {} {item.views}
        </Text>

        <TouchableOpacity
          className="p-1 absolute top-2 right-2  rounded-full bg-slate-200 "
          onPress={onPress}
        >
          {data && item ? (
            <FAIcon
              name={
                data.find((favorite) => favorite.id === item.id)
                  ? "heart"
                  : "heart-o"
              }
              size={16}
              color="red"
              className="text-red-500 "
            />
          ) : (
            <>
              <FAIcon
                name={"remove"}
                size={15}
                color="black"
                className="text-black"
              />
            </>
          )}
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
