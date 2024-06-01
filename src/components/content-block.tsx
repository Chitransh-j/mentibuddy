import React from 'react'

export default function ContentBlock({children} : {children : React.ReactNode}) {
  return (
    <div className='bg-[rgb(247,248,250)] shadow-sm rounded-md overflow-hidden h-full w-full'>
      {children}
    </div>
  )
}
