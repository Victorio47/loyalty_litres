import dynamic from "next/dynamic";

export const LazyNewLoyaltyProgramModal = dynamic(
  () => import("./NewLoyaltyProgramModal"),
  {
    ssr: false,
  }
);
