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

export interface GamePageGameInfo {
  name: string,
  genres?: {
    id: number,
    description: string
  }[],
  screenshots: {
    id: number,
    path_thumbnail: string,
    path_full: string
  }[],
  movies?: {
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
  }[],
  price_overview: {
    currency: string,
    discount_percent: number,
    initial_formatted: string,
    final_formatted: string
  }
}