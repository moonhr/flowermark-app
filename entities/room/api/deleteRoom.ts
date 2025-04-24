/**
 * @yuxincxoi
 * * 지정된 방(roomId)을 '비활성화' 상태로 변경하고, 참여자들에게 방 삭제 요청 알림을 전송합니다.
 *
 * @function deleteRoom
 * @param {string} roomId - 삭제를 요청할 방의 고유 ID
 * @param {string} reason - 사용자가 입력한 방 삭제 요청 사유
 * @returns {Promise<void>} Firestore 상태 업데이트 및 알림 전송 완료 후 종료
 */

import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { sendPush } from "./sendPush";

export async function deleteRoom(roomId: string, reason: string) {
  try {
    // 방 상태를 비활성화
    const roomRef = doc(db, "rooms", roomId);
    await updateDoc(roomRef, {
      status: "disabled",
    });

    // 참여자 목록 가져오기
    const roomSnapshot = await getDoc(roomRef);
    const roomData = roomSnapshot.data();
    const participants = roomData?.participants ?? [];

    // 푸시 알림 메시지
    const message = `[${reason}]라는 사유로 방 삭제가 요청되었습니다. 방 삭제에 동의하십니까?`;

    // 푸시 알림 전송
    await sendPush(participants, {
      title: "방 삭제 요청",
      body: message,
      actions: ["네", "아니오"],
      roomId,
      reason,
      type: "delete_request",
    });

    console.log("✅ 삭제 요청 및 알림 전송 완료");
  } catch (error) {
    console.error("❌ 방 삭제 요청 중 에러 발생:", error);
  }
}
