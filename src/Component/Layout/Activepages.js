import React from 'react'
import { useParams } from 'react-router-dom'

import { Home } from '../Pages/Home';
import { Profile } from '../Pages/Profile';
import { Create } from '../Pages/Create';

const Activepages = () => {
  const params = useParams();
  const activeScreens = params.screens
  
  const activeRoutes = {
    home:<Home/>,
    profile:<Profile/>,
    create:<Create/>
  }
  return (
    <div className=' ml-[200px]'> 
     {activeRoutes[activeScreens] || <Home/>}
    </div>
  )
}

export default Activepages