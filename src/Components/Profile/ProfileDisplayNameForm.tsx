import { Button } from "../ui/button";
import ProfileTextInput from "./ProfileTextInput";

export default function ProfileDisplayNameForm({
  formStyle,
  displayName,
  setDisplayName,
  currentDisplayName,
  displayNameError,
  displayNameSuccess,
  handleDisplayNameChange
}: {
  formStyle: string,
  displayName: string,
  setDisplayName: React.Dispatch<React.SetStateAction<string>>,
  currentDisplayName: string,
  displayNameError: string,
  displayNameSuccess: string,
  handleDisplayNameChange: () => void
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
        disabled={displayName == "" || displayName == currentDisplayName}
        onClick={handleDisplayNameChange}> Update display name </Button>
      {displayNameError != "" && <h3 className="p-0 text-destructive text-sm"> {displayNameError} </h3>}
      {displayNameSuccess != "" && <h3 className="p-0 text-green-600 text-sm"> {displayNameSuccess} </h3>}
      </form>
  )
}