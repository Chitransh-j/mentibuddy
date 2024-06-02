"use client"

import { usePatContext } from '@/lib/hooks'
import React from 'react'


export default function Stats() {
  const {noofpat} = usePatContext()

  return (
    <section className='text-center'>
          <p className='text-xl font-bold leading-6'>{noofpat}</p>
          <p className='opacity-80'>Current Patients</p>
    </section>
  )
}
