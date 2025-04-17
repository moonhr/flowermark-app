import { useEffect } from "react";
import { useAuthRequest, makeRedirectUri } from "expo-auth-session";
import { loginWithProvider } from "@/features/auth/lib/socialLogin";
import { Alert } from "react-native";

export function useNaverLogin() {
  const NAVER_CLIENT_ID: string = process.env.EXPO_PUBLIC_NAVER_CLIENT_ID!;
  if (!NAVER_CLIENT_ID) {
    throw new Error("NAVER_CLIENT_ID is not defined in environment variables.");
  }

  const REDIRECT_URI = makeRedirectUri({});
  const discovery = {
    authorizationEndpoint: "https://nid.naver.com/oauth2.0/authorize",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: NAVER_CLIENT_ID,
      redirectUri: REDIRECT_URI,
      responseType: "code",
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success" && response.params.code) {
      const code = response.params.code;

      const fetchToken = async () => {
        try {
          await loginWithProvider("naver", code, REDIRECT_URI);
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

  const handleNaverLogin = async () => {
    await promptAsync();
  };

  return { handleNaverLogin };
}
