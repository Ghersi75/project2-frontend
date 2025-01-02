import { BrowserRouter, Route, Routes } from "react-router";
import SignUpController from "./Components/SignUp/SignUpController";
import LoginController from "./Components/Login/LoginController";
import AuthLayout from "./Components/AuthLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginController />} />
          <Route path="/signup" element={<SignUpController />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
