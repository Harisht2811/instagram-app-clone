import React, { useEffect } from 'react'

export const Home = () => {


  useEffect(() => {
    document.title = 'Feed'
  })
  
  return (
    <div>Home</div>
  )
}
