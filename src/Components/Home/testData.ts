// testData.ts
import { HomeGameInfoType } from "@/Types/GameAPIReturnTypes";

export const specials: HomeGameInfoType[] = [
  {
    id: 1,
    name: "Special Game 1",
    discounted: true,
    discount_percent: 30,
    original_price: 5000,
    final_price: 3500,
    large_capsule_image: "special_game_1_image",
    windows_available: true,
    mac_available: false,
    linux_available: true,
  },
];

export const topSellers: HomeGameInfoType[] = [
  {
    id: 2,
    name: "Top Seller Game 1",
    discounted: true,
    discount_percent: 20,
    original_price: 6000,
    final_price: 4800,
    large_capsule_image: "top_seller_game_1_image",
    windows_available: true,
    mac_available: true,
    linux_available: false,
  },
];

export const newReleases: HomeGameInfoType[] = [
  {
    id: 3,
    name: "New Release Game 1",
    discounted: false,
    discount_percent: 0,
    original_price: 0,
    final_price: 0,
    large_capsule_image: "new_release_game_1_image",
    windows_available: true,
    mac_available: false,
    linux_available: true,
  },
];

export const comingSoon: HomeGameInfoType[] = [
  {
    id: 4,
    name: "Coming Soon Game 1",
    discounted: false,
    discount_percent: 0,
    original_price: 0,
    final_price: 0,
    large_capsule_image: "coming_soon_game_1_image",
    windows_available: false,
    mac_available: true,
    linux_available: true,
  },
];
