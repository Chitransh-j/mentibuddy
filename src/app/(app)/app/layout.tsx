import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import { Toaster } from "@/components/ui/sonner";
import PatContextProvider from "@/context/pat-context-provider";
import SearchContextProvider from "@/context/search-context-provider";
import prisma from "@/lib/db";

export default async function layout( {children} : {children : React.ReactNode}) {

  const data = await prisma.pat.findMany({
    //where clause
  })
  
  // console.log(data.length)
  return (
    <>
      <BackgroundPattern/>
      <div className="max-w-[1050px] mx-auto px-4 flex flex-col min-h-screen">
        <AppHeader/>
        <SearchContextProvider>
        <PatContextProvider data={data}>
          {children}
        </PatContextProvider> 
        </SearchContextProvider>
        <AppFooter/>
      </div>
      
      <Toaster position='top-right' />
    </>
  )
}
