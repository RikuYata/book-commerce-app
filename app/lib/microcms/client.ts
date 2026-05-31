import { createClient } from "microcms-js-sdk";
import { BookType } from "@/app/types/types";

export const client = createClient({
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN as string,
    apiKey: process.env.MICROCMS_API_KEY as string,
})

export const getAllBooks = async () => {
    const allBooks = await client.getList<BookType>({
        endpoint: "commerce",
        customRequestInit: {
            next: {
                revalidate: 3600,
            },
        },
    })

    return allBooks;
}

export const getDetailBook = async (contentId: string) => {
    const detailBook = await client.getListDetail<BookType>({
        endpoint: "commerce",
        contentId,
        customRequestInit: {
            cache: "no-store",
        },
    });
    return detailBook;
}