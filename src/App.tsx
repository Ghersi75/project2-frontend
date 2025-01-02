import { BrowserRouter, Route, Routes } from "react-router";
import SignUpController from "./Components/SignUp/SignUpController";
import LoginController from "./Components/Login/LoginController";
import AuthLayout from "./Components/AuthLayout";
import { ThemeProvider } from "./Contexts/ThemeProvider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
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
