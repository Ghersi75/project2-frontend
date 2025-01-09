import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function ProfileTextInput({
  label,
  displayText,
  value,
  setValue

}: {
  label: string,
  displayText: string,
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <>
      <Label htmlFor={label}> {displayText} </Label>
      <Input
        id={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  )
}