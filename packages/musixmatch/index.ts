import { JSDOM } from 'jsdom'
//@ts-ignore
import { env } from '@lyricsfluencer/env'
import { Song } from '../../apps/next-fullstack/types';

async function getHTML(URL) {
    var res = await fetch(URL, {
        method: 'GET',
    });
    return await res.text();
}

export async function handleSearch(searchQuery): Promise<Song[]> {
    try {
        const { message } = await (await fetch(
            `https://api.musixmatch.com/ws/1.1/track.search?apikey=${env.MUSIXMATCH_API_KEY}&page_size=1&q_track_artist=${searchQuery}&s_track_rating=desc&page_size=10`,{
                method: 'GET',
            }
        )).json();
    
        const songs = message.body.track_list;

        return songs.map(({ track }) => {

            return {
                id: track.commontrack_id,
                name: track.track_name,
                artist: track.artist_name,
                url: track.track_share_url.split('?')[0] ?? '',
                album: track.album_name ?? ''
            }
        })
    
    } catch (_) {
        return []
    }
}

export async function getLyrics(song: Song) : Promise<Song> {
    
    try {
        song.lyrics = await scrapeLyrics(song.url);
    } catch (err) {
        song.lyrics = await callLyricsEndpoint(song);
    }

    return song;
}
async function callLyricsEndpoint(song: Song) : Promise<string[]> {

    try {
        const res = await (await fetch(
            `https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${env.MUSIXMATCH_API_KEY}&commontrack_id=${song.id}`,{
                method: 'GET',
            }
        )).json();
    
        const lyrics = res.message.body.lyrics.lyrics_body
    
        return lyrics.split('\n')
    } catch (e) {
        return []
    }
}

async function scrapeLyrics(URL): Promise<string[]> {

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

        return span.innerHTML.split('\n');
    } else {
        throw `Couldn't scrape musixmatch site.`;
    }
}