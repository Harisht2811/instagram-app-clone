import { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from '../Supabase/Supabase';


const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState("");
    const [, setLoading] = useState(true);

    useEffect(() => {

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            console.log(session)
            if(event === 'SIGNED_IN'){
                setUser(session.user)
                setLoading(false);
            }
          
        })
        // console.log(auth)
        return () => {
            data.subscription.unsubscribe();
        };
    }, []);
    return <userAuthContext.Provider value={{ user }}>{children}</userAuthContext.Provider>
}
export function useUserAuth() {

    return useContext(userAuthContext);
}