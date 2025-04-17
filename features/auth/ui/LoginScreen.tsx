import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { loginWithProvider } from "@/features/auth/lib/socialLogin";

const KAKAO_CLIENT_ID: string = process.env.EXPO_PUBLIC_KAKAO_CLIENT_ID!;
if (!KAKAO_CLIENT_ID) {
  throw new Error("KAKAO_CLIENT_ID is not defined in environment variables.");
}
const REDIRECT_URI = makeRedirectUri({}); // 앱에 등록된 redirect URI
const discovery = {
  authorizationEndpoint: "https://kauth.kakao.com/oauth/authorize",
};

export default function LoginScreen() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: KAKAO_CLIENT_ID,
      redirectUri: REDIRECT_URI,
      responseType: "code",
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success" && response.params.code) {
      const code = response.params.code;

      const fetchToken = async () => {
        try {
          await loginWithProvider("kakao", code, REDIRECT_URI);
        } catch (err) {
          console.error(err);
          Alert.alert("로그인 실패", "문제가 발생했습니다.");
        }
      };

      fetchToken();
    } else if (response?.type === "error") {
      Alert.alert("로그인 취소됨");
    }
  }, [response]);

  const handleKakaoLogin = async () => {
    await promptAsync();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        {/* 카카오 로그인 버튼 */}
        <TouchableOpacity
          style={[styles.button, styles.kakao]}
          onPress={handleKakaoLogin}
        >
          <View style={styles.iconPlaceholder} />
          <Text style={styles.kakaoText}>카카오톡으로 로그인</Text>
        </TouchableOpacity>

        {/* 네이버 로그인 버튼 */}
        <TouchableOpacity
          style={[styles.button, styles.naver]}
          // onPress={() => loginWithProvider("naver")}
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
