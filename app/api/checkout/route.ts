import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function POST(request: Request) {
    try {
        const { title, price, bookId, userId } = await request.json();
        const origin = new URL(request.url).origin;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            metadata: {
                bookId: bookId,
            },
            client_reference_id: userId,
            line_items: [
                {
                    price_data: {
                        currency: "jpy",
                        product_data: {
                            name: title,
                        },
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${origin}/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/`,
        });
        return NextResponse.json({ url: session.url });
    } catch (err: any) {
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}