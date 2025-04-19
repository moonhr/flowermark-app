/**
 * @yuxincxoi
 * * Firestore에 새로운 방(Room)을 추가합니다.
 *
 * @param roomData 생성할 방의 데이터
 * @returns 생성된 문서의 참조 ID
 */

import { db } from "@/firebaseConfig";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { Room } from "@/entities/room/model/types";

export const addRoom = async (roomData: Omit<Room, "room_id">) => {
  try {
    // rooms 컬렉션 문서 조회
    const roomsSnapshot = await getDocs(collection(db, "rooms"));
    const roomIds = roomsSnapshot.docs
      .map((doc) => doc.id)
      .filter((id) => /^room_\d{3}$/.test(id)) // 형식 필터링
      .map((id) => parseInt(id.replace("room_", ""), 10));

    // 문서에서 가장 높은 숫자 추출 후 1 증가
    const nextRoomNumber = roomIds.length > 0 ? Math.max(...roomIds) + 1 : 1;

    // ID를 room_000 형식으로 포맷팅
    const newRoomId = `room_${String(nextRoomNumber).padStart(3, "0")}`;

    // 지정된 ID로 문서 생성
    await setDoc(doc(db, "rooms", newRoomId), roomData);

    return newRoomId;
  } catch (error) {
    console.error("방 생성 중 오류 발생:", error);
    throw error;
  }
};
