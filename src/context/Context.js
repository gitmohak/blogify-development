//The main Context API file.
import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

let initialUser = null;

if(localStorage.getItem("user") && localStorage.getItem("user") !== "bnVsbA==" && localStorage.getItem("user") !== "null")
    initialUser = JSON.parse(window.atob(localStorage.getItem("user")));

const INITIAL_STATE = {
    user: initialUser,
    isFetching: false,
    error: false
}

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", window.btoa(JSON.stringify(state.user)));
    }, [state.user])
    

    return (
        <Context.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}
        </Context.Provider>
    );
}