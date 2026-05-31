// "use client";

import Book from "./components/Book";

import { getAllBooks } from "./lib/microcms/client";
import { BookType, User, PurchaseType } from "./types/types";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "./lib/next-auth/options";


export default async function Home() {
  const { contents } = await getAllBooks(); // ISR

  const session = await getServerSession(nextAuthOptions);
  const user: User | null = session?.user as User | null;

  let purchaseBookIds: string[] = [];
  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      {
        cache: "no-store",
      }
    );
    const { purchases } = await response.json();
    // console.log("purchases: ", purchases);

    purchaseBookIds = purchases.map((purchase: PurchaseType) => purchase.bookId);
    // console.log("purchaseBookIds: ", purchaseBookIds);
  }
  return (
    <>
      <main className="flex flex-wrap justify-center items-center md:mt-32 mt-20">
        <h2 className="text-center w-full font-bold text-3xl mb-2">
          Book Commerce
        </h2>
        {contents.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            isPurchased={purchaseBookIds.includes(book.id as string)}
            user={user ?? null} />
        ))}
      </main>
    </>
  );
}