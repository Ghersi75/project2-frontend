import { Button } from "../ui/button";
import ProfileTextInput from "./ProfileTextInput";

export default function ProfileUsernameForm({
  formStyle,
  username,
  setUsername,
  currentUsername,
  usernameError
}: {
  formStyle: string,
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  currentUsername: string,
  usernameError: string
}) {
  return (
    <form className={formStyle} onSubmit={(e) => e.preventDefault()}>
      <ProfileTextInput
        label="username"
        displayText="Username: "
        value={username}
        setValue={setUsername} />
      <Button
        variant="secondary"
        disabled={username == "" || username == currentUsername}> Update username </Button>
      {usernameError != "" && <h3 className="p-0 text-destructive"> {usernameError} </h3>}
    </form>
  )
}