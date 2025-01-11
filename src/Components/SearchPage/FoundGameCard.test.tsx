import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FoundGameCard from "./FoundGameCard";
import { BrowserRouter } from "react-router";

const mockGameInfo = {
  appid: 12345,
  name: "Test Game",
  logo: "http://example.com/logo.png",
};

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

test("renders the FoundGameCard with game information", () => {
  renderWithRouter(<FoundGameCard gameInfo={mockGameInfo} />);

  // Check that the game name is displayed
  expect(screen.getByText("Test Game")).toBeInTheDocument();

  // Check that the image is displayed with the correct src
  const img = screen.getByRole("img");
  expect(img).toHaveAttribute("src", "http://example.com/logo.png");

  // Check that the link points to the correct URL
  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "/12345");
});

test("handles missing gameInfo gracefully", () => {
  // Simulate an edge case where gameInfo might be empty
  const consoleSpy = jest.spyOn(console, "log").mockImplementation(); // Mock console.log to avoid noise
  renderWithRouter(
    <FoundGameCard
      gameInfo={{
        appid: 0,
        name: "",
        logo: "",
      }}
    />
  );

  // Ensure the placeholder link still renders
  const link = screen.getByRole("link");
  expect(link).toHaveAttribute("href", "/0");

  // Check that no game name is displayed
  expect(screen.queryByText("Test Game")).not.toBeInTheDocument();

  consoleSpy.mockRestore();
});
