/**
 * @yuxincxoi
 * * 특정 UID에 해당하는 사용자 정보를 Firestore에서 가져옵니다.
 *
 * @param uid - 조회할 사용자의 UID
 * @returns User 객체, 존재하지 않으면 null
 */

import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { User } from "../model/types";

export async function fetchUserById(uid: string): Promise<User | null> {
  const userDoc = await getDoc(doc(db, "users", uid)); // Firestore에서 해당 uid의 문서 가져오기
  return userDoc.exists() ? (userDoc.data() as User) : null;
}
