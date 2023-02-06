import { View, Text, TouchableOpacity, Image, Button } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { colors } from "../assets/styles/colors";

function HomeScreenOne() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.quaternary,
      }}>
      <Button
        title="dfasfs"
        onPress={() => navigation.navigate("HomeTwo")}></Button>
      <Text>Home!</Text>
    </View>
  );
}
function HomeScreenTwo() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.quaternary,
      }}>
      <Text>another Home!</Text>
    </View>
  );
}
export type RootStackParamList = {
  HomeOne: undefined;
  HomeTwo: undefined;
};

function HomeScreen() {
  const stack = createStackNavigator<RootStackParamList>();
  return (
    <stack.Navigator>
      <stack.Screen
        options={{ headerShown: false }}
        name="HomeOne"
        component={HomeScreenOne}
      />
      <stack.Screen
        options={{ headerShown: false }}
        name="HomeTwo"
        component={HomeScreenTwo}
      />
    </stack.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={index}
            accessibilityRole="button"
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#000000",
              flexDirection: "column",
              margin: 10,
            }}>
            {options.tabBarIcon
              ? options.tabBarIcon({ color: "", focused: isFocused, size: 0 })
              : null}
            <Text
              style={{
                color: isFocused ? colors.secondary : colors.quinary,
                fontFamily: "Montserrat-Medium",
              }}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export function TabRouter() {
  return (
    <Tab.Navigator tabBar={(opts) => <MyTabBar {...opts} />}>
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return (
              <View style={{ width: 15, height: 15 }}>
                <Image
                  style={{ width: 15, height: 15 }}
                  source={{
                    uri: "https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/settings-512.png",
                  }}
                />
              </View>
            );
          },
        }}
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}
