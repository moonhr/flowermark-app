import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: string = "home-outline";

          if (route.name === "index") {
            iconName = "home-outline";
          } else if (route.name === "calendar") {
            iconName = "calendar-outline";
          } else if (route.name === "mypage") {
            iconName = "person-outline";
          } else if (route.name === "books") {
            iconName = "book-outline";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarLabel: (() => {
          if (route.name === "index") return "홈";
          if (route.name === "calendar") return "캘린더";
          if (route.name === "mypage") return "마이페이지";
          if (route.name === "books") return "책";
          return route.name;
        })(),
      })}
    />
  );
}
