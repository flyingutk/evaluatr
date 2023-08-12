import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider(props) {
    const [query, setQuery] = useState(undefined);
    const [suggestion, setSuggestions] = useState(undefined);
    function setQquery(q) {   
        setQuery(q)
    } 
    
    function setSsuggestions(q) {   
      setSuggestions(q)
  } 

    function clearQuery() {   
        setQuery(undefined)
    } 

    return (
        <SearchContext.Provider
          value={{query,
            setQquery,
            suggestion,setSsuggestions,
            clearQuery,setQuery}
          }
        >
          {props.children}
        </SearchContext.Provider>
      );
}
