import React from 'react'
import { Sidebar } from './Sidebar'
import Activepages from './Activepages'

export const Mainpage=() =>{
  return (
    <div>
        <div className='flex bg-white h-[100vh] w-[100%] py-0 px-2'>
            <Sidebar/>
            <Activepages/>
        </div>
    </div>
  )
}
