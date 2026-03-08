import { useState } from "react";
import { createContext } from "react";

export const songContext = createContext()

const SongContextProvider = ({children }) => {

    const [song, setSong] = useState({
        "url": "https://ik.imagekit.io/sitaram/moodify/songs/Mere_Mehboob_Qayamat_Hogi_KoshalWorld.Com__HeLlzvsmD.mp3",
        "postImage": "https://ik.imagekit.io/sitaram/moodify/poster/Mere_Mehboob_Qayamat_Hogi_KoshalWorld.Com__C2M8X9HX2.jpeg",
        "title": "Mere Mehboob Qayamat Hogi(KoshalWorld.Com)",
         "mood": "sad",
    })

    const [loading, setLoading] = useState(false)

  return (
    <songContext.Provider value={{loading, song, setSong, setLoading}}>
        {children }
    </songContext.Provider>
  )
}

export default SongContextProvider