"use client"
import { usePatContext } from "@/lib/hooks";
import { Pat } from "@/lib/types";
import Image from "next/image";
import PatButton from "./pat-button";


export default function PatDetails() {

  const {selectedPat} = usePatContext()

  return (
    <section className="h-full w-full flex flex-col ">
      {
        !selectedPat ?
            <EmptyView/> 
        :(
          <>
            <TopBar selectedPat={selectedPat}/>

            <OtherInfo selectedPat={selectedPat}/>

            <Notes selectedPat={selectedPat}/>
          </>
        )}

    </section>  
  )
}

type Props ={
  selectedPat : Pat;
}

function TopBar({selectedPat}: Props){
  const {handleCheckoutPat} = usePatContext()
  return (
    <div className="flex items-center px-8 py-5 bg-white border-b-black/[0.08]">
        <Image src={selectedPat?.imageUrl} alt="selected-img" width={75} height={75} className="h-[55px] w-[55px] rounded-full object-cover" />
        <h2 className="text-2xl font-semibold leading-7 ml-5">{selectedPat?.name}</h2>

        <div className="ml-auto space-x-2">
          <PatButton actionType="edit">Edit</PatButton>
          <PatButton onClick={() =>{handleCheckoutPat(selectedPat?.id)}} actionType="checkout">Checkout</PatButton>
        </div>
  </div>
)
}

function OtherInfo({selectedPat} : Props){
  return (
    <div className="flex justify-around py-5 px-5 text-center ">
    <div>
      <h3 className="text-[13px] font-medium uppercase text-zinc-700">Owner Name</h3>
      <p className="mt-1 text-md text-zinc-800">{selectedPat?.ownerName}</p>
    </div>
    <div className="">
      <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
      <p className="mt-1 text-md text-zinc-800">{selectedPat?.age}</p>
    </div>
  </div>
  )
}

function Notes({selectedPat} : Props){
  return (
    <section className="bg-white px-7 py-5 border text-black rounded-md mb-9 mx-8 flex-1 border-light">
      {selectedPat?.notes}
    </section>
  )
}


function EmptyView(){
  return (<p className=" h-full flex items-center justify-center text-sm font-light"> No Patient Selected</p>)
}