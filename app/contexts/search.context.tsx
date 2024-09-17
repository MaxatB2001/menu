import { ReactNode, createContext, useContext, useState } from "react";

type SearchContextProps = {
    searchText: string 
    setSearchText: (text: string) => void 
} 

const SearchContext = createContext<SearchContextProps | undefined>(undefined);


export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState("")

  return <SearchContext.Provider value={{searchText, setSearchText}}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
      throw new Error("useCart must be used within a CartProvider");
    }
    return context;
  };
  