import axios from "axios";
import { useState } from "react"
import SignUp from "./SignUp";
import RedirectIfLoggedIn from "../RouteGuards/RedirectIfLoggedIn";

export default function SignUpController() {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    axios.post(`${import.meta.env.VITE_BACKEND}/user/register`, {
      username,
      displayName,
      password,
      role: "CONTRIBUTOR"
    }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
      .then(res => console.log(res))
      .catch(err => {
        if (err?.data?.error) {
          setError(err?.data?.error);
        } else if (err?.message) {
          setError(err?.message);
        }
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