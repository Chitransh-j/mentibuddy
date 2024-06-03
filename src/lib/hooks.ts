import { PatContext } from "@/context/pat-context-provider";
import { SearchContext } from "@/context/search-context-provider";
import { useContext } from "react";

export function usePatContext(){
    const context = useContext(PatContext)
    if (!context){
        throw new Error('usePatContext must be used withing a PatContextProvider')
    }
    return context
}


export function useSearchContext(){
    const context= useContext(SearchContext)
    if (!context){
        throw new Error('useSearchContext must be used withing a SearchContextProvider')
    }

    return context
}