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
  loading: boolean;
}) => {
  return render(
    <MemoryRouter>
      <Home
        specials={props.specials || []}
        topSellers={props.topSellers || []}
        newReleases={props.newReleases || []}
        comingSoon={props.comingSoon || []}
        loading={props.loading}
      />
    </MemoryRouter>
  );
};

describe("Home Component", () => {
  test("renders loading state before data is displayed", () => {
    renderComponent({ specials: [], topSellers: [], newReleases: [], comingSoon: [], loading: true });
  
    const loadingMessage = screen.getByText(/loading/i);
    expect(loadingMessage).toBeInTheDocument();
  });
  
  test("does not render loading state after data is fetched", () => {
    renderComponent({ specials, topSellers, newReleases, comingSoon, loading: false });
  
    // Ensure loading state is not present
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  
    // Ensure sections are rendered correctly
    expect(screen.getByRole("heading", { name: /current specials/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /top sellers/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /new releases/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /coming soon/i, level: 1 })).toBeInTheDocument();
  });
  
  test("renders fallback error message when all sections are empty and loading is false", () => {
    renderComponent({ specials: [], topSellers: [], newReleases: [], comingSoon: [], loading: false });
  
    const errorMessage = screen.getByRole("heading", { name: /error fetching games, please try reloading the page/i, level: 1 });
    expect(errorMessage).toBeInTheDocument();
  });
  
});
