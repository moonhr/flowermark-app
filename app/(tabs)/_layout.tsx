/**
 * @yuxincxoi
 * * 앱 하단 탭 네비게이션을 위한 레이아웃 설정 컴포넌트입니다.
 * 사용되는 탭: 홈(index), 꽃갈피(flowerMarks), 캘린더(calendar), 마이페이지(mypage)
 *
 * @returns {JSX.Element} 탭 네비게이션 JSX 요소
 */

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false, // 헤더 숨김 설정
        // 아이콘 설정
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if (route.name === "index") {
            iconName = "home-outline";
          } else if (route.name === "calendar") {
            iconName = "calendar-outline";
          } else if (route.name === "mypage") {
            iconName = "person-outline";
          } else if (route.name === "flowerMarks") {
            iconName = "leaf-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // 탭 라벨
        tabBarLabel: (() => {
          if (route.name === "index") return "홈";
          if (route.name === "calendar") return "캘린더";
          if (route.name === "mypage") return "마이페이지";
          if (route.name === "flowerMarks") return "꽃갈피";

          return route.name;
        })(),
      })}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="flowerMarks" />
      <Tabs.Screen name="calendar" />
      <Tabs.Screen name="mypage" />
    </Tabs>
  );
}
