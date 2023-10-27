import React from 'react'
import { Sidebar } from './Sidebar'
import Activepages from './Activepages'

export const Mainpage = () => {
  return (


    <div className="flex ">
      <Sidebar />
      <div className='w-full' >
        <Activepages />
      </div>
    </div>
  )
}
