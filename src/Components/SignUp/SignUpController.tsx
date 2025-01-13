import axios from "axios";
import { useState } from "react"
import SignUp from "./SignUp";
import RedirectIfLoggedIn from "../RouteGuards/RedirectIfLoggedIn";
import { useDefaultRequestOptions } from "@/Hooks/useDefaultRequestOptions";
import { useEnvironmentVariable } from "@/Hooks/useEnvironmentVariable";

export default function SignUpController() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { defaultOptions } = useDefaultRequestOptions();
  const VITE_BACKEND = useEnvironmentVariable("VITE_BACKEND")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    axios.post(`${VITE_BACKEND}/user/register`, {
      username,
      displayName,
      password,
      role: "CONTRIBUTOR"
    }, defaultOptions)
      .catch(err => {
        setError(err.response?.data?.error || err.message || "Error signing up. Try again later")
      });
  }

  return (
    <RedirectIfLoggedIn>
      <SignUp
        username={username}
        setUsername={setUsername}
        displayName={displayName}
        setDisplayName={setDisplayName}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        error={error} />
    </RedirectIfLoggedIn>
  )
}