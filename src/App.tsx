import axios from "axios"
import { useEffect } from "react"

function App() {
  useEffect(() => {
    axios.get("https://store.steampowered.com/api/featuredcategories/", {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(res => console.log(res));
  }, [])

  return (
    <h1 className="bg-zinc-900 text-white h-screen w-screen flex justify-center items-center text-xl">
      Welcome to this somewhat beautiful site
    </h1>
  )
}

export default App
