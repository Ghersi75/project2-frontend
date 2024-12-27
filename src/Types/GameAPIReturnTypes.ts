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