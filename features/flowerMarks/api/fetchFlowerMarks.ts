/**
 * @yuxincxoi
 * * 모든 꽃갈피 데이터를 가져오는 유틸 함수입니다.
 *
 * @module fetchFlowerMarks
 * @returns {Promise<FlowerMarkProps[]>} Firestore에서 가져온 꽃갈피 객체 배열
 */

import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { FlowerMarkProps } from "../model/types";

// 'marks' 컬렉션에서 꽃갈피 데이터를 모두 가져와 FlowerMarkProps[] 형태로 반환
export async function fetchFlowerMarks(): Promise<FlowerMarkProps[]> {
  try {
    const snapshot = await getDocs(collection(db, "marks"));
    const flowerMarks: FlowerMarkProps[] = snapshot.docs.map(
      (doc) => doc.data() as FlowerMarkProps
    );
    return flowerMarks;
  } catch (error) {
    console.error("❌ 꽃갈피 데이터 로딩 실패:", error);
    return [];
  }
}
