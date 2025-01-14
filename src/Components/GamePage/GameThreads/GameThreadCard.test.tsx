// GameThreadCard.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameThreadCard from "./GameThreadCard";
import { GameThreadCardProps } from "@/Types/GameThreadsTypes";
import { useIsVisible } from "@/Hooks/useIsVisible";
import { useCustomSearchParams } from "@/Hooks/useCustomSearchParams";

// Mock the custom hooks used in GameThreadCard
jest.mock("@/Hooks/useIsVisible");
jest.mock("@/Hooks/useCustomSearchParams");

const mockUseIsVisible = useIsVisible as jest.Mock;
const mockUseCustomSearchParams = useCustomSearchParams as jest.Mock;

describe("GameThreadCard Component", () => {
  // Create default props that can be spread into each test
  const defaultProps: GameThreadCardProps = {
    canInteract: true,
    canEdit: true,
    canDelete: true,
    handleInteraction: jest.fn(),
    liked: null, // null means not liked or disliked
    reviewId: 123,
    displayName: "Test Display",
    username: "testuser",
    content: "Test content",
    setContent: jest.fn(),
    handleUpdateReview: jest.fn(),
    handleDeleteReview: jest.fn(),
    likes: 5,
    dislikes: 2,
    postedAt: "2025-01-01",
  };

  // Each test will start with fresh mocks
  beforeEach(() => {
    jest.clearAllMocks();

    // By default, pretend the card is visible in the viewport
    mockUseIsVisible.mockReturnValue(true);

    // Provide default mocks for your custom search param hooks
    mockUseCustomSearchParams.mockReturnValue({
      getParam: jest.fn().mockReturnValue(null),
      setParam: jest.fn(),
      deleteParam: jest.fn(),
    });
  });

  test("renders basic info (displayName, username, content, likes, dislikes)", () => {
    render(<GameThreadCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.displayName)).toBeInTheDocument();
    expect(screen.getByText(`@${defaultProps.username}`)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.content)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.likes)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.dislikes)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.postedAt)).toBeInTheDocument();
  });

  test("calls handleInteraction(true) when upvote is clicked (if canInteract=true)", () => {
    render(<GameThreadCard {...defaultProps} canInteract={true} />);

    const upvoteIcon = screen.getByTestId("BiUpvote-icon"); 
    // NOTE: If you can't easily apply a data-testid, you can locate it via role, text, or other class-based queries:
    // const upvoteIcon = screen.getByTitle("Upvote"); 
    // Or wrap the icon in a button and query the button.

    fireEvent.click(upvoteIcon);

    expect(defaultProps.handleInteraction).toHaveBeenCalledTimes(1);
    expect(defaultProps.handleInteraction).toHaveBeenCalledWith(true);
  });

  test("does not call handleInteraction when canInteract=false (upvote/downvote)", () => {
    render(<GameThreadCard {...defaultProps} canInteract={false} />);

    const upvoteIcon = screen.getByTestId("BiUpvote-icon");
    fireEvent.click(upvoteIcon);

    expect(defaultProps.handleInteraction).not.toHaveBeenCalled();
  });

  test("calls handleInteraction(false) when downvote is clicked (if canInteract=true)", () => {
    render(<GameThreadCard {...defaultProps} canInteract={true} />);

    const downvoteIcon = screen.getByTestId("BiDownvote-icon");
    fireEvent.click(downvoteIcon);

    expect(defaultProps.handleInteraction).toHaveBeenCalledTimes(1);
    expect(defaultProps.handleInteraction).toHaveBeenCalledWith(false);
  });

  test("clicking edit toggles text area and then 'confirm' calls handleUpdateReview", () => {
    render(<GameThreadCard {...defaultProps} canEdit={true} />);

    // "edit" button should appear
    const editButton = screen.getByRole("button", { name: /edit/i });
    expect(editButton).toBeInTheDocument();

    // Click edit => text area should appear
    fireEvent.click(editButton);
    const textArea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textArea).toBeInTheDocument();

    // Type in the text area
    fireEvent.change(textArea, { target: { value: "Updated content" } });
    expect(defaultProps.setContent).toHaveBeenCalledWith("Updated content");

    // Confirm changes
    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    // handleUpdateReview should have been called
    expect(defaultProps.handleUpdateReview).toHaveBeenCalledTimes(1);
  });

  test("does not render edit button if canEdit=false", () => {
    render(<GameThreadCard {...defaultProps} canEdit={false} />);

    expect(screen.queryByRole("button", { name: /edit/i })).not.toBeInTheDocument();
  });

  test("delete button flow: shows 'cancel' and 'confirm' on click, calls handleDeleteReview on confirm", () => {
    render(<GameThreadCard {...defaultProps} canDelete={true} />);

    // "delete" button should appear
    const deleteButton = screen.getByRole("button", { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();

    // Click "delete" => should see "cancel" and "confirm"
    fireEvent.click(deleteButton);
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
    const confirmDeleteButton = screen.getByRole("button", { name: /confirm/i });
    expect(confirmDeleteButton).toBeInTheDocument();

    // Confirm delete
    fireEvent.click(confirmDeleteButton);
    expect(defaultProps.handleDeleteReview).toHaveBeenCalledTimes(1);
  });

  test("does not render delete button if canDelete=false", () => {
    render(<GameThreadCard {...defaultProps} canDelete={false} />);

    expect(screen.queryByRole("button", { name: /delete/i })).not.toBeInTheDocument();
  });

  test("scrolls into view if threadId in URL matches this review's ID", () => {
    const mockScrollIntoView = jest.fn();

    // Mock the ref's scrollIntoView
    // Since we can't control the real DOM ref easily, we'll do it this way:
    Element.prototype.scrollIntoView = mockScrollIntoView;

    mockUseCustomSearchParams.mockReturnValue({
      getParam: jest.fn().mockReturnValue("123"), // simulate threadId=123
      setParam: jest.fn(),
      deleteParam: jest.fn(),
    });

    render(<GameThreadCard {...defaultProps} reviewId={123} />);

    // Expect the card to have been scrolled into view
    expect(mockScrollIntoView).toHaveBeenCalled();
  });

  test("adds highlight class if the card is visible and threadId matches", () => {
    // isVisible -> true, threadId matches -> highlight should be set
    mockUseIsVisible.mockReturnValue(true);
    mockUseCustomSearchParams.mockReturnValue({
      getParam: jest.fn().mockReturnValue("123"), 
      setParam: jest.fn(),
      deleteParam: jest.fn(),
    });

    render(<GameThreadCard {...defaultProps} reviewId={123} />);

    // The card has class "animate-highlight" when highlight is true
    const card = screen.getByText(defaultProps.displayName).closest(".animate-highlight");
    expect(card).toBeInTheDocument();
  });

  test("does not add highlight class if the threadId doesn't match or card not visible", () => {
    // If threadId != this reviewId => highlight won't be set
    mockUseIsVisible.mockReturnValue(true);
    mockUseCustomSearchParams.mockReturnValue({
      getParam: jest.fn().mockReturnValue("999"), 
      setParam: jest.fn(),
      deleteParam: jest.fn(),
    });

    render(<GameThreadCard {...defaultProps} reviewId={123} />);

    const card = screen.getByText(defaultProps.displayName).closest(".animate-highlight");
    expect(card).not.toBeInTheDocument();
  });
});
