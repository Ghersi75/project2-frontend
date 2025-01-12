import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import { MemoryRouter } from "react-router";
import { specials, topSellers, newReleases, comingSoon } from "./testData";

const renderComponent = (props: {
  specials?: typeof specials;
  topSellers?: typeof topSellers;
  newReleases?: typeof newReleases;
  comingSoon?: typeof comingSoon;
}) => {
  return render(
    <MemoryRouter>
      <Home
        specials={props.specials || []}
        topSellers={props.topSellers || []}
        newReleases={props.newReleases || []}
        comingSoon={props.comingSoon || []}
      />
    </MemoryRouter>
  );
};

describe("Home Component", () => {
  test("renders coming soon section with games", () => {
    renderComponent({ comingSoon });

    // Use role for the section heading
    const sectionHeading = screen.getByRole("heading", { name: /coming soon/i, level: 1 });
    expect(sectionHeading).toBeInTheDocument();

    // Ensure specific game in the section is rendered
    const gameName = screen.getByText(/coming soon game 1/i);
    expect(gameName).toBeInTheDocument();

    // Ensure image is rendered with the correct alt text
    const gameImage = screen.getByAltText(/coming soon game 1 large capsule image/i);
    expect(gameImage).toHaveAttribute("src", "coming_soon_game_1_image");
  });

  test("renders multiple sections when data is provided for each", () => {
    renderComponent({ specials, topSellers, newReleases, comingSoon });

    // Check for all section headings using roles and levels
    expect(screen.getByRole("heading", { name: /current specials/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /top sellers/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /new releases/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /coming soon/i, level: 1 })).toBeInTheDocument();

    // Check for specific game names
    expect(screen.getByText(/special game 1/i)).toBeInTheDocument();
    expect(screen.getByText(/top seller game 1/i)).toBeInTheDocument();
    expect(screen.getByText(/new release game 1/i)).toBeInTheDocument();
    expect(screen.getByText(/coming soon game 1/i)).toBeInTheDocument();
  });

  test("renders error message when all sections are empty", () => {
    renderComponent({
      specials: [],
      topSellers: [],
      newReleases: [],
      comingSoon: [],
    });

    const errorMessage = screen.getByRole("heading", { name: /error fetching games, please try reloading the page/i, level: 1 });
    expect(errorMessage).toBeInTheDocument();
  });

  test("does not render sections with empty data", () => {
    renderComponent({
      specials: [],
      topSellers,
      newReleases: [],
      comingSoon: [],
    });

    // Ensure sections with data are rendered
    expect(screen.getByRole("heading", { name: /top sellers/i, level: 1 })).toBeInTheDocument();

    // Ensure sections without data are not rendered
    expect(screen.queryByRole("heading", { name: /current specials/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /new releases/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /coming soon/i })).not.toBeInTheDocument();
  });
});
