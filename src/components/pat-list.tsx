"use client"
import { usePatContext, useSearchContext } from "@/lib/hooks";
import { Pat } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";



export default function PatList( ) {
  const {pats,selectedPatId,handleChangeSelectedPatId} = usePatContext()
  const {searchQuery} = useSearchContext()

  const filteredPats = pats.filter( (pat) => pat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {
        filteredPats.map( (pat) => (
          <li key={pat.id}>
            <button onClick={()=>handleChangeSelectedPatId(pat.id)} className={cn("flex h-[70px] w-full cursor-pointer items-center gap-2 px-5 text-base hover:bg-[#eff1f2]  transition",{

              'bg-[#eff1f2]' : selectedPatId === pat.id,

            })}>
              <Image src={pat.imageUrl}  width={45} height={45} alt="pat image"
              className="w-[45px] h-[45px] rounded-full object-cover"
              />
              <p className="font-semibold">{pat.name}</p> 
            </button>
        </li>
        ) )
      }
    </ul> 
  )
}
