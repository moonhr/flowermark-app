import { View, Text, StyleSheet } from "react-native";

type BookScheduleCardProps = {
  title: string;
  label: string;
  date: string;
};

export default function BookScheduleCard({
  title,
  label,
  date,
}: BookScheduleCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cover} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cover: {
    width: 50,
    height: 70,
    backgroundColor: "#a1a1aa",
    borderRadius: 6,
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
  },
  label: {
    color: "#666",
    fontSize: 12,
  },
  date: {
    fontSize: 12,
  },
});
