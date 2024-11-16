import { useContext, useState, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import SelectLanguageMenu from './SelectLanguageMenu';


export default function SelectLearnedLanguageMenu() {

    const {user, setUserContext}: any = useContext(UserContext);
    const [value, setValue] = useState(user.learnedLanguage || '');

    useEffect(() => {
        setValue(user.learnedLanguage)
    }, [user])

    async function handleSelectedLanguage(langCode) {
        setUserContext((prev) => ({
            id: prev?.id || '',
            learnedLanguage: langCode,
            nativeLanguage: prev?.nativeLanguage || ''
        }));
    }

    return <SelectLanguageMenu handleChange={handleSelectedLanguage} title={`Your learned language:`} value={value}/>
}