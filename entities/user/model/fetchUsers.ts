/**
 * @yuxincxoi
 * * 모든 사용자 데이터를 가져오는 유틸 함수입니다.
 *
 * @module fetchUsers
 * @returns {Promise<User[]>} Firestore의 'users' 컬렉션에서 가져온 사용자 객체 배열
 */

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { User } from "./types";

// 'users' 컬렉션에서 사용자 데이터를 모두 가져와 User[] 형태로 반환
export async function fetchUsers(): Promise<User[]> {
  const querySnapshot = await getDocs(collection(db, "users"));

  return querySnapshot.docs.map((doc) => doc.data() as User);
}
