import { Timestamp } from "firebase/firestore";

export function formatDate(date: Timestamp | Date): string {
  const target = date instanceof Timestamp ? date.toDate() : date;

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(target);
}
