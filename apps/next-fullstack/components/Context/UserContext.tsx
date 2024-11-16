import { createContext, useEffect, useState } from 'react'
import { User } from '../types';

const UserContext = createContext<any>(null);

function UserContextProvider({ children }) {

    const [user, setUser] = useState({
        learnedLanguage: 'en',
        nativeLanguage: 'en',
    })

    useEffect(() => {
        console.log(localStorage)
        const storedUser = localStorage.getItem('user');
       
        if (storedUser && storedUser != "undefined") {
            setUser(JSON.parse(storedUser))
        } else {
            console.log('No user is saved')
        }
    }, [])

    function setUserContext(updateFn: (prev: User) => User) {
        const newUser = updateFn(user);
        if (!newUser) {
            console.log("Can't update user with: ", newUser);
            return;
        }
        console.log(`New user: ${JSON.stringify(newUser)}`);
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