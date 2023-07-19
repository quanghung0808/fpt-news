import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";

import { Icon } from "react-native-elements";
import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  NavigationContainer,
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import AttractiveScreen from "./screens/AttractiveScreen";
// import DetailScreen from "./screens/DetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";

enableScreens();

const Stack = new createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      if (!isFocused) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    }, [isFocused])
  );
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <Stack.Screen name="News Detail" component={DetailScreen} o />
    </Stack.Navigator>
  );
};
const FavoriteStack = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      if (!isFocused) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Favorites" }],
        });
      }
    }, [isFocused])
  );
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorites"
        options={{
          headerShown: false,
        }}
        component={FavoritesScreen}
      />
      <Stack.Screen name="News Detail" component={DetailScreen} o/>
    </Stack.Navigator>
  );
};
const AttractiveStack = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      if (!isFocused) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Attractive" }],
        });
      }
    }, [isFocused])
  );
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Attractive"
        options={{
          headerShown: false,
        }}
        component={AttractiveScreen}
      />
      <Stack.Screen name="News Detail" component={DetailScreen} o/>
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "green",
          }}
          initialRouteName="HomeStack"
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <Icon name="home" type="font-awesome" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="FavoriteStack"
            component={FavoriteStack}
            options={{
              headerShown: false,
              tabBarLabel: "Favorites",
              tabBarIcon: ({ color }) => (
                <Icon name="heart" type="font-awesome" color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="AttractiveStack"
            component={AttractiveStack}
            options={{
              headerShown: false,
              tabBarLabel: "Attractive",
              tabBarIcon: ({ color }) => (
                <Icon name="phone" type="font-awesome" color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
