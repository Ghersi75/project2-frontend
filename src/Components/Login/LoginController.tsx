import { useState } from "react";
import Login from "./Login";
import axios from "axios";

export default function LoginController() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND}/signup`, {
      email,
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
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit} />
    </>
  )
}