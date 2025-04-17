/**
 * @yuxincxoi
 * * 지정된 소셜 로그인 제공자(kakao, naver)를 통해 커스텀 토큰을 요청하고 Firebase에 로그인합니다.
 *
 * @param provider - 소셜 로그인 제공자 ("kakao" 또는 "naver")
 * @throws 서버 응답 오류 또는 Firebase 인증 실패 시 예외 발생
 */

import { getAuth, signInWithCustomToken } from "firebase/auth";
import { Alert } from "react-native";

export const loginWithProvider = async (provider: "kakao" | "naver") => {
  try {
    const res = await fetch(`https://api.flowermark.com/auth/${provider}`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) throw new Error("서버 응답 실패");

    const { token } = await res.json();

    // 커스텀 토큰으로 로그인
    await signInWithCustomToken(getAuth(), token);

    Alert.alert(
      "로그인 성공",
      `${provider.toUpperCase()} 계정으로 로그인 되었습니다.`
    );
  } catch (error) {
    console.error(error);
    Alert.alert("로그인 실패", "로그인 중 오류가 발생했습니다.");
  }
};
