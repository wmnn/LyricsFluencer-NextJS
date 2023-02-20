const router = require("express").Router();
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function routes(app) {
  router.post("/search", async (req, res) => {
    const data = await handleSearch(req.body.searchQuery);
    res.json({ status: 200, data: data });
  });

  router.post("/quicksearch", async (req, res) => {
    try {
      if(req.body.target){
        const target = req.body.target
      const data = await handleSearch(req.body.searchQuery);
      console.log(JSON.stringify(data, null, 2))
      const artist = data.message.body.track_list[0].track.artist_name;
      const song = data.message.body.track_list[0].track.track_name;

      const scrapeURL = data.message.body.track_list[0].track.track_share_url.split('?')[0] //https://www.musixmatch.com/lyrics/Apache-207/Roller?
      console.log(scrapeURL);
      var lyrics = await getLyrics(scrapeURL);
      const translatedLyrics = await handleTranslate(lyrics, target);
      console.log(translatedLyrics)

      return res.json({
        status: 200,
        artist: artist,
        song: song,
        lyrics: lyrics,
        translatedLyrics: translatedLyrics,
      });
      }
    } catch (err) {}
  });

  router.post("/selected", async (req, res) => {
    const scrapeURL = req.body.selectedSong.result.url;
    const lyrics = await getLyrics(scrapeURL);

    res.json({ status: 200, lyrics: lyrics });
  });

  return router;
}

async function getHTML(URL) {
  var res = await fetch(URL, {
    method: "GET",
  });
  return await res.text();
}
async function handleSearch(searchQuery){
  var returnedData;
  //https://api.musixmatch.com/ws/1.1/track.search?apikey=4429a9866ca299e3461a53362d9bc840&page_size=1&q=Onizuka
  await fetch(`https://api.musixmatch.com/ws/1.1/track.search?apikey=4429a9866ca299e3461a53362d9bc840&page_size=1&q_track_artist=${searchQuery}&s_track_rating=desc&page_size=10`, {
    method: "GET",
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    
    //   "Access-Control-Allow-Origin": "*",
    // },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      //console.log(JSON.stringify(res.message, null, 2))
      returnedData = res;
    });
  return returnedData
}

async function handleGeniusSearch(searchQuery) {
  var returnedData;
  await fetch(`https://api.genius.com/search?q=${searchQuery}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GENIUS_TOKEN}`,
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      returnedData = res;
    });
  return returnedData;
}
async function getLyrics(URL){
  //"https://www.musixmatch.com/de/songtext/Fetty-Wap/Trap-Queen"
  const html = await getHTML(
    URL
  );
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const parentDiv = document.querySelector(".mxm-lyrics span");
 
  // Make sure the parent div exists
  if (parentDiv) {
    // Create a new span element to store the text content
    const span = document.createElement("span");
    span.style.whiteSpace = "pre-wrap";

    // Traverse the child nodes of the parent div and retrieve their text content
    const traverseNodes = function(node) {
      let text = "";
      for (let i = 0; i < node.childNodes.length; i++) {
        const childNode = node.childNodes[i];
        if (childNode.nodeType === 3) {
          // If the node is a text node, append its text content to the text variable
          text += childNode.nodeValue;
        } else if (childNode.nodeName !== "SCRIPT" && childNode.nodeName !== "BUTTON") {
          // If the node is an element that is not a script or button and has innerHTML, recursively traverse its child nodes
          let innerText = traverseNodes(childNode);
          if (innerText.length > 0) {
            text += innerText + "\n";
          }
        }
      }
      return text;
    };

    // Set the text content of the span to the retrieved text
    span.innerHTML = traverseNodes(parentDiv);

    // Replace the inner HTML of the parent div with the span
    parentDiv.innerHTML = span.outerHTML;
    //console.log(span.innerHTML);
    return span.innerHTML
  }
  
}

async function getGeniusLyrics(scrapeURL) {
  const html = await getHTML(scrapeURL);
  var lyrics;

  const dom = new JSDOM(html);
  const svgElements = dom.window.document.querySelectorAll("svg");
  for (const svgElement of svgElements) {
    svgElement.remove();
  }
  lyrics = dom.window.document.querySelector("#lyrics-root"); /*.outerHTML*/
  //remove all divs which don't contain lyrics
  var divs = dom.window.document.querySelectorAll("#lyrics-root div");
  divs.forEach(function (div) {
    if (!div.className.startsWith("Lyrics__Container")) {
      div.remove();
    }
  });

  //remove all spans inside a anchor tag, the innerHtml of the anchor Tags are now diplayed in the anchor tag
  let anchors = dom.window.document.querySelectorAll("a");
  for (let i = 0; i < anchors.length; i++) {
    let anchor = anchors[i];
    let spans = anchor.querySelectorAll("span");
    for (let j = 0; j < spans.length; j++) {
      let span = spans[j];
      anchor.innerHTML += span.innerHTML;
      span.remove();
    }
  }
  //remove all spans inside #lyrics-root divs
  var divs = dom.window.document.querySelectorAll("#lyrics-root div");
  divs.forEach(function (div) {
    let spans = div.getElementsByTagName("span");
    while (spans.length > 0) {
      spans[0].parentNode.removeChild(spans[0]);
    }
  });
  //remove all anchor tags inside all divs, but keep the innerHtml displayed, interprets all tags correctly

  divs = dom.window.document.querySelectorAll("#lyrics-root div");
  divs.forEach(function (div) {
    let anchors = div.getElementsByTagName("a");

    while (anchors.length) {
      let anchor = anchors[0];
      let parent = anchor.parentNode;

      let fragment = dom.window.document.createDocumentFragment();
      let wrapper = dom.window.document.createElement("div");
      wrapper.innerHTML = anchor.innerHTML;

      while (wrapper.firstChild) {
        fragment.appendChild(wrapper.firstChild);
      }

      parent.insertBefore(fragment, anchor);
      anchor.remove();
    }
  });
  //remove the h2 tags inside the root div
  var h2 = dom.window.document.querySelector("#lyrics-root h2");
  h2.remove();

  //fixing all falsely formatted <br> tags
  const documentHTML = dom.window.document.documentElement.innerHTML;
  const fixedHTML = documentHTML.replace(/<\s*br\s*\/?>/gi, "<br>");
  dom.window.document.documentElement.innerHTML = fixedHTML;
  // //removing all <b> tags
  // let bTags = dom.window.document.getElementsByTagName("b");
  // while (bTags.length > 0) {
  //   bTags[0].parentNode.removeChild(bTags[0]);
  // }

  //remvove all attributes of all elements
  const elements = dom.window.document.body.getElementsByTagName("*");

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    while (element.attributes.length > 0) {
      element.removeAttribute(element.attributes[0].name);
    }
  }

  return lyrics.outerHTML;
}

async function handleTranslate(text, targetLanguage) {
  var translatedLyrics;

  const data = {
    q: text,
    key: process.env.GOOGLETRANSLATEAPIKEY,
    target: targetLanguage,
    format: "text",
  };
  const searchParams = new URLSearchParams(data).toString();

  await fetch("https://translation.googleapis.com/language/translate/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: searchParams,
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.data.translations[0])
      translatedLyrics = res.data.translations[0].translatedText;
    })
    .catch((err) => console.error(err));

  return translatedLyrics;
}

module.exports = routes;
