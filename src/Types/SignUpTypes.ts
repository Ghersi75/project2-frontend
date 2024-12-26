export interface SignUpPropsType {
  username: string,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}