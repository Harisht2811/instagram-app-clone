import React from 'react'
import Saveinformation from '../../Assests/saveloginlogo.png'
import { useNavigate } from 'react-router-dom'

export const SaveInfo = () => {
    const navigate = useNavigate();
    
  

    const saveUser = () => {
        navigate('/home')
    }

    return (
        <div className='ml-[650px] mt-[20%]'>
            <div className='h-[300px] w-[350px] border border-gray-300 p-2'>
                <img className='ml-[35%]' alt='save-login' src={Saveinformation}></img>
                <p className='text-black font-bold text-[14px]'>Save your login information?</p>
                <p className='text-gray-500 text-[14px] text-center mt-2 w-[70%] ml-12'>We can save your login information on this browser so that you won't need to enter it again.</p>
                <button className='mt-3 bg-blue-500 h-[30px] w-[250px] rounded-md text-[14px] font-semibold text-white hover:bg-blue-600' onClick={saveUser}>Save information</button>
                <p className='text-blue-400 text-[16px] font-bold mt-3'><a href='/home' >Not now</a></p>
            </div>
        </div>
    )
}
