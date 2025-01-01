import axios from "axios";
import { useState } from "react"
import SignUp from "./SignUp";

export default function SignUpController() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND}/signup`, {
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

  return(
    <>
      <SignUp 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit} />
    </>
  )
}