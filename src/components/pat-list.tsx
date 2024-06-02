"use client"
import { usePatContext } from "@/lib/hooks";
import { Pat } from "@/lib/types";
import Image from "next/image";



export default function PatList( ) {
  const {pats} = usePatContext()
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {
        pats.map( (pat) => (
          <li key={pat.id}>
            <button className="flex h-[70px] w-full cursor-pointer items-center gap-2 px-5 text-base hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition">
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
