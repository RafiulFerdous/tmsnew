import React,{useState,useEffect} from 'react'


export const SearchContext = React.createContext();

export const SearchContextProvider = ({children}) => {
    const [searchInformation, setsearchInformation] = useState("")
    return(
        <SearchContext.Provider value={{searchInformation,setsearchInformation}}>
            {
                children
            }
        </SearchContext.Provider>
    )
};


