export interface GameThreadCardProps {
  canInteract: boolean,
  handleInteraction: (like: boolean) => void
  liked: boolean | null,
  reviewId: number,
  displayName: string,
  username: string,
  content: string,
  likes: number,
  dislikes: number,
  postedAt: string,
}