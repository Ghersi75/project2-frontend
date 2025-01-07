export interface GameThreadCardProps {
  canInteract: boolean,
  canEdit: boolean,
  canDelete: boolean,
  handleInteraction: (like: boolean) => void
  liked: boolean | null,
  reviewId: number,
  displayName: string,
  username: string,
  content: string,
  setContent: React.Dispatch<React.SetStateAction<string>>,
  handleUpdateReview: () => void,
  handleDeleteReview: () => void,
  likes: number,
  dislikes: number,
  postedAt: string,
}