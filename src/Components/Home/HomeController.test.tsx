import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomeController from "./HomeController";
import axios from "axios";
import { MemoryRouter } from "react-router";

jest.mock("axios");
jest.mock("@/Hooks/useEnvironmentVariable", () => ({
  useEnvironmentVariable: (key: string) => {
    const mockEnvVars: Record<string, string> = {
      VITE_STEAM_FEATURED: "http://mock-steam-featured-api.com",
    };
    return mockEnvVars[key];
  },
}));

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

  test("renders fallback error message when no data is received from API", async () => {
    mockedAxios.get.mockResolvedValueOnce({});

    render(<TestComponent />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(/error fetching games, please try reloading the page/i)
      ).toBeInTheDocument();
    });

    // Ensure loading state is gone
    expect(screen.queryByText(/\bloading\b/i)).not.toBeInTheDocument();
  });

  test("renders fallback error message on API failure", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

    render(<TestComponent />);

    // Wait for the error message to appear
    await waitFor(() => {
      expect(
        screen.getByText(/error fetching games, please try reloading the page/i)
      ).toBeInTheDocument();
    });

    // Ensure loading state is gone
    expect(screen.queryByText(/\bloading\b/i)).not.toBeInTheDocument();
  });

  test("renders loading state before data is fetched", async () => {
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    render(<TestComponent />);

    // Check that the loading message is displayed
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for the data to load
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://mock-steam-featured-api.com"
      );
    });

    // Ensure loading message is removed after data is loaded
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  test("renders and sets data correctly from API", async () => {
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    render(<TestComponent />);

    // Wait for the data to load
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

    // Verify the loading message is removed
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();

    // Verify data is displayed correctly
    expect(screen.getByText(/special game 1/i)).toBeInTheDocument();
    expect(screen.getByText(/top seller game 1/i)).toBeInTheDocument();
    expect(screen.getByText(/new release game 1/i)).toBeInTheDocument();
    expect(screen.getByText(/coming soon game 1/i)).toBeInTheDocument();
  });
});
