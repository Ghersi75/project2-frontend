import { render, screen } from "@testing-library/react";
import GameNews from "./GameNews";
import { GameNewsType } from "@/Types/GameAPIReturnTypes";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";

const mockNews: GameNewsType[] = [
  {
    title: "Update 1.1 Released",
    feedlabel: "Patch Notes",
    url: "https://example.com/update1",
    contents: "Details about the patch",
    date: 1672531200, // January 1, 2023
  },
  {
    title: "New Feature Announcement",
    feedlabel: "Community Announcements",
    url: "https://example.com/feature",
    contents: "Details about the feature",
    date: 1672617600, // January 2, 2023
  },
];

const TestComponent = ({
  isLoading,
  news
}: {
  isLoading: boolean,
  news: GameNewsType[]
}) => {
  return (
    <MemoryRouter>
      <GameNews
        isLoading={isLoading}
        news={news} />
    </MemoryRouter>
  )
}

describe("GameNews Component", () => {
  test("renders 'Loading...' card when `isLoading` is true", () => {
    render(<TestComponent isLoading={true} news={[]} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("No News Found")).not.toBeInTheDocument();
    expect(screen.queryByText("Update 1.1 Released")).not.toBeInTheDocument();
  });

  test("renders 'No News Found' card when `news` is empty and `isLoading` is false", () => {
    render(<TestComponent isLoading={false} news={[]} />);

    expect(screen.getByText("No News Found")).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("Update 1.1 Released")).not.toBeInTheDocument();
  });

  test("renders all news items correctly", () => {
    render(<TestComponent isLoading={false} news={mockNews} />);

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("No News Found")).not.toBeInTheDocument();

    // Check for each news item
    mockNews.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.feedlabel)).toBeInTheDocument();
    });
  });
});
