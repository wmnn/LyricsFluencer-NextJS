export interface User {
    id?: string,
    nativeLanguage?: string,
    learnedLanguage?: string,
}

export interface Song {
    // [key: string] : any,
    id: string,
    name: string,
    artist: string,
    url?: string,
    lyrics?: string[],
    translation?: string[],
    album?: string,
}

export interface SelectedSongRequest {
    song: Song,
    nativeLanguage: string,
}
export interface SelectedSongResponse {
    status: number,
    song: Song
}

export interface QuickSearchResponse {
    status: number,
    song: Song
}

export interface ManualSearchResponse {
    songs: Song[]
}