import React, { useState, useEffect } from "react";
import Inputs from "../components/Lyrics/Inputs";

function index() {
  const [lyrics, setLyrics] = useState("");
  const [translatedLyrics, setTranslatedLyrics] = useState("");
  const [combinedLyrics, setCombinedLyrics] = useState("");
  const [artist, setArtist] = useState("");
  const [song, setSong] = useState("");

  return (
    <div className="">{/*
      <Inputs
        setArtist={setArtist}
        setSong={setSong}
        setLyrics={setLyrics}
        setTranslatedLyrics={setTranslatedLyrics}
        setCombinedLyrics={setCombinedLyrics}
      />

      <div className="flex flex-col items-center justify-center text-l md:text-2xl p-8 mt-8">
        <div className="md:w-[60%] xl:w-[40%] text-black mb-8 w-full">
          {artist ? <p>Artist: {artist}</p> : ""}
          {song ? <p>Title: {song}</p> : ""}
        </div>

        {lyrics && translatedLyrics && combinedLyrics ? (
          <div
            className="md:w-[60%] xl:w-[40%]"
            dangerouslySetInnerHTML={combinedLyrics}
          ></div>
        ) : (
          ""
        )}
         { //combinedLyrics ? <span className="text-black whitespace-pre-wrap">{`${combinedLyrics}`}</span> : "" } 
         }
        
      
      </div>
        */}
     
    </div>
  );
}

export default index;
