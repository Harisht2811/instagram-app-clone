import React, { useEffect, useState } from 'react'
import { GetUserPost, GetUserByEmail,DeletePost } from '../../Functions/Supafunctions'
import Share from '../../Assests/share.png'
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;


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
      console.log(userPostData)
      setUserPosts(userPostData)
    })();

  }, []);

const showDeleteConfirm = (postid) => {
 confirm({
   title: 'Remove Post?',
   icon: <ExclamationCircleFilled />,
   okText: 'Yes',
   okType: 'danger',
   cancelText: 'No',
   async onOk () {
    const deletePost =await DeletePost(postid);
    console.log(deletePost);
   },
   onCancel() {
     console.log('Cancel');
   },
 });
};
  return (
    <div className=' -ml-[5%]'>
      {

        isuserPosts ?
          <div className='w-[70%] grid grid-cols-3 mt-6'>
            {
              userPosts.map((post, index) => {
                return (
                  <>
                    <img key={index} src={post.imageurl} className='w-[300px] h-[300px] ml-2 mb-[1%] cursor-pointer hover:opacity-50' onClick={()=>showDeleteConfirm(post.id)}></img>
                  </>
                )
              })
            }
          </div> :
          <div className='w-[70%] mt-12 '>
            <a href='/create'><img src={Share} alt='share' className='cursor-pointer ml-[45%]'></img></a>
            <p className='text-[28px] font-bold mt-4'>Share  photos</p>
            <p className='text-[14px] mt-2'>When you share photos, they will appear on your profile.</p>
            <a href='/create'><p className='text-[14px] font-bold text-blue-500 mt-2 cursor-pointer'>share your first photo</p></a>
          </div>

      }


    </div>
  )
}
