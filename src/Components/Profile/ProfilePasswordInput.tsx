import { Label } from "@radix-ui/react-label"
import { Input } from "../ui/input"
import { useState } from "react";

export default function ProfilePasswordInput({
  label,
  displayText,
  password,
  setPassword
}: {
  label: string,
  displayText: string,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Label htmlFor={label}> {displayText} </Label>
      <div className="relative">
        <Input
          id={label}
          value={password}
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Label className="absolute right-4 top-1/2 -translate-y-1/2 hover:cursor-pointer hover:underline" onClick={() => { setShowPassword(prev => !prev) }}> {showPassword ? "Hide" : "Show"} </Label>
      </div>
    </>
  )
}