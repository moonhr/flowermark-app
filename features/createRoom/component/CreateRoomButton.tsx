/**
 * @yuxincxoi
 * * '방 생성하기' 버튼 컴포넌트입니다.
 *
 * @module CreateRoomButton
 * @param {boolean} isEnabled 버튼 활성화 여부
 * @returns {JSX.Element} '방 생성하기' 버튼 컴포넌트
 */

import { useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";

export default function CreateRoomButton({
  isEnabled,
}: {
  isEnabled: boolean;
}) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: isEnabled ? "#4caf50" : "#ccc",
        padding: 16,
        borderRadius: 8,
      }}
      disabled={!isEnabled}
      onPress={() => router.back()}
    >
      <Text style={{ textAlign: "center", color: "#fff" }}>방 생성하기</Text>
    </TouchableOpacity>
  );
}
