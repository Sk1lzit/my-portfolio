import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const ADMIN_CLERK_ID = "user_3JpUFnk1yaEDHWw6DtZbouoE4gz";

async function checkAdmin() {
  const { userId } = await auth();
  if (!userId || userId !== ADMIN_CLERK_ID) return null;
  return userId;
}

// GET — все заказы (только для админа)
export async function GET() {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
  }

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, email: true } } },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Ошибка GET /api/admin/orders:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// POST — создать заказ
export async function POST(req: Request) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { clerkId, nickname, brief, contacts, price, deadline } = body;

    if (!clerkId || !nickname || !brief || !contacts || !price || !deadline) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return NextResponse.json({ error: "Юзер не найден" }, { status: 404 });
    }

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        nickname,
        brief,
        contacts,
        price: Number(price),
        deadline: new Date(deadline),
        status: "IN_PROGRESS",
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Ошибка POST /api/admin/orders:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}