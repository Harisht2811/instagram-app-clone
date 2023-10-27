import React from 'react'
import Gradient from '../../Assests/Gradientsucess.png'
export const Successpost = () => {
    return (
        <div className='absolute top-[100px] left-[600px]'>
            <div className='bg-white w-[800px] h-[800px] rounded-md shadow-lg py-3 relative'>
                <div className='border border-b-gray-300 border-t-0 border-r-0 border-l-0  '>
                    <p className='text-[14px] font-bold '>Post shared</p>
                </div>
                <div className='absolute left-[300px] top-[300px] '>
                    <img src={Gradient} alt='gradient-success' className='ml-4'></img>
                    <p className=' text-[22px] mt-3 -ml-8'>Your post has been shared</p>
                </div>
            </div>
        </div>
    )
}
