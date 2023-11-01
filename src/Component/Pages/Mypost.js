import React, { useEffect, useState } from 'react'
import { GetUserPost, GetUserByEmail } from '../../Functions/Supafunctions'
import Share from '../../Assests/share.png'

export const Mypost = () => {

  const email = window.sessionStorage.getItem('email');

  const [userPosts, setUserPosts] = useState([]);
  const [isuserPosts, setisUserPosts] = useState(false);


  useEffect(() => {
    (async () => {
      const currentUserData = await GetUserByEmail(email);
      let user_name = currentUserData[0]
      const userPostData = await GetUserPost(user_name.username);
      if (userPostData.length === 0) {
        setisUserPosts(false)
      }
      else {
        setisUserPosts(true)
      }
      setUserPosts(userPostData)
    })();

  }, [])
  console.log(isuserPosts);
  return (
    <div>
      {

        isuserPosts ?
          <div className='grid grid-cols-3 mt-6'>
            {
              userPosts.map((post, index) => {
                return (
                  <>
                    <img key={index} src={post.imageurl} className='w-[300px] h-[300px] ml-2 cursor-pointer hover:opacity-50'></img>
                  </>
                )
              })
            }
          </div> :
          <div className='w-[60%]  mt-12'>
            <a href='/create'><img src={Share} alt='share' className='cursor-pointer ml-[44%]'></img></a>
            <p className='text-[28px] font-bold mt-4'>Share  photos</p>
            <p className='text-[14px] mt-2'>When you share photos, they will appear on your profile.</p>
            <a href='/create'><p className='text-[14px] font-bold text-blue-500 mt-2 cursor-pointer'>share your first photo</p></a>
          </div>

      }


    </div>
  )
}
