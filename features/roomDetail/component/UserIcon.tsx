/**
 * @yuxincxoi
 * * 방 상세 정보 페이지에서 참가자 정보를 표시하는 컴포넌트입니다.
 *
 * @module UserIcon
 * @param {string} name 참가자 이름
 * @returns {JSX.Element} 참가자 정보 컴포넌트
 */

import { View, Text, StyleSheet } from "react-native";

type UserIconProps = {
  name: string;
};

export default function UserIcon({ name }: UserIconProps) {
  // 참가자 이름과 아이콘을 렌더링
  return (
    <View style={styles.container}>
      <View style={styles.icon} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#a1a1aa",
  },
  name: {
    marginTop: 4,
    fontSize: 12,
    color: "#333",
  },
});
