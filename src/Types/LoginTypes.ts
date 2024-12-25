export interface LoginPropsType {
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}