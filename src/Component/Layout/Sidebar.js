import React from 'react'
import { Sidebardata } from '../../Utils/Sidebardata'
import Instatext from '../../Assests/insta-text.png'
import Logout from '../../Assests/logout-50.png'
import { useNavigate, useParams } from 'react-router-dom'
import { auth } from '../../Firebase/Firebaseconfig'
import { useUserAuth } from '../../Firebase/Userauth'
import { toast } from 'react-hot-toast'
import { supabase } from '../../Supabase/Supabase'
// import { useUserAuth } from '../../Firebase/Userauth'


export const Sidebar = () => {

  const navigate = useNavigate();
  const {signoutWithEmailAndPassword} = useUserAuth();
  const params = useParams();
  const { screens } = params



  const selectedPage = (route) => {
    navigate(route.routeName)
  }

  const handleLogout = async() =>{

       
       const { error } = await supabase.auth.signOut()
       console.log('signout',error)
       toast.success('User logged out')
       navigate('/')

  }

  return (
    <div>
      <div className='bg-white w-[275px] h-full border border-r-gray-300  py-2 px-4  -ml-2 fixed z-[1]'>
        <div className='text-center ml-4 '>
        </div>
        <img className=' mt-[4%] ' src={Instatext} alt='logo-text'></img>
        <div className='mt-[15%]'>
          {
            Sidebardata.map((items, index) => {
              return (
                <div
                  className="flex mt-[6%] py-2 px-3 w-[250px] rounded-md opacity-[1px]  hover:bg-gray-100 cursor-pointer"
                  key={index}
                  onClick={() => { selectedPage(items) }}
                >
                  <img className='h-[30px] w-[30px]   ' src={items.routeName.includes(screens) ? items.activeicon : items.icon} alt='side-icons'></img>
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
        <div
          className='flex py-2 px-2 absolute bottom-4 w-[250px] hover:bg-gray-100 rounded-md opacity-[1px] cursor-pointer'
          onClick={handleLogout}
        >
          <img className='h-[30px] w-[30px]' src={Logout} alt='side-icons'></img>
          <div className='text-gray-900 text-[18px] ml-[10%] cursor-pointerr' >Log out</div>
        </div>
      </div>
    </div>
  )
}
