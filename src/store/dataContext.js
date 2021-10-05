import { createContext, useReducer, useEffect } from 'react'
import reducers from './reducers'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {

    const initialState = {
        member: {
            members: []
        }
    }

    const [state, dispatch] = useReducer(reducers, initialState);

    const getMembers = async () => {
        try {

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMembers();
    }, []);

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}