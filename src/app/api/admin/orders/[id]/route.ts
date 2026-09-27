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

// PATCH — обновить заказ (статус, дедлайн, цена)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const data: any = {};
    if (body.status) data.status = body.status;
    if (body.price) data.price = Number(body.price);
    if (body.deadline) data.deadline = new Date(body.deadline);
    if (body.brief) data.brief = body.brief;
    if (body.contacts) data.contacts = body.contacts;

    const order = await prisma.order.update({
      where: { id },
      data,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Ошибка PATCH /api/admin/orders/[id]:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// DELETE — удалить заказ
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await checkAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
  }

  try {
    const { id } = await params;
    await prisma.order.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка DELETE /api/admin/orders/[id]:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}