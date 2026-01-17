import { Suspense } from "react";
import CardClient from "./client-card";

export default function Page() {
  return (
    <Suspense>
      <CardClient />
    </Suspense>
  );
}
