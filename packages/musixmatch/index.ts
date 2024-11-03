import { JSDOM } from 'jsdom'
//@ts-ignore
import { env } from '@lyricsfluencer/env'

async function getHTML(URL) {
    var res = await fetch(URL, {
        method: 'GET',
    });
    return await res.text();
}

export async function handleSearch(searchQuery) {
    var returnedData;
    await fetch(
        `https://api.musixmatch.com/ws/1.1/track.search?apikey=${env.MUSIXMATCH_API_KEY}&page_size=1&q_track_artist=${searchQuery}&s_track_rating=desc&page_size=10`,{
            method: 'GET',
        }
    )
        .then((res) => {
            return res.json();
        })
        .then((res) => {
            returnedData = res;
        });
    return returnedData;
}

export async function getLyrics(URL) {
    const html = await getHTML(URL);
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const parentDiv = document.querySelector('.mxm-lyrics span');

    // Make sure the parent div exists
    if (parentDiv) {
        // Create a new span element to store the text content
        const span = document.createElement('span');
        span.style.whiteSpace = 'pre-wrap';

        // Traverse the child nodes of the parent div and retrieve their text content
        const traverseNodes = function (node) {
            let text = '';
            for (let i = 0; i < node.childNodes.length; i++) {
                const childNode = node.childNodes[i];
                if (childNode.nodeType === 3) {
                    // If the node is a text node, append its text content to the text variable
                    text += childNode.nodeValue;
                } else if (
                    childNode.nodeName !== 'SCRIPT' &&
                    childNode.nodeName !== 'BUTTON'
                ) {
                    // If the node is an element that is not a script or button and has innerHTML, recursively traverse its child nodes
                    let innerText = traverseNodes(childNode);
                    if (innerText.length > 0) {
                        text += innerText + '\n';
                    }
                }
            }
            return text;
        };

        // Set the text content of the span to the retrieved text
        span.innerHTML = traverseNodes(parentDiv);

        // Replace the inner HTML of the parent div with the span
        parentDiv.innerHTML = span.outerHTML;

        return span.innerHTML;
    } else {
        console.error(`Couldn't scrape musixmatch site.`)
    }
}