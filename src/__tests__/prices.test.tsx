import { render, screen, fireEvent } from "@testing-library/react";
import Prices from "@/app/prices/page";

describe("Калькулятор стоимости", () => {
  it("показывает итоговую сумму всех включённых модулей", () => {
    render(<Prices />);

    // Все 8 модулей включены по умолчанию
    expect(screen.getByText(/Итого:/)).toBeInTheDocument();
    // 5000+6000+8000+10000+15000+8000+6000+7000 = 65000, со скидкой 10% = 58500
    expect(screen.getByText(/58\s?500/)).toBeInTheDocument();
  });

  it("снимает галочку и пересчитывает стоимость", () => {
    render(<Prices />);

    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    // Без Python (5000), сумма меньше
    expect(screen.queryByText(/58\s?500/)).not.toBeInTheDocument();
  });

  it("показывает скидку при 3+ модулях", () => {
    render(<Prices />);
    expect(screen.getByText(/Скидка 10%/)).toBeInTheDocument();
  });
});