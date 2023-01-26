import { createContext } from "react";
import { useProvideAuth } from "../hooks";

// initial state
const initialState ={
    user:null,
    login:() =>{},
    logout:() => {},
    loading:true
}

// The context will have state of sign up
export const AuthContext = createContext(initialState)

// AuthenProvider will have functions to login sign up etc
export const AuthProvider = ({children}) =>{
    const auth = useProvideAuth(); // this will grab the current state

    // the current state will passed be passed to all its children via ("auth")
    // thi is global context
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}


