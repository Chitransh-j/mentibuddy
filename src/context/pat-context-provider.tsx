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
    selectedPatId : string | null
}

export const PatContext = createContext<TPatContext | null>(null)

export default function PatContextProvider({data,children} : PatContextProviderProps )  {

    const [pats, setPats] =useState(data)
    const [selectedPatId, setSelectedPatId] = useState(null)

  return (
    <PatContext.Provider value={{
        pats,
        selectedPatId 
        }} >
      {children}
    </PatContext.Provider>
  )
}
