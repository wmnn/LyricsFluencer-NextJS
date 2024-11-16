import { useContext, useEffect, useState } from 'react';
import { UserContext } from './context/UserContext';
import { User } from './types';
import SelectLanguageMenu from './SelectLanguageMenu';


export default function SelectNativeLanguageMenu() {

    const {user, setUserContext}: any = useContext(UserContext);
    const [value, setValue] = useState(user.nativeLanguage || '');

    useEffect(() => {
        setValue(user.nativeLanguage)
    }, [user])

    async function handleSelectedLanguage(langCode) {
        setUserContext((prev: User) => {
            return {
                id: prev?.id,
                learnedLanguage: prev?.learnedLanguage,
                nativeLanguage: langCode
            }
        })
    }

    return <SelectLanguageMenu handleChange={handleSelectedLanguage} title={`Your native language:`} value={value}/>
}