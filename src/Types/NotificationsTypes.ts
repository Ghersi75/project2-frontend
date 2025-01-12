export interface NewsFeedItemType {
  id: number,
  appId: number,
  reviewId: number,
  gameName: string,
  username: string,
  type: "REVIEW" | "LIKE" | "DISLIKE"
}