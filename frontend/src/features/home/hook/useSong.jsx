import { useContext } from "react";
import { getSong } from "../service/song.api";
import { songContext } from "../song.context";

const useSong = () => {

  const context = useContext(songContext);

  if (!context) {
    throw new Error("useSong must be used inside SongContextProvider");
  }

  const { loading, song, setSong, setLoading } = context;

  const handleGetSong = async ({ mood }) => {

    setLoading(true);

    const data = await getSong({ mood });

    setSong(data.song);

    setLoading(false);
  };

  return { loading, song, handleGetSong };
};

export default useSong;