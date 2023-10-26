import React from 'react'
import { Sidebar } from './Sidebar'
import Activepages from './Activepages'

export const Mainpage = () => {
  return (


    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full  relative">
        <Activepages />
      </div>
    </div>
  )
}
