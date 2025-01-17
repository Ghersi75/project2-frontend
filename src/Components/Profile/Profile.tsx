import { useUserInfo } from "@/Hooks/useUserInfo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import ProfilePasswordForm from "./ProfilePasswordForm";
import ProfileUsernameForm from "./ProfileUsernameForm";
import ProfileDisplayNameForm from "./ProfileDisplayNameForm";
import axios from "axios";
import { useDefaultRequestOptions } from "@/Hooks/useDefaultRequestOptions";
import { useEnvironmentVariable } from "@/Hooks/useEnvironmentVariable";

export default function Profile() {
  const { userInfo, loading } = useUserInfo();
  const { defaultOptions } = useDefaultRequestOptions();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayNameError, setDisplayNameError] = useState("")
  const [displayNameSuccess, setDisplayNameSuccess] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const VITE_BACKEND = useEnvironmentVariable("VITE_BACKEND")

  useEffect(() => {
    if (userInfo == null) {
      return;
    }

    setUsername(userInfo.username);
    setDisplayName(userInfo.displayName);
  }, [loading])
  
  if (userInfo == null) {
    return;
  }

  const formStyle = "flex flex-col gap-2";

  const handleUsernameChange = () => {
    setUsernameError("")
    setUsernameSuccess("")
    const body = {
      newUsername: username
    }

    axios.put(`${VITE_BACKEND}/user/username?username=${userInfo.username}`, body, defaultOptions)
      .then(() => {
        setUsernameSuccess("Username successfully updated")
      })
      .catch(err => {
        setUsernameError(err.response?.data?.error || "Error updating username, please try again later")
      })
  }

  const handleDisplayNameChange = () => {
    setDisplayNameError("")
    setDisplayNameSuccess("")
    const body = {
      newDisplayName: displayName
    }

    axios.put(`${VITE_BACKEND}/user/displayname?username=${userInfo.username}`, body, defaultOptions)
      .then(() => {
        setDisplayNameSuccess("Display name successfully updated")
      })
      .catch(err => {
        setDisplayNameError(err.response?.data?.error || "Error updating display name, please try again later")
      })
  }

  const handlePasswordChange = () => {
    setPasswordError("")
    setPasswordSuccess("")
    const body = {
      oldPassword,
      newPassword
    }

    axios.put(`${VITE_BACKEND}/user/password?username=${userInfo.username}`, body, defaultOptions)
      .then(() => {
        setPasswordSuccess("Password successfully updated")
      })
      .catch(err => {
        setPasswordError(err.response?.data?.error || "Error updating password, please try again later")
      })
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
            usernameError={usernameError}
            usernameSuccess={usernameSuccess}
            handleUsernameChange={handleUsernameChange} />

          <ProfileDisplayNameForm
            formStyle={formStyle}
            displayName={displayName}
            setDisplayName={setDisplayName}
            currentDisplayName={userInfo.displayName}
            displayNameError={displayNameError}
            handleDisplayNameChange={handleDisplayNameChange}
            displayNameSuccess={displayNameSuccess} />

          <ProfilePasswordForm
            formStyle={formStyle}
            oldPassword={oldPassword}
            setOldPassword={setOldPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            passwordError={passwordError}
            passwordSuccess={passwordSuccess}
            handlePasswordChange={handlePasswordChange} />
        </CardContent>
      </Card>
    </div>
  )
}