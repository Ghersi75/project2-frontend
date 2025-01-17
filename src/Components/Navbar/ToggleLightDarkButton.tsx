import { useTheme } from "@/Contexts/ThemeProvider";
import { Button } from "../ui/button";
import { BiSun } from "react-icons/bi";
import { BiMoon } from "react-icons/bi";

export default function ToggleLightDarkButton() {
  const { theme, setTheme } = useTheme();

  const handleToggleToggle = () => {
    if (theme === "dark") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    }
  };

  return (
    <Button variant="outline" onClick={handleToggleToggle}>
      {theme === "dark" ? (
        <BiSun data-testid="sun-icon" />
      ) : (
        <BiMoon data-testid="moon-icon" />
      )}
    </Button>
  );
}
