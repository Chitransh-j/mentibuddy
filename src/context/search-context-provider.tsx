"use client"
import React, { useState } from 'react'
import { createContext } from 'react'

type SearchContextProviderProps = {
    children : React.ReactNode
}

type TSearchContext = {
    searchQuery:string;
    handleChangeSearchQuery : (newValue:string) => void;
}

export const SearchContext = createContext<TSearchContext | null>(null)

export default function SearchContextProvider({children} : SearchContextProviderProps )  {
    //states
    const [searchQuery,setSearchQuery] = useState("")
    
    //derived states


    //event handlers/actions
    const handleChangeSearchQuery = (newValue:string ) =>{
        setSearchQuery(newValue)
    }
  return (
    <SearchContext.Provider value={{
        searchQuery,
        handleChangeSearchQuery
        }} >
      {children}
    </SearchContext.Provider>
  )
}
