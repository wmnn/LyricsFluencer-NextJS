import React, { useState } from "react";
import Modal from "./Modal";
import DOMPurify from "dompurify";
import cheerio from "cheerio";

function Inputs({
  setLyrics,
  setTranslatedLyrics,
  setCombinedLyrics,
  setArtist,
  setSong,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchedLanguage, setSearchedLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");

  const sanitizeData = (string) => ({
    //make sure set innerHTML is safe
    __html: DOMPurify.sanitize(string),
  });
  function handleChange(e) {
    e.target.name == "language" && !open ? setOpen((prev) => !prev) : "";
    e.target.name == "language"
      ? setSearchedLanguage(e.target.value)
      : setSearchInput(e.target.value);
  }
  async function handleSelectedSong(o) {
    await fetch(`/api/selected`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedSong: o,
        target: targetLanguage,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const sanitizedData = sanitizeData(res.lyrics);
        setLyrics(sanitizedData);
        setSearchResults([]);
      });
  }
  async function handleManualSearch() {
    await fetch(`/api/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchQuery: searchInput,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res.data.response.hits);
        if (res.data.response.hits) {
          setSearchResults(res.data.response.hits);
        }
      });
  }
  async function handleQuickSearch() {
    await fetch(`/api/quicksearch`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchQuery: searchInput,
        target: targetLanguage,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setArtist(res.artist);
        setSong(res.song);
        // var sanitizedData = sanitizeData(res.lyrics);
        setLyrics(res.lyrics);
        //sanitizedData = sanitizeData(res.translatedLyrics);
        setTranslatedLyrics(res.translatedLyrics);
        //console.log(res.translatedLyrics)
          
        const unsanitizedCombinedLyrics = handleCombinedLyrics(
          res.lyrics,
          res.translatedLyrics
        );
        setCombinedLyrics(sanitizeData(unsanitizedCombinedLyrics));
        
      });
  }
  function handleCombinedLyrics(lyrics, translatedLyrics) {
    const $lyrics = cheerio.load(lyrics);
    const $translatedLyrics = cheerio.load(translatedLyrics);

    // const div1Content = $lyrics
    // const div2Content = $translatedLyrics
    const div1Content = $lyrics("body").first().html().split("\n");
    const div2Content = $translatedLyrics("body").first().html().split("\n");
    

    let result = "";
    for (let i = 0; i < div1Content.length; i++) {
      result += `<span class="text-red">${div1Content[i]}</span><br><span class="text-blue">${div2Content[i]}</span><br>`;
    }
    console.log(result);
    return `<div>${result}</div>`
  }
  function handleCombinedGeniusLyrics(lyrics, translatedLyrics) {
    //const $lyrics = cheerio.load(lyrics);
    //const $translatedLyrics = cheerio.load(translatedLyrics);
    //Falsely formatted <br> tags are replaced with a correct one
    const $lyrics = cheerio.load(lyrics.replace(/<\s*br\s*\/?\s*>/gi, "<br>"));
    const $translatedLyrics = cheerio.load(
      translatedLyrics.replace(/<\s*br\s*\/?\s*>/gi, "<br>")
    );

    const div1Content = $lyrics("div").first().html().split("<br>");
    const div2Content = $translatedLyrics("div").first().html().split("<br>");

    let result = "";
    for (let i = 0; i < div1Content.length; i++) {
      result += `<span class="text-red">${div1Content[i]}</span><br><span class="text-blue">${div2Content[i]}</span><br>`;
    }
    return result;
  }
  return (
    <div className="flex justify-center w-full bg-gradient-to-r from-[#66111c] to-[#982626]">
      <div className=" w-full md:w-[40%] text-l md:text-xl p-8 rounded ">
        <div
          onClick={() => setOpen((prev) => !prev)}
          className="flex justify-between"
        >
          <p>Target language: </p>
          <input
            placeholder="Translate into ..."
            value={searchedLanguage}
            name="language"
            onChange={(e) => handleChange(e)}
            className="rounded"
          ></input>
        </div>

        {/* <div className="down-arrow w-8 h-0 relative left-[-30px]">
          <svg
            className=""
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z"></path>
          </svg>
        </div> */}

        {open ? (
          <Modal
            searchedLanguage={searchedLanguage}
            setSearchedLanguage={setSearchedLanguage}
            setTargetLanguage={setTargetLanguage}
            setOpen={setOpen}
          />
        ) : (
          ""
        )}

        <div className="flex justify-between mt-2">
          <p>Search for: </p>
          <input
            placeholder="Songname"
            name="song"
            value={searchInput}
            onChange={(e) => handleChange(e)}
            className="rounded"
          ></input>
        </div>

        <div className="flex justify-around mt-8 space-x-8 text-center">
          <div
            className="border-[1px] border-black hover:cursor-pointer rounded w-full"
            onClick={() => handleQuickSearch()}
          >
            <p>Quick Search</p>
          </div>
          <div
            className="border-[1px] border-black rounded w-full hover:cursor-pointer"
            onClick={() => handleManualSearch()}
          >
            <p>Manual Search</p>
          </div>
        </div>

        {searchResults.length > 0 ? (
          <div className="">
            {searchResults.map((o, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between relative bg-white text-black"
                  onClick={() => handleSelectedSong(o)}
                >
                  <p>{o.result.title}</p>
                  <p>by {o.result.artist_names}</p>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Inputs;
