import Branding from '@/components/branding'
import ContentBlock from '@/components/content-block'
import PatButton from '@/components/pat-button'
import PatDetails from '@/components/pat-details'
import PatList from '@/components/pat-list'
import SearchForm from '@/components/search-form'
import Stats from '@/components/stats'
import React from 'react'

const Dashboard = async () => {

  return (
    <main>
      <div className='flex justify-between items-center text-white py-4'>
        <Branding/>
        <Stats/>
      </div>

      <div className='grid md:grid-cols-3 md:grid-rows-[45px_1fr] grid-rows-[45px_300px_400px] gap-4 md:h-[400px]'>
        <div className='md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1'>
        <SearchForm />
        </div>
 
        <div className='relative md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1'>
        <ContentBlock>
          <PatList />
          <div className='absolute bottom-4 right-4'>
          <PatButton actionType="add">{''}</PatButton>
          </div>
        </ContentBlock>
        </div>
        
        <div className='md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full'>
        <ContentBlock>
          <PatDetails/>
        </ContentBlock>
        </div>
      </div>
    </main>
  )
}

export default Dashboard
