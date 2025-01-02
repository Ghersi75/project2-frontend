import { useState } from "react";
import Login from "./Login";
import axios from "axios";

export default function LoginController() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND}/login`, {
      username,
      password
    }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  return (
    <>
      <Login
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit} />
    </>
  )
}