import { createContext } from 'react'
import type { SongContext } from '../types'

const SongContext = createContext<any>({isSongShown: false, lyrics: [], translation: [], song: null});

export default SongContext