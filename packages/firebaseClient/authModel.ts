import { auth } from './index'

export function getCurrentUserId()/*: string | undefined*/ {

    const user = auth.currentUser;

    if (user) {
        return user.uid;
    } 
    return undefined;
}
export async function getAuthToken()/*: Promise<string | undefined>*/{
    return await auth.currentUser?.getIdToken();
}