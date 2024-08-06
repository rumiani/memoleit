"use client";
import BookPage from "@/src/components/user-pages/dashboard/docs-page/book-page/bookPage";

export default function Page({ params }: { params: { id: string } }) {
  return <BookPage id={params.id} />;
}
