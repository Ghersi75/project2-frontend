import Login from "@/Components/Login/Login";
import { ThemeProvider } from "./Contexts/ThemeProvider";
import SignUp from "@/Components/SignUp/SignUp";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./Components/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
