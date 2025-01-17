import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewsFeedCard from "./NewsFeedCard";
import { useNewsFeedShown } from "@/Hooks/useNewsFeedShown";
import { MemoryRouter } from "react-router";
import { NewsFeedItemType } from "@/Types/NotificationsTypes";

jest.mock("@/Hooks/useNewsFeedShown");

const mockUseNewsFeedShown = useNewsFeedShown as jest.Mock;

const mockSetNewsFeedShown = jest.fn();
const mockHandleDeleteNotification = jest.fn();

const mockInfo: NewsFeedItemType = {
  id: 1,
  appId: 123,
  reviewId: 456,
  type: "REVIEW",
  username: "testuser",
  gameName: "Test Game",
};

const renderComponent = (info = mockInfo) => {
  return render(
    <MemoryRouter>
      <NewsFeedCard
        info={info}
        handleDeleteNotification={mockHandleDeleteNotification}
      />
    </MemoryRouter>
  );
};

describe("NewsFeedCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNewsFeedShown.mockReturnValue({ setNewsFeedShown: mockSetNewsFeedShown });
  });

  test("renders a REVIEW notification correctly", () => {
    renderComponent();

    // Locate the card and assert its content
    const card = screen.getByRole("link", {
      name: /@testuser left a new comment on "Test Game"/i,
    });

    expect(card).toBeInTheDocument();
  });

  test("renders a LIKE notification correctly", () => {
    const likeInfo: NewsFeedItemType = { ...mockInfo, type: "LIKE" };
    renderComponent(likeInfo);

    const card = screen.getByRole("link", {
      name: /@testuser liked your comment on "Test Game"/i,
    });

    expect(card).toBeInTheDocument();
  });

  test("renders a DISLIKE notification correctly", () => {
    const dislikeInfo: NewsFeedItemType = { ...mockInfo, type: "DISLIKE" };
    renderComponent(dislikeInfo);

    const card = screen.getByRole("link", {
      name: /@testuser disliked your comment on "Test Game"/i,
    });

    expect(card).toBeInTheDocument();
  });

  test("calls setNewsFeedShown(false) when the link is clicked", () => {
    renderComponent();

    const link = screen.getByRole("link");
    fireEvent.click(link);

    expect(mockSetNewsFeedShown).toHaveBeenCalledWith(false);
  });

  test("calls handleDeleteNotification when delete button is clicked", () => {
    renderComponent();

    const deleteButton = screen.getByText(/delete/i);
    fireEvent.click(deleteButton);

    expect(mockHandleDeleteNotification).toHaveBeenCalledWith(mockInfo.id);
  });
});
