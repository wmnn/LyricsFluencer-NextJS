

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