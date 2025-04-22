/**
 * @yuxincxoi
 * 특정 방 이름을 기반으로 해당 방의 Firestore "rooms" 컬렉션에서 문서 ID를 조회하는 함수입니다.
 *
 * @param {string} roomName - 조회하려는 방의 이름
 * @returns {Promise<string | null>} 방의 Firestore 문서 ID를 반환하며, 존재하지 않을 경우 null을 반환합니다.
 */

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

// todo : room_name -> creator_id로 변경하기
export const getRoomIdByCreator = async (roomName: string) => {
  // Firestore에서 "rooms" 컬렉션 중 room_name이 일치하는 문서를 쿼리합니다.
  const q = query(collection(db, "rooms"), where("room_name", "==", roomName));

  // 쿼리 실행 후 결과 스냅샷을 가져옵니다.
  const snapshot = await getDocs(q);

  // 문서가 존재하면 첫 번째 문서의 ID를 반환합니다.
  if (!snapshot.empty) {
    return snapshot.docs[0].id;
  }

  // 조건에 맞는 문서가 없으면 null 반환
  return null;
};
