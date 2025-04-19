/**
 * @yuxincxoi
 * * Firestore의 기존 방(Room)을 업데이트합니다.
 *
 * @param roomData 업데이트할 방의 데이터 (room_id 포함 필수)
 * @returns 업데이트된 문서의 참조 ID
 */

import { db } from "@/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { Room } from "@/entities/room/model/types";

export const updateRoom = async (
  roomData: Partial<Room> & { room_id: string }
) => {
  try {
    const { room_id, ...data } = roomData;

    // 지정된 ID의 문서를 업데이트
    await setDoc(doc(db, "rooms", room_id), data, { merge: true });

    return room_id;
  } catch (error) {
    console.error("방 업데이트 중 오류 발생:", error);
    throw error;
  }
};
