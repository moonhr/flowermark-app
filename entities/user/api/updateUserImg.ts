/**
 * @yuxincxoi
 * * 현재 로그인된 사용자의 Firestore 프로필 이미지를 업데이트합니다.
 *
 * @param user 프로필 이미지가 포함된 객체
 * @returns {Promise<void>} Firestore 업데이트 작업을 비동기로 처리
 */

import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { User } from "../model/types";
import { fetchCurrentUser } from "./fetchCurrentUser";

export const updateUserImg = async (user: Pick<User, "profile_image">) => {
  try {
    const currentUser = await fetchCurrentUser();
    const user_id = currentUser?.user_id;

    if (!user_id) {
      throw new Error("사용자 ID를 찾을 수 없습니다.");
    }

    // 현재 로그인된 사용자의 문서를 업데이트하여 profile_image 필드 갱신
    await updateDoc(doc(db, "users", user_id), {
      profile_image: user.profile_image,
    });
  } catch (error) {
    console.error("프로필 이미지 업데이트 중 오류 발생:", error);
    throw error;
  }
};
