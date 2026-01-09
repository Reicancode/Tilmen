"use client";

import dynamic from "next/dynamic";

const LessonsClient = dynamic(
  () => import("../components/LessonsClient"),
  { ssr: false }
);

export default function LessonsPage() {
  return <LessonsClient />;
}
