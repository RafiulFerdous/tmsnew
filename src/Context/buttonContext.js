import React,{useState,useEffect} from 'react'


export const SearchButtonContext = React.createContext();

export const SearchButtonContextProvider = ({children}) => {
    const [searchButtonInformation, setsearchButtonInformation] = useState(false)
    return(
        <SearchButtonContext.Provider value={{searchButtonInformation,setsearchButtonInformation}}>
            {
                children
            }
        </SearchButtonContext.Provider>
    )
};


