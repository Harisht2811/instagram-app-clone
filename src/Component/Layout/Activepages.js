import React from 'react'
import { useParams } from 'react-router-dom'

import {Home} from '../Pages/Home';
import { Profile } from '../Pages/Profile';

const Activepages = () => {
  const params = useParams();
  const activeScreens = params.screens
  // console.log(activeScreens)
  
  const activeRoutes = {
    home:<Home/>,
    profile:<Profile/>
  }
  return (
    <div className=' ml-[200px]'> 
     {activeRoutes[activeScreens] || <Home/>}
    </div>
  )
}

export default Activepages