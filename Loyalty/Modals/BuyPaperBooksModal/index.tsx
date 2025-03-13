import dynamic from "next/dynamic";

export const LazyBuyPaperBooksModal = dynamic(
  () =>
    import("./BuyPaperBooksModal").then(module => module.BuyPaperBooksModal),
  {
    ssr: false,
  }
);
