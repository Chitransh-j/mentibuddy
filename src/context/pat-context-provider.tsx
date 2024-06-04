"use client"
import checkoutPat, { addPat, editPat } from '@/actions/actions'
import { Pat } from '@/lib/types'
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
    selectedPatId : string | null,
    selectedPat : Pat | undefined,
    noofpat : number,
    //handlers
    handleAddPat : (newPat:Omit<Pat,'id'>) => Promise<void>,
    handleEditPat : (patid:string,newPatData:Omit<Pat,'id'>) => Promise<void>,
    handleCheckoutPat : (id:string) => Promise<void>,
    handleChangeSelectedPatId : (id:string) => void
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
    const handleAddPat = async (newPatData : Omit<Pat,'id'>) =>{

      setOptimisticPats({action:'add',payload :newPatData})

      const error  =  await addPat(newPatData)
        if (error){
          toast.warning(error.message)
          return
        }
    }

    const handleEditPat = async (patid : string ,newPatData:Omit<Pat,'id'>) =>{

      setOptimisticPats({action:'edit',payload :{patid,newPatData}})
      const error = await editPat(patid,newPatData)
        if (error){
          toast.warning(error.message)
          return 
        }
    }

    const handleCheckoutPat = async (patid:string) =>{
        setOptimisticPats({action:'checkout',payload :{patid}})
        await checkoutPat(patid)
        setSelectedPatId(null) // to make sure we return to the empty view
    }

    const handleChangeSelectedPatId = (id:string) =>{
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

