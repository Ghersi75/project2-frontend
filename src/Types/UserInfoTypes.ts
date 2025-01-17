export interface jwtType {
  sub: string,
  userRole: "MODERATOR" | "CONTRIBUTOR",
  displayName: string
}

export interface UserInfoType {
  username: string,
  userRole: "MODERATOR" | "CONTRIBUTOR",
  displayName: string
}

export interface UserInfoContextType {
  userInfo: UserInfoType | null,
  logout: () => void,
  loading: boolean
}