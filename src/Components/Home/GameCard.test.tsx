import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameCard from "./GameCard";
import { MemoryRouter } from "react-router";
import { HomeGameInfoType } from "@/Types/GameAPIReturnTypes";

const mockItem: HomeGameInfoType = {
  id: 1234,
  name: "Game Title",
  large_capsule_image: "image_url",
  windows_available: true,
  mac_available: true,
  linux_available: true,
  discounted: true,
  final_price: 1999,
  original_price: 2999,
  discount_percent: 33,
};

const TestComponent = ({ item }: { item: typeof mockItem }) => (
  <MemoryRouter>
    <GameCard item={item} />
  </MemoryRouter>
);

describe("GameCard Component", () => {
  test("renders game name and image", () => {
    render(<TestComponent item={mockItem} />);

    expect(screen.getByText(/game title/i)).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "image_url");
  });

  test("renders available platforms correctly", () => {
    render(<TestComponent item={mockItem} />);

    expect(screen.getByText(/windows/i)).toBeInTheDocument();
    expect(screen.getByText(/mac/i)).toBeInTheDocument();
    expect(screen.queryByText(/linux/i)).toBeInTheDocument(); // Linux is unavailable
  });

  test("renders discounted price and original price", () => {
    render(<TestComponent item={mockItem} />);

    expect(screen.getByText("$19.99")).toBeInTheDocument(); // Final price
    expect(screen.getByText("$29.99")).toBeInTheDocument(); // Original price
    expect(screen.getByText(/-33%/i)).toBeInTheDocument(); // Discount percent
  });

  test("renders no price info when not discounted", () => {
    const itemWithoutPrice = { ...mockItem, discounted: false };
    render(<TestComponent item={itemWithoutPrice} />);

    expect(screen.getByText(/no price info/i)).toBeInTheDocument();
  });

  test("renders view more button with correct link", () => {
    render(<TestComponent item={mockItem} />);

    const viewMoreLink = screen.getByRole("link", { name: /view more/i });
    expect(viewMoreLink).toHaveAttribute("href", "/1234");
  });
});
