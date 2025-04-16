/**
 * @yuxincxoi
 * * 꽃갈피(FlowerMark) 컴포넌트를 정의합니다.
 *
 * @module FlowerMark
 * @param {Object} flower 꽃갈피 정보 객체 (id, name, englishName, goal)
 * @param {() => void} onPress 사용자가 컴포넌트를 누를 때 실행되는 콜백 함수
 * @returns {JSX.Element}
 */

import { TouchableOpacity, StyleSheet } from "react-native";

export default function FlowerMark({
  flower,
  onPress,
}: {
  flower: {
    id: number;
    name: string;
    englishName: string;
    goal: string;
  };
  onPress: () => void;
}) {
  return <TouchableOpacity style={styles.flowerMark} onPress={onPress} />;
}

const styles = StyleSheet.create({
  flowerMark: {
    width: "25%",
    aspectRatio: 0.75,
    backgroundColor: "#a1a1aa",
    borderRadius: 5,
  },
});
