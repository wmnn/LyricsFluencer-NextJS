import { useContext } from 'react';
import UserContext from '../Context/UserContext';
import { User } from '../../types';
import SelectLanguageMenu from './SelectLanguageMenu';


export default function SelectNativeLanguageMenu() {

    const {_, setUserContext}: any = useContext(UserContext);

    async function handleSelectedLanguage(langCode) {
        setUserContext((prev: User) => {
            return {
                id: prev?.id,
                learnedLanguage: prev?.learnedLanguage,
                nativeLanguage: langCode
            }
        })    
    }

    return <SelectLanguageMenu handleChange={handleSelectedLanguage} title={`Your native language:`}/>
}