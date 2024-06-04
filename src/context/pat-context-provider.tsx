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
    handleCheckoutPat : (id:string) => void
    selectedPat : Pat | undefined
    noofpat : number
    handleAddPat : (newPat:Omit<Pat,'id'>) => void
    handleEditPat: (patid:string,newPatData:Omit<Pat,'id'>) => void
}

export const PatContext = createContext<TPatContext | null>(null)

export default function PatContextProvider({data,children} : PatContextProviderProps )  {
    //actual states
    const [pats, setPats] =useState(data)
    const [selectedPatId, setSelectedPatId] = useState<string | null>(null)
    
    //derived states
    const selectedPat = pats.find((pat) => pat.id === selectedPatId)
    const noofpat =pats.length

    //event handlers /actions
    const handleAddPat = (newPat : Omit<Pat,'id'>) =>{
      setPats((prev) =>[
        ...prev,{
        id:Date.now().toString(),
        ...newPat,
      }])
    }

    const handleChangeSelectedPatId = (id:string) =>{
        setSelectedPatId(id)
    } 

    const handleEditPat = (patid:string,newPatData:Omit<Pat,'id'>) =>{

      setPats( (prev)=> prev.map((pat) => {
        if (pat.id===patid){
          return {
            id:patid,
            ...newPatData
          }
        }
        else{
          return pat
        }
      }))

    }

    const handleCheckoutPat = (id:string) =>{
      setPats( pats => pats.filter((pat) => pat.id !== id))
      setSelectedPatId(null) // to make sure we return to the empty view
    }

  return (
    <PatContext.Provider value={{
        pats,
        selectedPatId,
        handleChangeSelectedPatId,
        handleCheckoutPat,
        selectedPat,
        noofpat,
        handleEditPat,
        handleAddPat
        }} >
      {children}
    </PatContext.Provider>
  )
}
