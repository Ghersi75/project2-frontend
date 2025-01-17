import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import { LoginPropsType } from "@/Types/LoginTypes";

export default function Login({
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
  error
}: LoginPropsType) {
  const [showingPassword, setShowingPassword] = useState(false);


  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle> Login </CardTitle>
        <CardDescription> Enter your username and password to log in to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username"> Username </Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => { setUsername(e.target.value) }}
                required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showingPassword ? "text" : "password"}
                  placeholder="enter password"
                  className="pr-16"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  required />
                <Label className="absolute right-4 top-1/2 -translate-y-1/2 hover:cursor-pointer hover:underline" onClick={() => { setShowingPassword(prev => !prev) }}> {showingPassword ? "Hide" : "Show"} </Label>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            { error != "" && <Label className="text-destructive text-center"> Error: {error} </Label>}
            <Label className="text-muted-foreground text-center"> Don't have an account? <Link className="text-white hover:underline hover:cursor-pointer" to="/signup"> Sign up </Link> </Label>
            {/* Taken from examples at https://ui.shadcn.com/blocks/authentication */}
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                or continue as a guest
              </span>
            </div>
          <Link to="/"><Button variant="secondary" className="w-full"> Return to Home page </Button></Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}