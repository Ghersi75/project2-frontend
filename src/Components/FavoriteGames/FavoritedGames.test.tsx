import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FavoritedGames from "./FavoritedGames";
import { FavoriteGameType } from "@/Types/FavoriteGamesTypes";
import { MemoryRouter } from "react-router";

const mockHandleUnfavorite = jest.fn();

const mockGames: FavoriteGameType[] = [
  {
    id: 1,
    appId: 12345,
    name: "Favorite Game 1",
    thumbnailLink: "thumbnail1.jpg",
    availableOn: ["Windows", "Mac"],
  },
  {
    id: 2,
    appId: 67890,
    name: "Favorite Game 2",
    thumbnailLink: "thumbnail2.jpg",
    availableOn: ["Linux"],
  },
];

const renderComponent = (games: FavoriteGameType[]) => {
  return render(
    <MemoryRouter>
      <FavoritedGames games={games} handleUnfavorite={mockHandleUnfavorite} />
    </MemoryRouter>
  );
};

describe("FavoritedGames Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders message when no games are favorited", () => {
    renderComponent([]);

    // Ensure the fallback message is displayed
    const noGamesMessage = screen.getByText(/no favorited games found/i);
    expect(noGamesMessage).toBeInTheDocument();
  });

  test("renders favorited games correctly", () => {
    renderComponent(mockGames);

    // Ensure the title is displayed
    const title = screen.getByText(/your favorites/i);
    expect(title).toBeInTheDocument();

    // Ensure each game's name is displayed
    mockGames.forEach((game) => {
      expect(screen.getByText(new RegExp(game.name, "i"))).toBeInTheDocument();
    });

    // Ensure each game's platforms are displayed
    mockGames.forEach((game) => {
      game.availableOn.forEach((platform) => {
        expect(screen.getByText(new RegExp(platform, "i"))).toBeInTheDocument();
      });
    });
  });

  test("calls handleUnfavorite when the unfavorite button is clicked", () => {
    renderComponent(mockGames);

    // Find the unfavorite button for the first game and click it
    const unfavoriteButton = screen.getAllByText(/unfavorite game/i)[0];
    fireEvent.click(unfavoriteButton);

    // Ensure the handler was called with the correct appId
    expect(mockHandleUnfavorite).toHaveBeenCalledTimes(1);
    expect(mockHandleUnfavorite).toHaveBeenCalledWith(mockGames[0].appId);
  });

  test("renders correct number of favorite game cards", () => {
    renderComponent(mockGames);

    // Ensure the correct number of cards are rendered
    const gameCards = screen.getAllByRole("img");
    expect(gameCards).toHaveLength(mockGames.length);
  });

  test("renders the correct number of buttons for each type", () => {
    renderComponent(mockGames);

    // Check the total number of "Unfavorite game" buttons
    const unfavoriteButtons = screen.getAllByText(/unfavorite game/i);
    expect(unfavoriteButtons).toHaveLength(mockGames.length);

    // Check the total number of "View On Steam" links
    const viewOnSteamLinks = screen.getAllByRole("link", { name: /view on steam/i });
    expect(viewOnSteamLinks).toHaveLength(mockGames.length);

    // Check the total number of "View More" links
    const viewMoreLinks = screen.getAllByRole("link", { name: /view more/i });
    expect(viewMoreLinks).toHaveLength(mockGames.length);
  });

});
