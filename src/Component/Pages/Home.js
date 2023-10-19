import React, { useEffect } from 'react'
import { useUserAuth } from '../../Firebase/Userauth';

export const Home = () => {

  const {user} = useUserAuth();




  useEffect(()=>{
    document.title = 'Feed'
    console.log(user)
  })
  return (
    <div>Home</div>
  )
}
