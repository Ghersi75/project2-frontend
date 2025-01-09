import { ThemeProvider } from "./Contexts/ThemeProvider";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./Components/AuthLayout";
import Home from "./Components/Home/Home";
import GamePage from "./Components/GamePage/GamePage";
import SignUpController from "./Components/SignUp/SignUpController";
import LoginController from "./Components/Login/LoginController";
import MainLayout from "./Components/MainLayout";
import SearchPage from "./Components/SearchPage/SearchPage";
import { NewsFeedShownProvider } from "./Contexts/NewsFeedShownProvider";
import { UserProvider } from "./Contexts/UserContext";
import FavoriteGames from "./Components/FavoriteGames/FavoritedGames";
import Profile from "./Components/Profile/Profile";

function App() {
  console.log(import.meta.env.VITE_BACKEND);

  return (
    <UserProvider>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <NewsFeedShownProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="/:appId" element={<GamePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/favorites" element={<FavoriteGames />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginController />} />
                <Route path="/signup" element={<SignUpController />} />
              </Route>
            </Routes>
          </NewsFeedShownProvider>
        </ThemeProvider>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
