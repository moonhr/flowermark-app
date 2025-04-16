/**
 * @yuxincxoi
 * * 특정 방 페이지의 동적 라우트 파일입니다.
 * URL의 [id] 값을 기반으로 특정 방의 페이지를 보여줍니다.
 *
 * @module RoomDetailPage
 * @returns {JSX.Element} 특정 방의 페이지를 렌더링하는 컴포넌트
 */

import RoomDetailScreen from "@/features/roomDetail/ui/RoomDetailScreen";

export default function RoomDetailPage() {
  return <RoomDetailScreen />;
}
