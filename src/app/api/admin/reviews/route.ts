import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const ADMIN_ID = "user_3JpUFnk1yaEDHWw6DtZbouoE4gz";

export async function GET() {
  try {
    const { userId } = await auth();
    if (userId !== ADMIN_ID) {
      return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
    }

    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка" }, { status: 500 });
  }
}
