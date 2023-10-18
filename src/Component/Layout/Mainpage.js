import React from 'react'
import { Sidebar } from './Sidebar'
import Activepages from './Activepages'

export const Mainpage = () => {
  return (


    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full bg-[#F9FCFF] relative">
        <Activepages />
      </div>
    </div>
  )
}
