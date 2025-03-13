import dynamic from "next/dynamic";

export const LazyBannerWink = dynamic(() => import("./BannerWink"), {
  ssr: false,
});
