/**
 * @yuxincxoi
 * * Firestore의 기존 Room을 업데이트합니다.
 *
 * @param roomData 업데이트할 방의 데이터
 * @returns 업데이트된 문서의 참조 ID
 */

import { db } from "@/firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { Room } from "@/entities/room/model/types";
import { getRoomIdByCreator } from "./getRoomIdByCreator";

// todo : room_name -> creator_id로 변경하기
export const updateRoom = async ({
  exRoomName,
  ...roomData
}: Room & { exRoomName: string }) => {
  try {
    // const room_id = await getRoomIdByCreator(roomData.creator_id);
    const room_id = await getRoomIdByCreator(exRoomName);

    if (!room_id) {
      throw new Error("해당 이름의 방을 찾을 수 없습니다.");
    }

    // 지정된 ID의 문서를 업데이트
    await updateDoc(doc(db, "rooms", room_id), roomData);
  } catch (error) {
    console.error("방 업데이트 중 오류 발생:", error);
    throw error;
  }
};
