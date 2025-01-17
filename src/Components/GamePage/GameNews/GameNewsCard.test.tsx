import { render, screen, fireEvent } from "@testing-library/react";
import GameNewsCard from "./GameNewsCard";
import { useTruncatedElement } from "@/Hooks/useTruncatedElement";
import { GameNewsType } from "@/Types/GameAPIReturnTypes";
import "@testing-library/jest-dom"; // Import for custom matchers
import { MemoryRouter } from "react-router";
import { formatTime } from "@/lib/utils";

// Mock `useTruncatedElement`
jest.mock("@/Hooks/useTruncatedElement");

// Mock `formatTime`
jest.mock("@/lib/utils", () => ({
  ...jest.requireActual("@/lib/utils"),
  formatTime: jest.fn(),
}));

const mockToggleIsShowingMore = jest.fn();
const mockUseTruncatedElement = useTruncatedElement as jest.Mock;
const mockFormatTime = formatTime as jest.Mock;

// Mock `useTruncatedElement` return values
beforeEach(() => {
  jest.clearAllMocks();
  mockUseTruncatedElement.mockReturnValue({
    isTruncated: true,
    isShowingMore: false,
    toggleIsShowingMore: mockToggleIsShowingMore,
  });
  mockFormatTime.mockReturnValue("January 1, 2023"); // Mocked consistent output for formatTime
});

// Mock props
const mockItem: GameNewsType = {
  title: "New Update Released",
  feedlabel: "Community Announcements",
  url: "https://example.com/news",
  contents: "[b]This is a bold announcement![/b]",
  date: 1672531200, // January 1, 2023
};

const TestComponent = ({ item }: { item: GameNewsType }) => {
  return (
    <MemoryRouter>
      <GameNewsCard item={item} />
    </MemoryRouter>
  )
}

describe("GameNewsCard", () => {
  test("renders the title, feedlabel, and formatted date", () => {
    render(<TestComponent item={mockItem} />);

    expect(screen.getByText("New Update Released")).toBeInTheDocument();
    expect(screen.getByText("Community Announcements")).toBeInTheDocument();
    expect(screen.getByText("January 1, 2023")).toBeInTheDocument(); // Assuming `formatTime` works as expected
  });

  test("renders parsed BBCode content when feedlabel is 'Community Announcements'", () => {
    render(<TestComponent item={mockItem} />);

    const contentElement = screen.getByText("This is a bold announcement!");
    expect(contentElement).toBeInTheDocument();
    expect(contentElement.tagName).toBe("STRONG");
  });

  test("renders raw content when feedlabel is not 'Community Announcements'", () => {
    const customItem = { ...mockItem, feedlabel: "General News", contents: "This is a raw announcement." };
    render(<TestComponent item={customItem} />);

    const contentElement = screen.getByText("This is a raw announcement.");
    expect(contentElement).toBeInTheDocument();
    expect(contentElement.tagName).toBe("DIV");
  });

  test("renders 'Show more'/'Show less' button and toggles content visibility", () => {
    render(<TestComponent item={mockItem} />);

    const showMoreButton = screen.getByText("Show more");
    expect(showMoreButton).toBeInTheDocument();

    fireEvent.click(showMoreButton);
    expect(mockToggleIsShowingMore).toHaveBeenCalled();

    mockUseTruncatedElement.mockReturnValueOnce({
      isTruncated: true,
      isShowingMore: true,
      toggleIsShowingMore: mockToggleIsShowingMore,
    });

    render(<TestComponent item={mockItem} />);

    expect(screen.getByText("Show less")).toBeInTheDocument();
  });

  test("renders 'View Source' button with the correct link", () => {
    render(<TestComponent item={mockItem} />);

    const viewSourceButton = screen.getByRole("button", { name: "View Source" });
    expect(viewSourceButton).toBeInTheDocument();

    const linkElement = screen.getByRole("link", { name: "View Source" });
    expect(linkElement).toHaveAttribute("href", "https://example.com/news");
  });
});
