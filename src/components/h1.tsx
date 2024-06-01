import React from 'react'

export default function H1( {children} : {children: React.ReactNode}) {
  return (
    <h1 className='font-medium text-xl leading-6'>{children}</h1>
  )
}
