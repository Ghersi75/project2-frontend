import { Button } from "../ui/button";
import ProfileTextInput from "./ProfileTextInput";

export default function ProfileDisplayNameForm({
  formStyle,
  displayName,
  setDisplayName,
  currentDisplayName,
  displayNameError
}: {
  formStyle: string,
  displayName: string,
  setDisplayName: React.Dispatch<React.SetStateAction<string>>,
  currentDisplayName: string,
  displayNameError: string
}) {
  return (
    <form className={formStyle} onSubmit={(e) => e.preventDefault()}>
      <ProfileTextInput
        label="displayName"
        displayText="Display Name: "
        value={displayName}
        setValue={setDisplayName} />
      <Button
        variant="secondary"
        disabled={displayName == "" || displayName == currentDisplayName}> Update display name </Button>
      {displayNameError != "" && <h3 className="p-0 text-destructive"> {displayNameError} </h3>}
    </form>
  )
}