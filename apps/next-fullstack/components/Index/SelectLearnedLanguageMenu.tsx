import { useContext } from 'react';
import UserContext from '../Context/UserContext';
import { User } from '../../types';
import SelectLanguageMenu from './SelectLanguageMenu';


export default function SelectLearnedLanguageMenu() {

    const {_, setUserContext}: any = useContext(UserContext);

    async function handleSelectedLanguage(langCode) {
        setUserContext((prev: User) => {
            return {
                id: prev?.id,
                learnedLanguage: langCode,
                nativeLanguage: prev?.nativeLanguage
            }
        })    
    }

    return <SelectLanguageMenu handleChange={handleSelectedLanguage} title={`Your learned language:`}/>
}