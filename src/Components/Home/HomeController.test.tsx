import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomeController from "./HomeController";
import axios from "axios";
import { MemoryRouter } from "react-router";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const TestComponent = () => {
  return (
    <MemoryRouter>
      <HomeController />
    </MemoryRouter>
  );
};

describe("HomeController Component", () => {
  const mockResponse = {
    data: {
      specials: {
        items: [
          {
            id: 1,
            name: "Special Game 1",
            discounted: true,
            discount_percent: 20,
            original_price: 5000,
            final_price: 4000,
            large_capsule_image: "special_game_1_image",
            windows_available: true,
            mac_available: false,
            linux_available: true,
          },
        ],
      },
      top_sellers: {
        items: [
          {
            id: 2,
            name: "Top Seller Game 1",
            discounted: true,
            discount_percent: 15,
            original_price: 6000,
            final_price: 5100,
            large_capsule_image: "top_seller_game_1_image",
            windows_available: true,
            mac_available: true,
            linux_available: false,
          },
        ],
      },
      new_releases: {
        items: [
          {
            id: 3,
            name: "New Release Game 1",
            discounted: false,
            discount_percent: 0,
            original_price: null,
            final_price: 0,
            large_capsule_image: "new_release_game_1_image",
            windows_available: true,
            mac_available: false,
            linux_available: true,
          },
        ],
      },
      coming_soon: {
        items: [
          {
            id: 4,
            name: "Coming Soon Game 1",
            discounted: false,
            discount_percent: 0,
            original_price: null,
            final_price: 0,
            large_capsule_image: "coming_soon_game_1_image",
            windows_available: false,
            mac_available: true,
            linux_available: true,
          },
        ],
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders and sets data correctly from API", async () => {
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    render(<TestComponent />);

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(process.env.VITE_STEAM_FEATURED || "");
    });

    // Check that data for each section is rendered correctly
    expect(screen.getByText(/special game 1/i)).toBeInTheDocument();
    expect(screen.getByText(/top seller game 1/i)).toBeInTheDocument();
    expect(screen.getByText(/new release game 1/i)).toBeInTheDocument();
    expect(screen.getByText(/coming soon game 1/i)).toBeInTheDocument();

    // Check that images are rendered correctly
    expect(screen.getByAltText(/special game 1 large capsule image/i)).toHaveAttribute("src", "special_game_1_image");
    expect(screen.getByAltText(/top seller game 1 large capsule image/i)).toHaveAttribute("src", "top_seller_game_1_image");
    expect(screen.getByAltText(/new release game 1 large capsule image/i)).toHaveAttribute("src", "new_release_game_1_image");
    expect(screen.getByAltText(/coming soon game 1 large capsule image/i)).toHaveAttribute("src", "coming_soon_game_1_image");
  });

  test("receives no response data from successful api call and renders fallback error", async () => {
    mockedAxios.get.mockResolvedValueOnce({});

    render(<TestComponent />);

    // Wait for the data to be fetched and rendered
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(process.env.VITE_STEAM_FEATURED || "");
    });

    // Check that data for each section is rendered correctly
    expect(screen.queryByText(/special game 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/top seller game 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/new release game 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/coming soon game 1/i)).not.toBeInTheDocument();

    // Check that fallback is rendered
    expect(screen.getByText(/error fetching games, please try reloading the page/i)).toBeInTheDocument();
  });

  test("handles API error gracefully", async () => {
    mockedAxios.get.mockRejectedValueOnce({});

    render(<TestComponent />);

    // Wait for the component to attempt fetching data
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    // Ensure no data-dependent elements are rendered
    expect(screen.queryByText(/special game 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/top seller game 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/new release game 1/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/coming soon game 1/i)).not.toBeInTheDocument();
  });


});
