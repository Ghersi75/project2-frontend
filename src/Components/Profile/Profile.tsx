import { useUserInfo } from "@/Hooks/useUserInfo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import ProfilePasswordForm from "./ProfilePasswordForm";
import ProfileUsernameForm from "./ProfileUsernameForm";
import ProfileDisplayNameForm from "./ProfileDisplayNameForm";

export default function Profile() {
  const { userInfo } = useUserInfo();
  const [username, setUsername] = useState(userInfo?.username || "");
  const [usernameError, setUsernameError] = useState("test")
  const [displayName, setDisplayName] = useState(userInfo?.displayName || "");
  const [displayNameError, setDisplayNameError] = useState("test")
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("test");

  if (userInfo == null) {
    return;
  }

  const formStyle = "flex flex-col gap-2";

  const handlePasswordChange = () => {
    console.log("submitted")
  }

  return (
    <div className="grow min-h-svh flex justify-center items-center bg-secondary/50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            Profile
          </CardTitle>
          <CardDescription>
            View and modify your profile here
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <ProfileUsernameForm
            formStyle={formStyle}
            username={username}
            setUsername={setUsername}
            currentUsername={userInfo.username}
            usernameError={usernameError} />

          <ProfileDisplayNameForm
            formStyle={formStyle}
            displayName={displayName}
            setDisplayName={setDisplayName}
            currentDisplayName={userInfo.displayName}
            displayNameError={displayNameError} />

          <ProfilePasswordForm
            formStyle={formStyle}
            oldPassword={oldPassword}
            setOldPassword={setOldPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            passwordError={passwordError}
            handlePasswordChange={handlePasswordChange} />
        </CardContent>
      </Card>
    </div>
  )
}