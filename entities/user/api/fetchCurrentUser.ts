/**
 * @yuxincxoi
 * * 현재 로그인된 사용자 정보를 Firestore에서 가져옵니다.
 *
 * @returns 로그인된 User 객체, 없으면 null
 */

import { User } from "../model/types";
import { getAuth } from "firebase/auth";
import { fetchUserById } from "./fetchUserById";

export async function fetchCurrentUser(): Promise<User | null> {
  const currentUser = getAuth().currentUser; // 현재 로그인된 Firebase 사용자 정보 가져오기

  if (!currentUser) {
    console.warn("❌ 현재 로그인한 유저가 없습니다.");
    return null;
  }

  const uid = currentUser.uid;

  return await fetchUserById(uid); // uid로 사용자 정보 가져오기
}
