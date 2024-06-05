"use client"
import checkoutPat, { addPat, editPat } from '@/actions/actions'
import { PatEssentials } from '@/lib/types'
import { Pat } from '@prisma/client'
import React, {useOptimistic, useState } from 'react'
import { createContext } from 'react'
import { toast } from 'sonner'

type PatContextProviderProps = {
    data : Pat[],
    children : React.ReactNode
}

type TPatContext = {
    //methods
    optimisticPats : Pat[],
    pats: Pat[],
    selectedPatId : Pat['id'] | null,
    selectedPat : Pat | undefined,
    noofpat : number,
    //handlers
    handleAddPat : (newPat: PatEssentials) => Promise<void>,
    handleEditPat : (patid:Pat['id'],newPatData:PatEssentials) => Promise<void>,
    handleCheckoutPat : (id:Pat['id']) => Promise<void>,
    handleChangeSelectedPatId : (id:Pat['id']) => void
}

export const PatContext = createContext<TPatContext | null>(null)

export default function PatContextProvider({data,children} : PatContextProviderProps )  {

    //actual states
    const [optimisticPats,setOptimisticPats] = useOptimistic(data,

        (prev,{action,payload}) => {
          switch(action){
            case 'add':
              return [...prev,{...payload,id:Math.random().toString()}] 

            case 'edit':
              return prev.map((pat)=>{
                if(pat.id === payload.patid){
                  return {...pat,...payload.newPatData}
                }
                return pat
              })

            case 'checkout':
              return prev.filter((pat)=> pat.id !== payload.patid)
              
            default:
              return prev
          }
        })


    const [selectedPatId, setSelectedPatId] = useState<string | null>(null)
    
    //derived states

    const selectedPat = optimisticPats.find((pat) => pat.id === selectedPatId)
    const noofpat = optimisticPats.length

    //event handlers /actions
    const handleAddPat = async (newPatData : PatEssentials) =>{

      setOptimisticPats({action:'add',payload :newPatData})

      const error  =  await addPat(newPatData)
        if (error){
          toast.warning(error.message)
          return
        }
    }

    const handleEditPat = async (patid : Pat['id'] ,newPatData:PatEssentials) =>{

      setOptimisticPats({action:'edit',payload :{patid,newPatData}})
      const error = await editPat(patid,newPatData)
        if (error){
          toast.warning(error.message)
          return 
        }
    }

    const handleCheckoutPat = async (patid:Pat['id']) =>{
        setOptimisticPats({action:'checkout',payload :{patid}})
        await checkoutPat(patid)
        setSelectedPatId(null) // to make sure we return to the empty view
    }

    const handleChangeSelectedPatId = (id:Pat['id']) =>{
      setSelectedPatId(id)
    } 

  return (
    <PatContext.Provider value={{
        pats : optimisticPats ,
        optimisticPats,
        selectedPatId,
        handleChangeSelectedPatId,
        handleCheckoutPat,
        handleEditPat,
        selectedPat,
        noofpat,
        handleAddPat
        }} >
      {children}
    </PatContext.Provider>
  )
}

