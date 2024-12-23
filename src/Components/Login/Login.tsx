import { Link } from "react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Login() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle> Login </CardTitle>
        <CardDescription> Enter your email and password to log in to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email"> Email </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Label className="text-muted-foreground text-center"> Don't have an account? <Link className="text-white hover:underline hover:cursor-pointer" to="/signup"> Sign up </Link> </Label>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}