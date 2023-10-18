import { createContext, useEffect, useState, useContext } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from './Firebaseconfig'


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState("");

    function signUp(email, password) {
        console.log(email, password)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    function signoutWithEmailAndPassword() {
        return signOut(auth);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false);
        });
        // console.log(auth)
        return () => {
            unsubscribe();
        }
    }, []);
    return <userAuthContext.Provider value={{ user, signUp, logIn, signoutWithEmailAndPassword }}>{!loading && children}</userAuthContext.Provider>
}
export function useUserAuth() {

    return useContext(userAuthContext);
}