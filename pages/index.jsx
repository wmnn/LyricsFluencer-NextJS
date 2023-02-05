import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import DOMPurify from "dompurify";
import { languages } from "../staticData.js";
import cheerio from "cheerio";

function index() {
  const [searchedLanguage, setSearchedLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [song, setSong] = useState("");
  const [open, setOpen] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [lyrics, setLyrics] = useState({
    __html: `<div><div>[Paroles de "Onizuka"]<br><br>[Produit par BBP &amp; Dolor]<br><br>[Couplet 1 : N.O.S]<br>J'fais les ronds, j'fais les ronds, j'fais les ronds, leur monde<br>Plus je me rapproche du sommet, plus j'entends le ciel qui gronde<br>J'voulais juste grailler<br>QLF ne cherche pas d'alliés<br>Eh zut la vie est bonne, bonne à niquer<br>Ils vendent leur cul, leur mère<br>On n'imagine pas cette vie sans remporter la guerre<br>J'aimerais un gosse mais à laquelle de ces putains le faire<br>Je pense à demain du soir au matin<br>J'ai cru apercevoir le destin<br>Ouais je t'ai jamais aimé, on s'est jamais vraiment quittés<br>Gratte pas l'amitié, man on sait pas vraiment qui t'es<br>Rien n'a changé, dans ma direction du vent<br>Y'a juste que j'recompte un peu plus qu'avant<br>P'tit frère n'a pas de grand, prince de la ville<br>J'm'écarte du bâtiment, j'oublie le taro du kil'<br>[Refrain]<br>Ouh Onizuka<br>Ouh, ah<br>Ouh Onizuka<br>Hella, hella, hella, hella<br>Hella, hella, hella, hella<br>Hella, hella, hella, hella<br>Ouh Onizuka<br>Hella, hella, hella<br><br>[Couplet 2 : Ademo]<br>Mhh ouais<br>J'viens faire mon beurre, mer de billets, j'fais des longueurs<br>Toi tu fais l'con, j'parle au scié, parle à mon coeur<br>Belek au douze, belek au *krr*, ou là zumba<br>La street c'est fou, j'fais le tour de la ville #Onizuka<br>Comme Yakuza, comme GTO<br>Il pleut des balles à la météo<br>J'vois pas d'étoiles, à part au tel-ho (<i>à part au tel-ho</i>)<br>Elle l'a plus gros que J-LO<br>Pas peur d'aider un frère s'il y a heja<br>Mais l'frère a peur de m'aider quand y a heja<br>Moi quand j'm'habille, j'ai l'flow #Onizuka<br>Le charme de la street, ouais gros, #Onizuka<br>La vie c'est chelou, (<i>vraiment chelou</i>) solitaires, mais entre nous<br>Son boule est relou, (<i>vraiment relou</i>) hein les loups s'cassent le cou<br></div><div>[Refrain]<br>Ouh Onizuka<br>Ouh, ah<br>Ouh Onizuka<br>Hella, hella, hella, hella<br>Hella, hella, hella, hella<br>Hella, hella, hella, hella<br>Ouh Onizuka<br>Hella, hella, hella<br>Hella, hella, hella, hella<br><br>[Outro]<br>Ils vendent leur cul, leur mère<br>Ouh Onizuka<br>Ouh, ah<br>P'tit frère n'a pas de grand<br>Ouh Onizuka<br>J'm'écarte du bâtiment (<i>Hella, hella, hella, hella</i>)</div></div>`,
  });
  const [translatedLyrics, setTranslatedLyrics] = useState({
    __html: `<div><div> [Lyrics of "Onizuka"]<br><br> [Produced by BBP &amp; Dolor]<br><br> [Verse 1: OUR]<br> I do the circles, I do the circles, I do the circles, their world<br> The closer I get to the top, the more I hear the sky rumbling<br> I just wanted to graze<br> QLF is not looking for allies<br> Hey damn life is good, good to fuck<br> They sell their ass, their mother<br> We can't imagine this life without winning the war<br> I want a kid but which of these whores do it to<br> I think about tomorrow from evening to morning<br> I thought I saw fate<br> Yeah I never loved you, we never really left each other<br> Don't scratch friendship, man, we don't really know who you are<br> Nothing has changed, in my direction of the wind<br> I'm just counting a little more than before<br> Little brother doesn't have a big brother, prince of the city<br> I move away from the building, I forget the taro of the kil'<br> [Chorus]<br> Ooh Onizuka<br> Ooh, oh<br> Ooh Onizuka<br> Hella, hella, hella, hella<br> Hella, hella, hella, hella<br> Hella, hella, hella, hella<br> Ooh Onizuka<br> Hella, hella, hella<br><br> [Verse 2: Ademo]<br> Mhh yeah<br> I come to make my butter, sea of tickets, I do lengths<br> You play dumb, I talk to the sawed, talk to my heart<br> Belek at twelve, belek at *krr*, or there zumba<br> The street is crazy, I go around the city #Onizuka<br> Like Yakuza, like GTO<br> It's raining bullets at the weather<br> I don't see any stars, except at the tel-ho ( <i>except at the tel-ho</i> )<br> She got it bigger than J-LO<br> Not afraid to help a brother if there is heja<br> But the brother is afraid to help me when there is heja<br> Me when I get dressed, I have the flow #Onizuka<br> The charm of the street, yeah big, #Onizuka<br> Life is weird, ( <i>really weird</i> ) lonely, but between us<br> His ball is crazy, ( <i>really crazy</i> ) eh the wolves break their necks<br></div><div> [Chorus]<br> Ooh Onizuka<br> Ooh, oh<br> Ooh Onizuka<br> Hella, hella, hella, hella<br> Hella, hella, hella, hella<br> Hella, hella, hella, hella<br> Ooh Onizuka<br> Hella, hella, hella<br> Hella, hella, hella, hella<br><br> [Outtro]<br> They sell their ass, their mother<br> Ooh Onizuka<br> Ooh, oh<br> Little brother doesn't have a big one<br> Ooh Onizuka<br> I step away from the building ( <i>Hella, hella, hella, hella</i> )</div></div>`,
  });

  const [combinedLyrics, setCombinedLyrics] = useState(() => {
    const $lyrics = cheerio.load(lyrics.__html);
    const $translatedLyrics = cheerio.load(translatedLyrics.__html);

    // const div1 = $lyrics("div").first();
    // const div2 = $translatedLyrics("div").first();

    const div1Content = $lyrics("div").first().html().split("<br>");
    const div2Content = $translatedLyrics("div").first().html().split("<br>");

    let result = "";
    for (let i = 0; i < div1Content.length; i++) {
      result += div1Content[i] + "<br>" + div2Content[i] + "<br>";
    }
    console.log(result)

    //const result = document.createElement("div");
    // const div1Content = div1.innerHTML.split("<br>");
    // const div2Content = div2.innerHTML.split("<br>");
    //console.log(div1Content);

    // for (let i = 0; i < div1Content.length; i++) {
    //   result.innerHTML += div1Content[i] + "<br>" + div2Content[i] + "<br>";
    // }
    //return { "html__" : result};
    return {__html: result}
  });

  function handleChange(e) {
    e.target.name == "language" && !open ? setOpen((prev) => !prev) : "";
    e.target.name == "language"
      ? setSearchedLanguage(e.target.value)
      : setSong(e.target.value);
  }
  const sanitizeData = (string) => ({
    //make sure set innerHTML is safe
    __html: DOMPurify.sanitize(string),
  });

  async function handleSelectedSong(o) {
    await fetch(`/api/selected`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedSong: o,
        targetLanguage: targetLanguage,
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
        song: song,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data.response.hits);
        if (res.data.response.hits) {
          setSearchResults(res.data.response.hits);
        }
      });
  }
  async function handleQuickSearch() {
    console.log(targetLanguage);

    await fetch(`/api/quicksearch`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        song: song,
        target: targetLanguage,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        var sanitizedData = sanitizeData(res.lyrics);
        setLyrics(sanitizedData);
        sanitizedData = sanitizeData(res.translatedLyrics);
        setTranslatedLyrics(sanitizedData);
        //handleFormatting(lyrics,translatedLyrics)
      });
  }
  // function handleFormatting(lyrics, translatedLyrics) {

  //   const div1 = '<div class="1"><h2>Text</h2><div>1<br>2<br>3</div><div>4<br>5<br>6</div></div>';
  //   const div2 = '<div class="2"><h2>Text</h2><div>A<br>B<br>C</div><div>D<br>E<br>F</div></div>';

  //   const getLines = (div) => {
  //     // Extract the lines from the div string
  //     const lines = div.match(/<br>/g);
  //     // Replace the <br> tags with a newline character
  //     return div.replace(/<br>/g, '\n').split('\n');
  //   };

  //   const lines1 = getLines(lyrics);
  //   const lines2 = getLines(translatedLyrics);

  //   // Combine the lines from both divs alternately
  //   let combinedLines = [];
  //   for (let i = 0; i < lines1.length || i < lines2.length; i++) {
  //     if (i < lines1.length) {
  //       combinedLines.push(lines1[i]);
  //     }
  //     if (i < lines2.length) {
  //       combinedLines.push(lines2[i]);
  //     }
  //   }
  //   console.log(combinedLines.join('<br>'))
  //   // Join the combined lines with <br> tags
  //   setCombinedHTML(combinedLines.join('<br>'))
  // }

  return (
    <div className="px-8 flex flex-col items-center justify-center">
      <div onClick={() => setOpen((prev) => !prev)} className="flex">
        <p>Target language: </p>
        <input
          placeholder="Translate into ..."
          value={searchedLanguage}
          name="language"
          onChange={(e) => handleChange(e)}
          className="ml-8"
        ></input>

        <div className="down-arrow w-8 h-0 relative left-[-30px]">
          <svg
            className=""
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z"></path>
          </svg>
        </div>
      </div>

      {open ? (
        <Modal
          languages={languages}
          searchedLanguage={searchedLanguage}
          setSearchedLanguage={setSearchedLanguage}
          setTargetLanguage={setTargetLanguage}
          setOpen={setOpen}
          targetLanguage={targetLanguage}
        />
      ) : (
        ""
      )}

      <div className="flex">
        <p>Song: </p>
        <input
          placeholder="Songname"
          name="song"
          value={song}
          onChange={(e) => handleChange(e)}
        ></input>
        <div
          className="border-[1px] border-black hover:cursor-pointer"
          onClick={() => handleQuickSearch()}
        >
          <p>Quick Search</p>
        </div>
        <div
          className="border-[1px] border-black"
          onClick={() => handleManualSearch()}
        >
          <p>Manual Search</p>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div>
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

      {/*lyrics ? (
        <div dangerouslySetInnerHTML={lyrics} className="mb-8"></div>
      ) : (
        ""
      )*/}

      {/* {lyrics ? <div>{JSON.stringify(lyrics, null, 2)}</div> : ""} */}

      {/*translatedLyrics ? (
        <div dangerouslySetInnerHTML={translatedLyrics} className="mb-8"></div>
      ) : (
        ""
      )*/}

      {lyrics && translatedLyrics ? (
        <div
          className="container"
          dangerouslySetInnerHTML={combinedLyrics}
        ></div>
      ) : (
        ""
      )}
    </div>
  );
}

export default index;
