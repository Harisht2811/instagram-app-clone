import React, { useEffect, useState } from 'react'
import Cross from '../../Assests/cross.png'
import Upload from '../../Assests/uploadicon.png'
import Leftarrow from '../../Assests/left-arrow-50.png'
import Aspectratio from '../../Assests/aspect-ratio-50.png'
import Zoom from '../../Assests/zoom-50.png'
import Addimage from '../../Assests/copy-24.png'
import { storage } from '../../Firebase/Firebaseconfig'
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { CreatePost, GetUserByEmail } from '../../Functions/Supafunctions'
import { Successpost } from './Successpost'
import User from '../../Assests/user.png'

export const Create = () => {

    const [isopenPop, setisShowOpenPop] = useState(true);
    const [openComment, setOpenComment] = useState(false);
    const [post, setPost] = useState(true);
    const [imageList, setImageList] = useState();
    const [caption, setCaption] = useState('');
    const [currentUser, setCurrentuser] = useState('');


    const email = window.sessionStorage.getItem('email')
    
    useEffect(() => {
        (async()=>{
         const currentUserData =   await GetUserByEmail(email);
         console.log(currentUserData)
         setCurrentuser(currentUserData)
        })()
        document.title = 'Create new post • Instagram'
      
        
    },[email])

    const handleChange = (e) => {
        setisShowOpenPop(!isopenPop)
        console.log(e)
        console.log(e.target.files[0])
        let url = e.target.files[0]
        try {
            if (url == null) return;

            const imageRef = ref(storage, `images/${url.name + v4()}`)

            uploadBytes(imageRef, url).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    // setImageList((prev) => [...prev, url]);
                    setImageList(url)

                })
            })
        }
        catch (err) {
            console.log(err)
        }



    }

    const sharePost = async () => {
        const postData = {
            username:currentUser[0].username,
            imageurl:imageList,
            caption:caption
        }
        await CreatePost(postData);
        setPost(false)
        
        setCaption('')
    }

    return (
        <div>


            {
                post?
                <div>

                {
                    !isopenPop ?
                        <div className=' w-[100%] h-[100vh] relative p-10'>
                            <a href='/home'> <img src={Cross} alt='cross' className='cursor-pointer right-5 absolute'></img></a>
                            <div className='flex absolute top-[100px] left-[300px]'>
                                <div className=' bg-white w-[800px] h-[800px] rounded-xl shadow-md py-3 '>
                                    <div className='border border-b-gray-300 border-t-0 border-r-0 border-l-0 py-1 w-[100%]'>
                                        <img className='h-[32px] w-[30px] ml-5  cursor-pointer' src={Leftarrow} alt='black' onClick={() => { setisShowOpenPop(!isopenPop); setOpenComment(!openComment) }}></img>
                                        <p className='text-[14px] font-bold top-5 left-[375px] absolute'>{!openComment ? 'Crop' : 'Create new post'}</p>
                                        {
                                            !openComment ?
                                                <p className='absolute top-5 right-4 text-[14px] text-blue-500 font-bold cursor-pointer' onClick={() => { setOpenComment(!openComment) }}>Next</p>
                                                :
                                                <p className='absolute top-5 right-4 text-[14px] text-blue-500 font-bold cursor-pointer' onClick={sharePost}>Share</p>
                                        }
                                    </div>
                                    <div>
                                        {imageList &&
                                            <img src={imageList} alt='post-images' className='w-[850px] h-[750px] rounded-b-lg '></img>
    
                                        }
                                        {
                                            imageList && !openComment &&
                                            <div className='  w-[100%]'>
                                                <div className='w-[70%] flex ml-2'>
                                                    <div className='  p-3 rounded-full h-[45px] w-[45px] bg-gray-800 cursor-pointer hover:bg-opacity-50 ml-3 -mt-16'>
                                                        <img className='h-[20px] w-[20px]' src={Aspectratio} alt='icons'></img>
                                                    </div>
                                                    <div className='  p-3 rounded-full h-[45px] w-[45px] bg-gray-800 cursor-pointer hover:bg-opacity-50 ml-3 -mt-16'>
                                                        <img className='h-[20px] w-[20px]' src={Zoom} alt='icons'></img>
                                                    </div>
                                                </div>
                                                <div className='w-[30%]'>
                                                    <div className='absolute right-5  p-3 rounded-full h-[45px] w-[45px] bg-gray-800 cursor-pointer hover:bg-opacity-50 ml-3 -mt-16'>
                                                        <img className='h-[20px] w-[20px]' src={Addimage} alt='icons'></img>
                                                    </div>
                                                </div>
                                            </div>
                                        }
    
                                    </div>
                                </div>
                                {
                                    openComment ?
                                        <div className='bg-white rounded-r-lg shadow-md  w-[330px] h-[800px] py-5'>
                                            <div className=' border border-t-0 border-b-gray-300 border-r-0 border-l-0 py-4'>
                                            </div>
                                            <div className='flex p-4'>
                                                <img className='h-[25px] w-[25px] rounded-full ' src={currentUser[0].profileimage!==null?currentUser[0].profileimage:User}></img>
                                                <p className='text-left text-[14px] font-semibold ml-2 mt-1'>{currentUser[0].username}</p>
                                            </div>
                                            <div>
                                                 
                                                <textarea
                                                    className='w-[330px] h-[300px] p-3 outline-none border border-gray-300 border-t-0'
                                                    placeholder='Write a caption...'
                                                    value={caption}
                                                    onChange={(e) => { setCaption(e.target.value) }}
                                                >
                                                </textarea>
                                            </div>
                                        </div>
                                        : ''
                                }
                            </div>
    
                        </div> :
                        <div className=' w-[100%] h-[100vh] relative p-10 '>
                            <a href='/home'> <img src={Cross} alt='cross' className='cursor-pointer right-5 absolute'></img></a>
                            <div className='absolute top-[100px] left-[420px] bg-white w-[800px] h-[800px] rounded-xl shadow-md py-3 '>
                                <div className='border border-b-gray-300 border-t-0 border-r-0 border-l-0 py-3 '>
                                    <p className='text-[14px] font-bold '>Create new post</p>
                                </div>
                                <div className='absolute left-[330px] top-[300px] '>
                                    <img src={Upload} alt='upload' className='ml-4'></img>
                                    <p className=' text-[22px] mt-3 -ml-[45%]'>Drag photos and videos here</p>
                                    <div className='flex justify-between items-center  mt-[6%] cursor-pointer   text-white -ml-[13%]' >
                                        <label htmlFor="files"  className="text-white text-[15px] font-bold cursor-pointer p-2 rounded-md   hover:bg-blue-600  bg-blue-400 h-[40px] w-[230px]">Select from computer
                                            <input id="files" accept='image/*,video/mp4,video/x-m4v,video/*' type="file" className=' opacity-0 hidden ' onChange={handleChange} />
                                        </label>
                                    </div>
                                </div>
                            </div>
    
                        </div>
    
                }
                </div>:<Successpost/>

            }
            



        </div>

    )
}
