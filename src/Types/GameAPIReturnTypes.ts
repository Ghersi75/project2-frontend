export interface HomeGameInfoType {
  id: number,
  name: string,
  discounted: boolean,
  discount_percent: number,
  original_price: number | null,
  final_price: number,
  large_capsule_image: string,
  windows_available: boolean,
  mac_available: boolean,
  linux_available: boolean,
}

export interface GameScreenshotType {
  id: number,
  path_thumbnail: string,
  path_full: string
}

export interface GameMovieType {
  id: number,
  name: string,
  thumbnail: string,
  webm: {
    480: string,
    max: string
  },
  mp4: {
    480: string,
    max: string
  }
}

export interface GamePriceOverviewType {
  currency: string,
  discount_percent: number,
  initial_formatted: string,
  final_formatted: string
}

export interface GamePageGameInfo {
  name: string,
  genres?: {
    id: number,
    description: string
  }[],
  screenshots: GameScreenshotType[],
  movies?: GameMovieType[],
  price_overview?: GamePriceOverviewType,
  thumbnailLink: string,
  availableOn: string[],
}

export interface GameNewsType {
  title: string,
  feedlabel: string,
  url: string,
  contents: string,
  date: number
}

// https://steamcommunity.com/actions/SearchApps/hollow
export interface GameSearchType {
  appid: number,
  name: string,
  logo: string
}

export interface GameThreadType {
  reviewId: number,
  displayName: string,
  username: string,
  content: string,
  likes: number,
  dislikes: number,
  postedAt: Date | null,
  likedByUser: boolean,
  dislikedByUser: boolean
}