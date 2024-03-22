interface Song {
    [key: string] : any
}

interface SongContext {
    isSongShown: boolean,
    lyrics: string[],
    translation: string[],
    song: Song | null
}