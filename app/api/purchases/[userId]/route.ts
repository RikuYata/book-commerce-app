import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// 購入履歴検索API
export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    try {
        const purchases = await prisma.purchase.findMany({
            where: { userId: userId },
        });
        return NextResponse.json({ purchases });
    } catch (err: any) {
        return NextResponse.json({ message: err.message });
    }
}