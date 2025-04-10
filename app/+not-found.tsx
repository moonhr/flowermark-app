import { Stack } from "expo-router";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "페이지를 찾을 수 없습니다" }} />
      <View style={styles.container}>
        <Text style={styles.title}>🚫 이 페이지는 존재하지 않아요.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>🏠 홈으로 돌아가기</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#eee",
    borderRadius: 6,
  },
  linkText: {
    color: "#007AFF",
    fontWeight: "500",
  },
});
