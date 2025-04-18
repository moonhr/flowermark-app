/**
 * @yuxincxoi
 * * '새 책방 만들기' 버튼 컴포넌트입니다.
 * * 터치 시 책방 생성 페이지로 이동합니다.
 *
 * @module GoToCreateRoomButton
 * @param {() => void} onPress 버튼을 눌렀을 때 실행되는 콜백 함수
 * @returns {JSX.Element} '새 책방 만들기' 버튼 컴포넌트
 */

import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function GoToCreateRoomButton({
  onPress,
}: {
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>+ 새 책방 만들기</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f9c74f",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
});
