import { render, screen } from "@testing-library/react";
import ReviewForm from "@/components/ReviewForm";

// Мокаем Clerk
jest.mock("@clerk/nextjs", () => ({
  useUser: () => ({ isSignedIn: false }),
  SignInButton: ({ children }: any) => children,
}));

describe("Форма отзыва", () => {
  it("показывает сообщение, если не авторизован", () => {
    render(<ReviewForm />);
    expect(screen.getByText(/Войдите, чтобы оставить отзыв/)).toBeInTheDocument();
  });
});