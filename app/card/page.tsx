import { Suspense } from "react";
import CardClient from "./client-card";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <CardClient />
    </Suspense>
  );
}
