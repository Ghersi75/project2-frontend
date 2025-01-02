export interface NewsFeedLikeDislikeType {
  appId: number,
  threadId: number,
  type: "like" | "dislike",
  // User who liked/disliked?
  username: string,
}

export interface NewsFeedNewCommentType {
  appId: number,
  threadId: number
}

export type NewsFeedItemType = NewsFeedLikeDislikeType | NewsFeedNewCommentType;

export const testData: NewsFeedItemType[] = [
  {
    appId: 1245620,
    threadId: 1
  },
  {
    appId: 1144200,
    threadId: 1,
    type: "like",
    username: "Some guy"
  },
  {
    appId: 2322010,
    threadId: 1,
    type: "dislike",
    username: "A hater"
  }
]
