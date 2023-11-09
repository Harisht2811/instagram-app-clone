import React, { useEffect, useState } from 'react';
import User from '../../Assests/user.png'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { Tabs } from 'antd';
import { storage } from '../../Firebase/Firebaseconfig'
import { GetUserByEmail, UpdateProfilePhoto ,GetUserPost } from '../../Functions/Supafunctions'
import { Profiledata } from '../../Utils/Profiledata';
import Setting from "../../Assests/settings.png"
import Highlight from '../../Assests/newhighlight.png'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
const { confirm } = Modal;
export const Profile = () => {

  const email = window.sessionStorage.getItem('email')

  const [imageList, setImageList] = useState();
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  const [tabPosition] = useState('bottom');
  const [activeTab,setActiveTab] = useState('1');
  const [isProfile , setisProfile] = useState(false);
  const [userPosts , setUserPosts] = useState([]);




  useEffect(() => {
    (async () => {
      const user = await GetUserByEmail(email);
      console.log(user)
      if(user[0].profileimage!== null){
        setisProfile(true)
      }
      else{
        setisProfile(false)
      }
      const userPostData = await GetUserPost(user[0].username);
      setUserPosts(userPostData);
      setUser(user[0])
      setUsername(user[0]?.username)
      document.title = user[0]?.username + ' • Instagram'
    })()
  }, [email])

  const handleChange = (e) => {
    let url = e.target.files[0]
    try {
      if (url == null) return;

      const imageRef = ref(storage, `images/${url.name + v4()}`)

      uploadBytes(imageRef, url).then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (url) => {
          // setImageList((prev) => [...prev, url]);
          await UpdateProfilePhoto(url, user.email)
          setImageList(url)
        })
      })

    }
    catch (err) {
      console.log(err)
    }
    setisProfile(true)
  }

  const handleChangeTab =(key)=>{
    setActiveTab(key)
  }

  const removeProfile = async()=>{
       const deleteData =await UpdateProfilePhoto(null, user.email);
       setisProfile(false);
       console.log(deleteData);
  }
  const showDeleteConfirm = () => {
    confirm({
      title: 'Remove Current Photo?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        removeProfile();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <>
      <div className='absolute left-[600px] top-5 '>
        <div className='flex  w-[100%] px-5 py-2'>

 
          {
            isProfile ?
            <div>
            <div class="w-max relative">
                  <img 
                  className={'h-[150px] w-[150px] rounded-full cursor-pointer'} alt='user_profile' src={user.profileimage} 
                  onClick={()=>{
                    // removeProfile();
                    showDeleteConfirm()}} 
                  ></img>
            </div>
            </div>:
            <div class="relative">
            <label for="profile" class="cursor-pointer flex items-center gap-4 px-6 py-4">
                <div class="w-max relative">
                <img className={`${imageList ? 'h-[150px] w-[150px] rounded-full' : "h-[150px] w-[150px]"}`} alt='user_profile' src={imageList !== undefined ? imageList : User}  ></img>
              </div>
            </label>
            <input className='opacity-0 hidden' type='file' hidden="" accept="image/*" name="profile" id="profile" onChange={handleChange} ></input>
          </div>
         

          }
          
          
          <div className='ml-[15%] mt-5 w-[100%] '>
            <div className='flex  '>
              <p className='text-[20px] font-medium'>{username}</p>
              <button className='h-[30px] w-[110px] hover:bg-gray-200 bg-gray-100 rounded-md text-black text-[14px] font-semibold ml-5'>Edit Profile</button>
              <button className='h-[30px] w-[110px] hover:bg-gray-200 bg-gray-100 rounded-md text-black text-[14px] font-semibold ml-5'>View Archive</button>
              <img src={Setting} className='h-[35px] w-[40px] ml-2 cursor-pointer' alt='setting'></img>
             </div>
            <div className='flex mt-5'>
              <p className='text-[16px] font-semibold'>{userPosts.length}<span className='font-normal text-[14px] ml-1'>Posts</span> </p>
              <p className='text-[16px] font-semibold ml-8'>123 <span className='font-normal text-[14px] '>followers</span></p>
              <p className='text-[16px] font-semibold ml-8'>323 <span className='font-normal text-[14px] '>following</span></p>
            </div>
          </div>
        </div>
          <div className='mt-[3%] -ml-4'>
            <img src={Highlight} alt='Highlight' className=''></img>
          </div>
        <div className='mt-[5%] ml-5'>
          <Tabs
            tabPosition={tabPosition}
            onChange={handleChangeTab}
            items={Profiledata.map((data, i) => {
              const id = String(i + 1);
              return {
                label: (
                  <span className='flex w-full'>
                    <img src={activeTab === id? data.activeicon : data.icon} className='h-[18px] w-[20px]' alt='icon-tab'></img>
                    <p className='ml-3 font-semibold'>{data.name}</p>
                  </span>
                ),
                key: id,
                children:data.children
              };
            })}>

          </Tabs>

        </div>

      </div>

    </>


  )
}

