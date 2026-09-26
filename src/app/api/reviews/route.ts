import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET — получить все одобренные отзывы
export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Ошибка GET /api/reviews:", error);
    return NextResponse.json({ error: "Не удалось загрузить" }, { status: 500 });
  }
}

// POST — создать новый отзыв
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Нужно войти" }, { status: 401 });
    }

    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "Пользователь не найден" }, { status: 404 });
    }

    const body = await req.json();
    const { rating, text } = body;

    // Валидация
    if (!text || text.trim().length < 5) {
      return NextResponse.json({ error: "Минимум 5 символов" }, { status: 400 });
    }
    if (text.length > 1000) {
      return NextResponse.json({ error: "Максимум 1000 символов" }, { status: 400 });
    }
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Оценка 1-5" }, { status: 400 });
    }

    // Проверка: один отзыв от пользователя
    const existing = await prisma.review.findFirst({
      where: { clerkId: userId },
    });
    // Rate limiting: не более 1 отзыва в минуту
const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
const recentReview = await prisma.review.findFirst({
  where: {
    clerkId: userId,
    createdAt: { gte: oneMinuteAgo },
  },
});

if (recentReview) {
  return NextResponse.json(
    { error: "Подождите минуту перед следующим отзывом" },
    { status: 429 }
  );
}
    if (existing) {
      return NextResponse.json({ error: "Вы уже оставляли отзыв" }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        clerkId: userId,
        name: user.firstName || user.username || "Аноним",
        avatar: user.imageUrl || null,
        rating: Number(rating),
        text: text.trim(),
        approved: false,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Ошибка POST /api/reviews:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(reviews, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Ошибка GET /api/reviews:", error);
    return NextResponse.json({ error: "Не удалось загрузить" }, { status: 500 });
  }
}