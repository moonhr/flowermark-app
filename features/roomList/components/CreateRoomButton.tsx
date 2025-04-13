import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CreateRoomButton({ onPress }: { onPress: () => void }) {
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
