import { useContext, useState } from 'react';
import UserContext from '../Context/UserContext';
import { User } from '../../types';
import SelectLanguageMenu from './SelectLanguageMenu';


export default function SelectLearnedLanguageMenu() {

    const {userContext, setUserContext}: any = useContext(UserContext);
    const [value, setValue] = useState(userContext?.learnedLanguage ?? '');

    async function handleSelectedLanguage(langCode) {
    
        setUserContext((prev: User) => {
            return {
                id: prev?.id,
                learnedLanguage: langCode,
                nativeLanguage: prev?.nativeLanguage
            }
        })   
        setValue(langCode) 
    }

    return <SelectLanguageMenu handleChange={handleSelectedLanguage} title={`Your learned language:`} value={value}/>
}