const router = require("express").Router();
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function routes(app) {
  router.post("/search", async (req, res) => {
    const data = await handleSearch(req.body.song);
    res.json({ status: 200, data: data });
  });

  router.post("/quicksearch", async (req, res) => {
    try {
      const data = await handleSearch(req.body.song);
      const scrapeURL = data.response.hits[0].result.url;
      const lyrics = await getLyrics(scrapeURL);
      const translatedLyrics = await handleTranslate(lyrics);

      return res.json({
        status: 200,
        lyrics: lyrics,
        translatedLyrics: translatedLyrics,
      });
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

async function handleSearch(song) {
  var returnedData;
  await fetch(`https://api.genius.com/search?q=${song}`, {
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

async function getLyrics(scrapeURL) {
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
  var h2 = dom.window.document.querySelector("#lyrics-root h2")
  h2.remove()

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

async function handleTranslate(text) {
  var translatedLyrics;

  const data = {
    q: text,
    key: process.env.GOOGLETRANSLATEAPIKEY,
    target: "en",
    format: "html",
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
      translatedLyrics = res.data.translations[0].translatedText;
    })
    .catch((err) => console.error(err));

  return translatedLyrics;
}

module.exports = routes;
