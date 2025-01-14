import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { MemoryRouter } from "react-router";
import GameNewsController from "./GameNewsController";

// Mock axios calls since tests won't interact with actual APIs
jest.mock("axios");
const mockAxiosGet = axios.get as jest.Mock;

// Mock environment variable hook
jest.mock("@/Hooks/useEnvironmentVariable", () => ({
  useEnvironmentVariable: jest.fn((key: string) => {
    const mockEnvVars: Record<string, string> = {
      VITE_STEAM_NEWS: "http://mock-steam-news.com",
    };
    return mockEnvVars[key];
  }),
}));

// Mock useParams
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: () => ({
    appId: "123456",
  }),
}));

const TestComponent = () => {
  return (
    <MemoryRouter>
      <GameNewsController />
    </MemoryRouter>
  );
};

describe("GameNewsController", () => {
  test("renders loading state initially", async () => {
    mockAxiosGet.mockResolvedValueOnce({ data: { appnews: { newsitems: [] } } });

    render(<TestComponent />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("renders no news message if API returns an empty list", async () => {
    mockAxiosGet.mockResolvedValueOnce({ data: { appnews: { newsitems: [] } } });

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText(/no news found/i)).toBeInTheDocument();
    });
  });

  test("renders news cards when API call is successful", async () => {
    const mockNews = [
      {
        gid: "1",
        title: "Game Update 1",
        feedlabel: "Community Announcements",
        date: 1672531200,
        contents: "This is a test announcement",
        url: "http://example.com/news1",
      },
      {
        gid: "2",
        title: "Game Update 2",
        feedlabel: "Patch Notes",
        date: 1672617600,
        contents: "Patch notes content",
        url: "http://example.com/news2",
      },
    ];

    mockAxiosGet.mockResolvedValueOnce({ data: { appnews: { newsitems: mockNews } } });

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText(/game update 1/i)).toBeInTheDocument();
      expect(screen.getByText(/game update 2/i)).toBeInTheDocument();
    });
  });

  test("handles API errors gracefully", async () => {
    mockAxiosGet.mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText(/no news found/i)).toBeInTheDocument();
    });
  });
});
