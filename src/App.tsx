import Login from "@/Components/Login/Login";
import { ThemeProvider } from "./Contexts/ThemeProvider";
import SignUp from "@/Components/SignUp/SignUp";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1 className="bg-muted text-white h-screen w-screen flex justify-center items-center text-xl">
        <SignUp />
      </h1>
    </ThemeProvider>
  )
}

export default App
