/**
 * @yuxincxoi
 * * 홈 탭 화면의 엔트리 파일입니다. 로그인 상태 확인 후 RoomListScreen을 보여줍니다.
 *
 * @module HomeTab
 * @returns {JSX.Element | null} 홈 화면 또는 리디렉션
 */

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "expo-router";
import RoomListScreen from "@/features/room/list/ui/RoomListScreen";

export default function HomeTab() {
  // 로그인 상태 (null: 확인 중)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Firebase 인증 상태를 실시간으로 확인하고 리디렉션 처리
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        // 로그인하지 않은 경우 로그인 페이지로 이동
        router.replace("/(auth)/login");
      } else {
        // 로그인한 경우 콘텐츠 표시
        setIsLoggedIn(true);
      }
    });

    return unsubscribe; // 컴포넌트 언마운트 시 이벤트 제거
  }, []);

  // 로그인 상태 확인 중일 땐 아무것도 렌더링하지 않음
  if (isLoggedIn === null) return null;

  // 로그인된 경우 RoomListScreen 렌더링
  return <RoomListScreen />;
}
