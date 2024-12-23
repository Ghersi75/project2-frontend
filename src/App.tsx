import Login from "@/Components/Login/Login";
import { ThemeProvider } from "./Contexts/ThemeProvider";
import SignUp from "@/Components/SignUp/SignUp";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthLayout from "./Components/AuthLayout";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  console.log(import.meta.env.VITE_BACKEND);

  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col justify-center items-center">
          <Navbar />
          <Routes>
            <Route path="" element={<Home />} />
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
