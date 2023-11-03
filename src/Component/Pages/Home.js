import React, { useEffect, useState } from 'react'
import { GetNotUserPost, GetUserByEmail, GetUser, UpdateLikes } from '../../Functions/Supafunctions'
import User from '../../Assests/user.png'
import Threedots from '../../Assests/three-dots.png'
import Heart from '../../Assests/heart-50.png'
import Redheart from '../../Assests/heart.png'
import Comment from '../../Assests/chat.png'
import Message from '../../Assests/send-50.png'
import Save from '../../Assests/save.svg'



export const Home = () => {

  const [feed, setFeed] = useState([]);
  const [Profile, setProfile] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [currentUser, setCurrentuser] = useState('');
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState('');



  const email = window.sessionStorage.getItem('email')

  useEffect(() => {
    document.title = 'Feed';
    (async () => {
      const currentUserData = await GetUserByEmail(email);
      let user_name = currentUserData[0].username
      setCurrentuser(user_name)
      const feedData = await GetNotUserPost(user_name);
      const profile_image = await GetUser();
      setProfile(profile_image)
      setFeed(feedData)
    })();
  }, [email, currentUser, likes])

  // const getLikes = async(id,post)=>{
  //    const likeData = await UpdateLikes(post.id);
  //    console.log(likeData)
  // }

  const LikePost = async (e, postdata) => {
    e.preventDefault();
    const newLike = {
      postid: postdata.id,
      username: currentUser,
    }
    setIsLiked(newLike)
    setLikes([...likes, newLike])
    const like = await UpdateLikes(newLike, postdata.id);
  }

  const unLikePost = (e) => {
    e.preventDefault();
    let newLike = likes.filter(deleteLike => deleteLike.username !== currentUser)
    setIsLiked(false)
    setLikes(newLike)
  }
  console.log(likes)

  return (
    <div className=' absolute top-[50px] left-[600px] flex  w-[65%]'>
      <div>


        <div className='flex -ml-10 '>

          {
            Profile.map((user, index) => {

              if (user.username !== currentUser) {
                return (
                  <div className='block ml-4 '>
                    <div className='h-[60px] w-[60px] rounded-full cursor-pointer bg-gradient-to-r from-yellow-500 via-red-500   to-pink-700 p-[2.3px]'>
                      <div class="h-[55px] w-[55px] bg-white rounded-full  p-[1.3px]">
                        <img
                          key={index}
                          src={user.profileimage != null ? user.profileimage : User}
                          alt='user_profile'
                          className='h-[52px] w-[52px]  rounded-full '
                        >
                        </img>
                      </div>

                    </div>

                    <p className='text-[11px] mt-2'>{user.username}</p>
                  </div>
                )
              }
            })
          }

        </div>
        {
          feed.map((data, index) => {
            console.log(feed)
            return (
              <div key={index} className={'h-[830px] w-[480px] border border-t-0 border-r-0 border-l-0 border-gray-300 mb-[2%] py-2'}>
                <div className='flex py-4 w-[100%]'>
                  <div className='flex w-[79%]'>
                    <div>
                      {
                        Profile.map((user_profile, PIndex) => {
                          if (user_profile.username === data.username) {
                            return (
                              <>
                                <img
                                  key={PIndex}
                                  src={user_profile.profileimage != null ? user_profile.profileimage : User}
                                  alt='user_profile'
                                  className='h-[40px] w-[40px] rounded-full cursor-pointer'
                                >
                                </img>
                              </>
                            )
                          }
                          return null;
                        })

                      }
                    </div>

                    <p className='text-black text-[16px] font-bold ml-4 mt-2 cursor-pointer'>{data.username}</p>
                  </div>
                  <div className='w-[21%]'>
                    <img src={Threedots} className='h-[20px] w-[20px] ml-20 mt-3 cursor-pointer' alt='three-dots'></img>
                  </div>
                </div>
                <img src={data.imageurl} className='h-[600px] w-[480px]' alt='feed-images'></img>

                <div className='w-[100%] flex  py-4'>
                  <div className='flex w-[90%]'>
                    {
                      currentUser && isLiked ?
                        <img src={Redheart} alt='like' className='h-[25px] w-[25px] cursor-pointer hover:opacity-25' onClick={(e) => unLikePost(e)}></img>
                        : <img src={Heart} alt='like' className='h-[25px] w-[25px] cursor-pointer hover:opacity-25' onClick={(e) => { LikePost(e, data) }}></img>

                    }
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
                <div className='flex'>
                  <input type='text' onChange={(e) => { setComments(e.target.value) }} className='w-[480px] py-4 h-[10px] text-left outline-none text-[16px]' placeholder='Add a Comment...'></input>
                  {
                    comments.length > 0 && <p className='text-[14px] font-bold text-blue-500 cursor-pointer'>Post</p>
                  }
                </div>

              </div>
            )
          })
        }
      </div>
    
      <div className='mt-2 ml-[7%] w-[75%]'>
        <div className='flex w-[100%]'>
          {
            Profile.map((user, PIndex) => {
              if (user.username === currentUser) {
                return (
                  <>
                    <div className='flex w-[50%]'>
                      <img
                        key={PIndex}
                        src={user.profileimage != null ? user.profileimage : User}
                        alt='user_profile'
                        className='h-[40px] w-[40px] rounded-full cursor-pointer'
                      >
                      </img>
                      <p className='ml-2 mt-2 text-[12px] font-semibold'>{user.username}</p>
                    </div >
                    <div className='w-[50%]'>
                      <p className='text-blue-400 font-bold text-[14px] mt-2 text-left cursor-pointer'>Switch</p>
                    </div>
                  </>

                )
              }
              return null;
            })

          }

        </div>
        <div className='flex mt-8 '>
        <p className='w-[50%] text-left text-[16px] text-gray-500 font-bold'>Suggested for you</p>
        <p className='text-left w-[50%] font-bold text-[12px]'>See All</p>
      </div>
        <div className='block mt-8 '>
          {
            Profile.map((follwusers,ind)=>{
              if(follwusers.username!=currentUser){
                return(
                  <div className='flex w-[100%]  mb-4'>
                      <div className='flex w-[50%]'>
                        <img src={follwusers.profileimage!=null?follwusers.profileimage:User}
                        className='h-[40px] w-[40px] rounded-full cursor-pointer'
                        alt='follwusers'
                        ></img>
                         <p className='ml-2 mt-2 text-[12px] font-semibold'>{follwusers.username}</p>
                        </div>
                       
                      <div className='w-[50%]'>
                        <p className='text-blue-400 font-bold text-[14px] mt-2 text-left cursor-pointer hover:text-blue-900'>Follow</p>
                        </div>
                  </div>
                )
              }
            })
          }
        </div>
       </div>

    </div >

  )
}
