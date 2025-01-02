import { useState } from "react";
import Login from "./Login";
import axios from "axios";

export default function LoginController() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")

    axios.post(`${import.meta.env.VITE_BACKEND}/user/login`, {
      username,
      password
    }, {
      headers: {
        "Content-Type": "application/json",
      },
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
    <>
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        error={error} />
    </>
  )
}