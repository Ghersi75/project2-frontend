import { ThemeProvider } from "./Contexts/ThemeProvider";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./Components/AuthLayout";
import Home from "./Components/Home/Home";
import GamePage from "./Components/GamePage/GamePage";
import SignUpController from "./Components/SignUp/SignUpController";
import LoginController from "./Components/Login/LoginController";
import MainLayout from "./Components/MainLayout";
import SearchPage from "./Components/SearchPage/SearchPage";

function App() {
  console.log(import.meta.env.VITE_BACKEND);

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="/:appId" element={<GamePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginController />} />
            <Route path="/signup" element={<SignUpController />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
