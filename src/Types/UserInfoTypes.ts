export interface jwtType {
  sub: string,
  userRole: string,
  displayName: string
}

export interface UserInfoType {
  username: string,
  userRole: string,
  displayName: string
}

export interface UserInfoContextType {
  userInfo: UserInfoType | null,
  logout: () => void
}