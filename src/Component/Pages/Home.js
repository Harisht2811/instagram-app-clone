import React, { useEffect, useState } from 'react'
import { GetUserPost, GetUserByEmail, GetUserProfile, GetUser } from '../../Functions/Supafunctions'
import User from '../../Assests/user.png'
import Threedots from '../../Assests/three-dots.png'
import Heart from '../../Assests/heart-50.png'
import Comment from '../../Assests/chat.png'
import Message from '../../Assests/send-50.png'
import Save from '../../Assests/save.svg'



export const Home = () => {

  const [feed, setFeed] = useState([]);
  const [Profile, setProfile] = useState('');



  const email = window.sessionStorage.getItem('email')

  useEffect(() => {
    document.title = 'Feed';
    (async () => {
      const currentUserData = await GetUserByEmail(email);
      let user_name = currentUserData[0].username
      const feedData = await GetUserPost(user_name);
      const profile_image = await GetUser();
      setProfile(profile_image)
      // feedData.map(async (item, index) => {
      //   let data = await GetUserProfile(item.username)
      //   setProfile(data[0])
      // })
      setFeed(feedData)
    })();
  }, [email])

  return (
    <div className=' absolute top-[100px] left-[600px] h-full'>
      {
        feed.map((data, index) => {

          return (
            <div key={index} className={`${index === 0 ? 'h-[700px] w-[480px] border border-t-0 border-b-gray-300 border-l-0 border-r-0 mb-[30%] py-2' : 'h-[700px] w-[480px] border border-t-gray-300 border-b-gray-300 border-l-0 border-r-0 mb-[30%] py-2'}`}>
              <div className='flex py-4 w-[100%]'>
                <div className='flex w-[79%]'>
                  <div>
                    {
                      Profile.map((user_profile, PIndex) => {
                        if (user_profile.username === data.username) {
                          return <img
                            key={PIndex}
                            src={user_profile.profileimage}
                            alt='user_profile'
                            className='h-[40px] w-[40px] rounded-full cursor-pointer'
                          // className={`${user_profile.username === data.username  ? 'h-[40px] w-[40px] rounded-full cursor-pointer' : "h-[40px] w-[40px] cursor-pointer"}`} 
                          >
                          </img>
                        }
                      })
                    }
                  </div>

                  <p className='text-black text-[16px] font-bold ml-4 mt-2 cursor-pointer'>{data.username}</p>
                </div>
                <div className='w-[21%]'>
                  <img src={Threedots} className='h-[20px] w-[20px] ml-20 mt-3 cursor-pointer' alt='three-dots'></img>
                </div>
              </div>
              <img src={data.imageurl} className='h-[650px] w-[480px]' alt='feed-images'></img>

              <div className='w-[100%] flex  py-4'>
                <div className='flex w-[90%]'>
                  <img src={Heart} alt='like' className='h-[25px] w-[25px] cursor-pointer hover:opacity-25'></img>
                  <img src={Comment} alt='Comment' className='h-[22px] w-[22px] ml-4 cursor-pointer hover:opacity-25 '></img>
                  <img src={Message} alt='Message' className='h-[24px] w-[24px] ml-4 cursor-pointer hover:opacity-25 rotate-6'></img>
                </div>
                <div className='w-[10%]'>
                  <img src={Save} alt='Message' className='h-[25px] w-[25px] cursor-pointer ml-7 hover:opacity-25'></img>
                </div>
              </div>
              <div className=' w-[100%] py-2'>
                <p className='text-black text-left text-[16px] font-bold'>{data.username}<span className='text-black text-[16px] font-normal ml-2 '>{data.caption}</span></p>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}
