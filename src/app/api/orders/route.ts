import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET — заказы текущего юзера
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 });
    }

    // Если админ — видит все заказы, иначе — только свои
    const orders = await prisma.order.findMany({
      where: user.role === "ADMIN" ? {} : { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    const totalSpent = orders
      .filter((o) => o.status === "DONE")
      .reduce((sum, o) => sum + o.price, 0);

    return NextResponse.json({ orders, totalSpent, role: user.role });
  } catch (error) {
    console.error("Ошибка GET /api/orders:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}