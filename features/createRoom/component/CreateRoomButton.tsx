import { TouchableOpacity, Text } from "react-native";

export default function CreateRoomButton({
  isEnabled,
}: {
  isEnabled: boolean;
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: isEnabled ? "#4caf50" : "#ccc",
        padding: 16,
        borderRadius: 8,
      }}
      disabled={!isEnabled}
      onPress={() => console.log("책방 생성")}
    >
      <Text style={{ textAlign: "center", color: "#fff" }}>방 생성하기</Text>
    </TouchableOpacity>
  );
}
