// 購入履歴の保存
import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request, response: Response) {

    const { sessionId } = await request.json();
    try {

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        const existingPurchase = await prisma.purchase.findFirst({
            where: {
                userId: session.client_reference_id as string,
                bookId: session.metadata?.bookId as string,
            }
        })

        console.log(session);

        if (!existingPurchase) {
            const purchase = await prisma.purchase.create({
                data: {
                    userId: session.client_reference_id as string,
                    bookId: session.metadata?.bookId as string,
                }
            });
            return NextResponse.json({ purchase: purchase });
        } else {
            return NextResponse.json({ purchase: existingPurchase });
        }
    } catch (err: any) {
        return NextResponse.json({ message: err.message });
    }
}