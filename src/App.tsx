import Login from "@/Components/Login/Login";
import { ThemeProvider } from "./Contexts/ThemeProvider";
import SignUp from "@/Components/SignUp/SignUp";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <h1 className="bg-muted text-white h-screen w-screen flex justify-center items-center text-xl">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </h1>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
