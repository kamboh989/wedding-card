import { Suspense } from "react";
import CardClient from "./client-card";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CardClient />
    </Suspense>
  );
}
