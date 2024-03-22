export interface Song {
    [key: string] : any
}

export interface SongContext {
    isSongShown: boolean,
    lyrics: string[],
    translation: string[],
    song: Song | null
}