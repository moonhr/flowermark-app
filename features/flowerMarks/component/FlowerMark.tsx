import { TouchableOpacity, StyleSheet } from "react-native";

export default function FlowerMark({
  flower,
  onPress,
}: {
  flower: {
    id: number;
    name: string;
    english: string;
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
