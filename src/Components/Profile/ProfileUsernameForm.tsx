import { Button } from "../ui/button";
import ProfileTextInput from "./ProfileTextInput";

export default function ProfileUsernameForm({
  formStyle,
  username,
  setUsername,
  currentUsername,
  usernameError,
  usernameSuccess,
  handleUsernameChange,
}: {
  formStyle: string,
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  currentUsername: string,
  usernameError: string,
  usernameSuccess: string,
  handleUsernameChange: () => void
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
        disabled={username == "" || username == currentUsername}
        onClick={handleUsernameChange}> Update username </Button>
      {usernameError != "" && <h3 className="p-0 text-destructive text-sm"> {usernameError} </h3>}
      {usernameSuccess != "" && <h3 className="p-0 text-green-600 text-sm"> {usernameSuccess} </h3>}
    </form>
  )
}