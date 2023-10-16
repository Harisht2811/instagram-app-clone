import React from 'react'
import { Sidebardata } from '../../Utils/Sidebardata'
import Instatext from '../../Assests/insta-text.png'
import { useNavigate, useParams } from 'react-router-dom'
// import { useUserAuth } from '../../Firebase/Userauth'


export const Sidebar = () => {

  const navigate = useNavigate();
  const params = useParams();
  const { screens } = params



  const selectedPage = (route) => {
    navigate(route.routeName)
  }


  return (
    <div>
      <div className='bg-white w-[300px] h-full border border-r-gray-300  py-2 px-4 relative -ml-2'>
        <div className='text-center ml-4 '>
        </div>
        <img className=' mt-[4%] ml-[8%] ' src={Instatext} alt='logo-text'></img>
        <div className='mt-[15%]'>
          {
            Sidebardata.map((items, index) => {
              return (
                <div
                  className="flex mt-[6%] py-2 px-2 w-[250px] rounded-md opacity-[1px]"
                  key={index}
                  onClick={() => { selectedPage(items) }}
                >
                  <img className='h-[30px] w-[30px]' src={items.routeName.includes(screens) ? items.activeicon : items.icon} alt='side-icons'></img>
                  <p
                    className=
                    {`${items.routeName.includes(screens) ||
                      (!screens && items["routeName"] === "home")
                      ? "text-gray-900 text-[18px] font-Poppins font-bold ml-[10%] cursor-pointer"
                      : 'text-black text-[18px] font-Poppins font-[300] ml-[10%] cursor-pointer'
                      } `}
                  >{items.name}</p>
                </div>
              )
            })
          }
        </div>
        {/* <div
          className='flex py-2 px-2 absolute bottom-4 w-[250px] hover:bg-gray-600 rounded-md opacity-[1px] cursor-pointer'
        >
          <img className='h-[30px] w-[20px]' src={Logo} alt='side-icons'></img>
          <div className='text-white text-[18px] font-Poppins font-[500] ml-[10%] cursor-pointer'>Log out</div>
        </div> */}
      </div>
    </div>
  )
}
