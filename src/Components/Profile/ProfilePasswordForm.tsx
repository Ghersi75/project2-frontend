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
  passwordSuccess,
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
  passwordSuccess: string,
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
        label="newPassword"
        displayText="New password: "
        password={newPassword}
        setPassword={setNewPassword} />
      <ProfilePasswordInput
        label="confirmPassword"
        displayText="Confirm password: "
        password={confirmPassword}
        setPassword={setConfirmPassword} />
      <Button
        variant="secondary"
        disabled={oldPassword == "" || newPassword != confirmPassword || newPassword.length == 0}
        onClick={handlePasswordChange}> Update password </Button>
      {passwordError != "" && <h3 className="p-0 text-destructive text-sm"> {passwordError} </h3>}
      {passwordSuccess != "" && <h3 className="p-0 text-green-600 text-sm"> {passwordSuccess} </h3>}
    </form>
  )
}