import { PatContext } from "@/context/pat-context-provider";
import { useContext } from "react";

export function usePatContext(){
    const context = useContext(PatContext)
    if (!context){
        throw new Error('usePatContext must be used withing a PatContextProvider')
    }
    return context
}
