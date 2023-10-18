import React, { useEffect, useState } from 'react'
import Cross from '../../Assests/cross.png'
import Upload from '../../Assests/uploadicon.png'
import Leftarrow from '../../Assests/left-arrow-50.png'
import { storage } from '../../Firebase/Firebaseconfig'
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const Create = () => {

    const [isopenPop, setisShowOpenPop] = useState(true);
    const [imageList, setImageList] = useState();


    // const userEmail = useSelector(selectUser);
    // console.log(auth.currentUser.email)

    useEffect(() => {
        document.title = 'Create new post • Instagram'
    })

    const handleChange = (e) => {
        setisShowOpenPop(!isopenPop)
        console.log(e)
        console.log(e.target.files[0])
        let url = e.target.files[0]
        try{
            if (url == null) return;

            const imageRef = ref(storage, `images/${url.name + v4()}`)
            console.log(imageRef)
    
            uploadBytes(imageRef, url).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    // setImageList((prev) => [...prev, url]);
                    setImageList(url)
    
                })
            })
        }
        catch(err){
            console.log(err)
        }

       

    }
    // console.log(imageUpload, imageList)
    return (
        <div>

            {
                !isopenPop ?
                    <div className=' w-[100%] h-[100vh] relative p-10'>
                       <a href='/home'> <img src={Cross} alt='cross' className='cursor-pointer right-5 absolute'></img></a>
                        <div className='absolute top-[100px] left-[420px] bg-white w-[800px] h-[800px] rounded-xl shadow-md py-3 '>
                            <div className='border border-b-gray-300 border-t-0 border-r-0 border-l-0 py-1 w-[100%]'>
                                <img className='h-[32px] w-[30px] ml-5 cursor-pointer' src={Leftarrow} alt='black' onClick={() => setisShowOpenPop(!isopenPop)}></img>
                                <p className='absolute top-5 right-4 text-[14px] text-blue-500 font-bold cursor-pointer' >Post</p>
                            </div>
                           {imageList && <img src={imageList} alt='post-images' className='w-[850px] h-[750px]'></img> } 
                        </div>
                    </div> :
                    <div className=' w-[100%] h-[100vh] relative p-10'>
                        <a href='/home'> <img src={Cross} alt='cross' className='cursor-pointer right-5 absolute'></img></a>
                        <div className='absolute top-[100px] left-[420px] bg-white w-[800px] h-[800px] rounded-xl shadow-md py-3 '>
                            <div className='border border-b-gray-300 border-t-0 border-r-0 border-l-0 py-3 '>
                                <p className='text-[14px] font-bold '>Create new post</p>
                            </div>
                            <div className='absolute left-[330px] top-[300px] '>
                                <img src={Upload} alt='upload' className='ml-4'></img>
                                <p className=' text-[22px] mt-3 -ml-[45%]'>Drag photos and videos here</p>
                                <div className='flex justify-between items-center  mt-[6%] cursor-pointer   text-white -ml-[13%]' >
                                    <label htmlFor="files" className="text-white text-[15px] font-bold cursor-pointer p-2 rounded-md   hover:bg-blue-600  bg-blue-400 h-[40px] w-[230px]">Select from computer
                                        <input id="files" accept='image/*' type="file" className=' opacity-0 hidden ' onChange={handleChange} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>

    )
}
