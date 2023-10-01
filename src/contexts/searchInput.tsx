import {ReactNode, createContext, useState} from 'react';

interface ISearchInput{
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

interface IChildren{
    children: ReactNode;
}

export const SearchInputContext = createContext({} as ISearchInput)

export function SearchInputProvider({children}: IChildren) {
    const [searchInput, setSearchInput] = useState<string>('');

    return(
        <SearchInputContext.Provider value={{searchInput, setSearchInput}}>
            {children}
        </SearchInputContext.Provider>
    )
}