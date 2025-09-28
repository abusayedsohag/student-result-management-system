import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../Firebase/firebase.config";

export const AuthProvider = createContext(null);

const auth = getAuth(app);

const AuthContext = ({ children }) => {

    const [user, setUser] = useState();
    const [loader, setLoader] = useState(true);

    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoader(false)
        });

        return () => {
            return unsubscribe();
        }
    })

    const signIn = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutme = () => {
        setLoader(true);
        return signOut(auth);
    }

    const authinfo = {
        user,
        loader,
        signIn,
        signOutme,
        setLoader
    }


    return (
        <AuthProvider.Provider value={authinfo}>
            {children}
        </AuthProvider.Provider>
    );
};

export default AuthContext;