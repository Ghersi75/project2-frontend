import { ThemeProvider } from "./Contexts/ThemeProvider";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./Components/AuthLayout";
import GamePage from "./Components/GamePage/GamePage";
import SignUpController from "./Components/SignUp/SignUpController";
import LoginController from "./Components/Login/LoginController";
import MainLayout from "./Components/MainLayout";
import SearchPage from "./Components/SearchPage/SearchPage";
import { NewsFeedShownProvider } from "./Contexts/NewsFeedShownProvider";
import { UserProvider } from "./Contexts/UserContext";
import ProfileController from "./Components/Profile/ProfileController";
import HomeController from "./Components/Home/HomeController";
import FavoritedGamesController from "./Components/FavoriteGames/FavoritedGamesController";
import { GamePageProvider } from "./Contexts/GamePageContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <NewsFeedShownProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="" element={<HomeController />} />
                <Route path="/:appId" element={<GamePageProvider> <GamePage /> </GamePageProvider>} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/favorites" element={<FavoritedGamesController />} />
                <Route path="/profile" element={<ProfileController />} />
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
