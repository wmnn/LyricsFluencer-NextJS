import { createContext, useEffect, useState } from 'react'
import { User } from '../types';

const UserContext = createContext<UserContextType>(null);

interface UserContextType {
    user: User;
    userContext: User;
    setUserContext: (updateFn: (prev: User) => User) => void;
}

export function getUserFromLocaleStorage() {

    console.log('Loading user from locale storage.')
    const storedUser = localStorage.getItem('user');
   
    if (storedUser && storedUser != "undefined") {
        // setUser(JSON.parse(storedUser))
        const savedUser = JSON.parse(storedUser);
        console.log('User in locale storage ' + JSON.stringify(savedUser, null, 2))
        return savedUser
    } 

    console.log('No user is in locale storage')
    return {
        learnedLanguage: 'en',
        nativeLanguage: 'en',
    }
}

function UserContextProvider({ children }) {

    const [user, setUser] = useState<any>({
        learnedLanguage: 'de',
        nativeLanguage: 'de',
    })

    useEffect(() => {
        setUser(getUserFromLocaleStorage())
    }, [])

    function setUserContext(updateFn: (prev: User) => User) {
        const newUser: User = updateFn(user);
        if (!newUser) {
            console.log("Can't update user with: ", newUser);
            return;
        }
        console.log(`Updated user: ${JSON.stringify(newUser)}`);
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
    }

    return (
        <UserContext.Provider value={{user, userContext: user, setUserContext}}>
            { children }
        </UserContext.Provider>
    )
}
export { UserContext, UserContextProvider }