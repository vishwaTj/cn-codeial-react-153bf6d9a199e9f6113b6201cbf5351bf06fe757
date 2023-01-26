import { useContext, useEffect, useState } from "react";

import {login as userLogin} from'../api';

// The useContext accepts the value provided by React. createContext
// and then re-render the component whenever its value changes but you can
// still optimize its performance by using memoization
import { AuthContext } from "../providers/AuthProvider";
import { setItemInLocalStorage,LOCALSTORAGE_TOKEN_KEY, removeItemFromLocalStorage, getItemFromLocalStorage } from "../utils";
import jwt from 'jwt-decode';

export const useAuth = () =>{
    return useContext(AuthContext);
}

export const useProvideAuth =() =>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
       const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

       if(userToken){
        const user = jwt(userToken);
        setUser(user);
       }
       setLoading(false);
    },[])


    const login = async (email, password) => {
        const response = await userLogin(email,password);

        if(response.success){
            setUser(response.data.user);
            setItemInLocalStorage(
                LOCALSTORAGE_TOKEN_KEY,
                response.data.token ? response.data.token : null
            );

            return{
                success:true
            };
        }else{
            return {
                success:false,
                message:response.message
            };
        }
    };

    const logout = () => {
       // when user logs out set user as null 
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    };

    // this will return the global state check initial state in Authprovider.js
    return{
        user,
        login,
        logout,
        loading
    }
}