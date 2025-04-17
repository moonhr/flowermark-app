import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { loginWithProvider } from "@/features/auth/lib/socialLogin";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        {/* 카카오 로그인 버튼 */}
        <TouchableOpacity
          style={[styles.button, styles.kakao]}
          onPress={() => loginWithProvider("kakao")}
        >
          <View style={styles.iconPlaceholder} />
          <Text style={styles.kakaoText}>카카오톡으로 로그인</Text>
        </TouchableOpacity>

        {/* 네이버 로그인 버튼 */}
        <TouchableOpacity
          style={[styles.button, styles.naver]}
          onPress={() => loginWithProvider("naver")}
        >
          <View style={styles.iconPlaceholder} />
          <Text style={styles.naverText}>네이버로 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 100,
  },
  buttonWrapper: {
    width: "80%",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
  },
  kakao: {
    backgroundColor: "#fae100",
  },
  naver: {
    backgroundColor: "#03c75a",
  },
  kakaoText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
    position: "absolute",
  },
  naverText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    position: "absolute",
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: "#a1a1aa",
    position: "absolute",
    left: 20,
  },
});
