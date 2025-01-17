import { useState } from "react";
import Login from "./Login";
import axios from "axios";
import RedirectIfLoggedIn from "../RouteGuards/RedirectIfLoggedIn";
import { useDefaultRequestOptions } from "@/Hooks/useDefaultRequestOptions";
import { useEnvironmentVariable } from "@/Hooks/useEnvironmentVariable";

export default function LoginController() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { defaultOptions } = useDefaultRequestOptions();
  const VITE_BACKEND = useEnvironmentVariable("VITE_BACKEND")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")

    axios.post(`${VITE_BACKEND}/user/login`, {
      username,
      password
    }, defaultOptions)
      .catch(err => {
        setError(err.response?.data?.error || err.message || "Error logging in. Try again later")
      });
  }

  return (
    <RedirectIfLoggedIn>
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        error={error} />
    </RedirectIfLoggedIn>
  )
}