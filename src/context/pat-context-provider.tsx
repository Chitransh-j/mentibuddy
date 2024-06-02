"use client"
import { Pat } from '@/lib/types'
import React, { useState } from 'react'
import { createContext } from 'react'

type PatContextProviderProps = {
    data : Pat[],
    children : React.ReactNode
}

type TPatContext = {
    pats : Pat[],
    selectedPatId : string | null,
    handleChangeSelectedPatId : (id:string) => void
    selectedPat : Pat | undefined
}

export const PatContext = createContext<TPatContext | null>(null)

export default function PatContextProvider({data,children} : PatContextProviderProps )  {
    //actual states
    const [pats, setPats] =useState(data)
    const [selectedPatId, setSelectedPatId] = useState<string | null>(null)
    
    //derived states
    const selectedPat = pats.find((pat) => pat.id === selectedPatId)
    
    //event handlers
    const handleChangeSelectedPatId = (id:string) =>{
        setSelectedPatId(id)
    }

  return (
    <PatContext.Provider value={{
        pats,
        selectedPatId,
        handleChangeSelectedPatId,
        selectedPat
        }} >
      {children}
    </PatContext.Provider>
  )
}
