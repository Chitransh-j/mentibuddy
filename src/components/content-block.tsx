import { cn } from '@/lib/utils'
import React from 'react'

type ContentBlockProps = {
  children: React.ReactNode;
  className?: string;
}

export default function ContentBlock({children,className} : ContentBlockProps) {
  return (
    <div className={cn('bg-[rgb(247,248,250)] shadow-sm rounded-md w-full h-full ',className)}>
      {children}
    </div>
  )
}
