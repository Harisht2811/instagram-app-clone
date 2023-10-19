import React, { useState, useEffect } from 'react'
import Instatext from '../../Assests/insta-text.png'
import Home from '../../Assests/home-logo.png'
import Getapp from '../../Assests/getapp.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../Utils/Createslice'
import { toast } from 'react-hot-toast'
import { supabase } from '../../Supabase/Supabase'

export const Login = () => {
    const [isShowHide, setShowHide] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [errors, setErrors] = useState('')
    const validateErrors = {}
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        document.title = 'Instagram'

    })


    const showHidePassword = () => {
        if (passwordType === 'text') {
            setPasswordType('password')
            setShowHide(!isShowHide)
        }
        if (passwordType === 'password') {
            setPasswordType('text')
            setShowHide(!isShowHide)
        }

    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch(login({
            email:email,
        }
        ))
      
        let regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        let regexEmail = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
        if (email === '') {
            validateErrors.email = 'Email is required'
        }
        else if (!regexEmail.test(email)) {
            validateErrors.email = 'Email is not valid'
        }
        if (password === '') {
            validateErrors.password = 'Password is required'
        }
        else if (password.length < 4) {
            validateErrors.password = 'More than 4 characters'
        }
        else if (!regexPassword.test(password)) {
            validateErrors.password = 'Should include the characters'
        }
        setErrors(validateErrors)
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
              })
              console.log('data',data)
              console.log('err',error)

            if(error){
                console.log(error)
            }else{
                navigate('/home')
                toast.success('Welcome to 🥳 Instagram')
            }  
            
    }
    return (
        <div>
            <div className='flex  px-[10%] py-[5%] w-[100%]'>
                <img className=' mt-[2%] ml-[21%]' src={Home} alt='home-logo'></img>
                <div>
                    <form onSubmit={(e) => handleSubmit(e)} className='w-[350px] h-[450px] border border-[#dad1d1] outline-1 mt-[15%] px-2 py-3'>
                        <img className='ml-[18%] mt-[5%]' src={Instatext} alt='logo-text'></img>
                        <div className='mt-[10%] relative'>
                            <input
                                className='text-[12px] w-[275px] h-[35px] border border-[#dad1d1] p-2 outline-0  bg-gray-100'
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                            >
                            </input>
                            {errors.email && <span className='ml-[45%] w-[100%] text-[14px] text-red-500 text-left'>{errors.email}</span>}
                            <input
                                className=' text-[12px] w-[275px] h-[35px] border border-[#dad1d1] p-2 mt-[5%] outline-0  bg-gray-100'
                                onChange={(e) => setPassword(e.target.value)}
                                type={passwordType}
                                placeholder='Password'
                            ></input>
                            {errors.password && <span className='ml-[35%] w-[100%] text-[14px] text-red-500 text-left'>{errors.password}</span>}
                            <p
                                className={`${errors.email ? 'right-10 top-20' : 'right-10 top-14'}  absolute  text-[16px] font-bold cursor-pointer`}
                                onClick={showHidePassword}
                            >
                                {isShowHide ? 'Show' : 'Hide'}</p>
                            <button type='submit' className='mt-[5%] h-[35px] w-[275px] bg-blue-500 text-white rounded-lg opacity-70'>Log in</button>
                        </div>
                    </form>
                    <div className='w-[350px] h-[60px] border border-[#dad1d1] outline-1 mt-[4%] px-[6%] py-4'>
                        <p>Don't have an account ? <a href='/signup' className='cursor-pointer text-blue-400'>Sign up</a></p>
                    </div>
                    <div className='mt-4'>
                        <p>Get the app</p>
                        <img src={Getapp} alt='get-app' className='ml-[11%]'></img>
                    </div>

                </div>


            </div>
        </div>
    )
}
