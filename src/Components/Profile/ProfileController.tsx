import RedirectIfNotLoggedIn from "../RouteGuards/RedirectIfNotLoggedIn";
import Profile from "./Profile";

export default function ProfileController() {
  return (
    <RedirectIfNotLoggedIn>
      <Profile />
    </RedirectIfNotLoggedIn>
  )
}