import { View, Text, StyleSheet } from "react-native";

type UserIconProps = {
  name: string;
};

export default function UserIcon({ name }: UserIconProps) {
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
