import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FavoriteGameCard from "./FavoriteGameCard";
import { MemoryRouter } from "react-router";
import { FavoriteGameType } from "@/Types/FavoriteGamesTypes";

const mockHandleUnfavorite = jest.fn();

const item: FavoriteGameType = {
  id: 1,
  appId: 12345,
  name: "Test Game",
  thumbnailLink: "test_thumbnail.jpg",
  availableOn: ["Windows", "Mac", "Linux"],
};

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <FavoriteGameCard
        item={item}
        handleUnfavorite={mockHandleUnfavorite} />
    </MemoryRouter>
  );
};

describe("GameCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders game details correctly", () => {
    renderComponent();

    // Check that game name is displayed
    expect(screen.getByText(/test game/i)).toBeInTheDocument();

    // Check that platforms are displayed
    expect(screen.getByText(/windows/i)).toBeInTheDocument();
    expect(screen.getByText(/mac/i)).toBeInTheDocument();
    expect(screen.getByText(/linux/i)).toBeInTheDocument();

    // Check that the image is rendered with the correct src
    expect(screen.getByRole("img")).toHaveAttribute("src", "test_thumbnail.jpg");

    // Check that the buttons are rendered
    expect(screen.getByText(/unfavorite game/i)).toBeInTheDocument();
    expect(screen.getByText(/view on steam/i)).toHaveAttribute(
      "href",
      "https://store.steampowered.com/app/12345"
    );
    expect(screen.getByText(/view more/i)).toHaveAttribute("href", "/12345");
  });

  test("calls handleUnfavorite when the unfavorite button is clicked", () => {
    renderComponent();

    const unfavoriteButton = screen.getByText(/unfavorite game/i);

    // Click the unfavorite button
    fireEvent.click(unfavoriteButton);

    // Ensure the handler was called with the correct appId
    expect(mockHandleUnfavorite).toHaveBeenCalledTimes(1);
    expect(mockHandleUnfavorite).toHaveBeenCalledWith(12345);
  });

  test("renders links with correct href attributes", () => {
    renderComponent();

    const steamLink = screen.getByText(/view on steam/i);
    const moreDetailsLink = screen.getByText(/view more/i);

    // Check that links have correct href
    expect(steamLink).toHaveAttribute("href", "https://store.steampowered.com/app/12345");
    expect(moreDetailsLink).toHaveAttribute("href", "/12345");
  });
});
