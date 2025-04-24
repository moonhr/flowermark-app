/**
 * @yuxincxoi
 * * 사용자들에게 알림을 전송합니다.
 * 알림은 Firestore의 notifications 컬렉션에 각 사용자 ID 기준으로 추가됩니다.
 *
 * @param {string[]} userIds - 알림을 받을 사용자들의 ID 배열
 * @param {object} payload - 알림 본문에 포함될 데이터 객체
 * @returns {Promise<void>} 모든 알림 문서가 Firestore에 성공적으로 추가될 때까지 대기합니다.
 */

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export async function sendPush(userIds: string[], payload: object) {
  // Firestore 또는 FCM 연동, Cloud Function 사용 가능
  const sendPromises = userIds.map((uid) => {
    // Firestore에 알림 문서 추가
    return addDoc(collection(db, "notifications"), {
      to: uid,
      createdAt: new Date(),
      ...payload,
    });
  });

  await Promise.all(sendPromises);
}
