import { cn } from '@/lib/utils';
import React from 'react'
type H1props = {
  children: React.ReactNode;
  className?: string
}

export default function H1( {children,className} : H1props) {
  return (
    <h1 className={cn(`font-medium text-xl leading-6`,className)}>{children}</h1>
  )
}
