import { Button } from "../ui/button";
import ProfilePasswordInput from "./ProfilePasswordInput";

export default function ProfilePasswordForm({
  formStyle,
  oldPassword,
  setOldPassword,
  confirmPassword,
  setConfirmPassword,
  newPassword,
  setNewPassword,
  passwordError,
  handlePasswordChange
}: {
  formStyle: string,
  oldPassword: string,
  setOldPassword: React.Dispatch<React.SetStateAction<string>>,
  confirmPassword: string,
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>,
  newPassword: string,
  setNewPassword: React.Dispatch<React.SetStateAction<string>>,
  passwordError: string,
  handlePasswordChange: () => void
}) {
  return (
    <form className={formStyle} onSubmit={(e) => e.preventDefault()}>
      <ProfilePasswordInput
        label="oldPassword"
        displayText="Old password: "
        password={oldPassword}
        setPassword={setOldPassword} />
      <ProfilePasswordInput
        label="confirmPassword"
        displayText="Confirm password: "
        password={confirmPassword}
        setPassword={setConfirmPassword} />
      <ProfilePasswordInput
        label="newPassword"
        displayText="New password: "
        password={newPassword}
        setPassword={setNewPassword} />
      <Button
        variant="secondary"
        disabled={oldPassword != confirmPassword || newPassword.length == 0}
        onClick={handlePasswordChange}> Update password </Button>
      {passwordError != "" && <h3 className="p-0 text-destructive"> {passwordError} </h3>}
    </form>
  )
}