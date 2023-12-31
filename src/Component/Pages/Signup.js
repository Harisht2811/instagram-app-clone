import React, { useEffect, useState } from 'react'
import Instatext from '../../Assests/insta-text.png'
import icon from '../../Assests/fbicon.svg'
import Underline from '../../Assests/underline.png'
import { useNavigate } from 'react-router-dom'
import Getapp from '../../Assests/getapp.png'
import { toast } from 'react-hot-toast'
import { supabase } from '../../Supabase/Supabase'
import { CreateUser } from '../../Functions/Supafunctions'

export const Signup = () => {

    const navigate = useNavigate();
    const [isShowHide, setShowHide] = useState(true);
    const [errors, setErrors] = useState('')
    const [passwordType, setPasswordType] = useState('password');
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        fullname: ''
    })
    const validateErrors = {}


    const handleChange = (e) => {

        const { value, name } = e.target
        setFormValues({
            ...formValues, [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        let regexEmail = /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
        if (formValues['email'] === '') {
            validateErrors.email = 'Email is required'
        }
        else if (!regexEmail.test(formValues['email'])) {
            validateErrors.email = 'Email is not valid'
        }
        if (formValues['password'] === '') {
            validateErrors.password = 'Password is required'
        }
        else if (formValues['password'].length < 4) {
            validateErrors.password = 'More than 4 characters'
        }
        else if (!regexPassword.test(formValues['password'])) {
            validateErrors.password = 'Should include the characters'
        }
        setErrors(validateErrors)
        const { data, error } = await supabase.auth.signUp({
            email: formValues['email'],
            password: formValues['password'],
        })

        if (error) {
            console.log(error)
        }
        else {
            console.log(data)
            navigate("/")
            toast.success('Sign up successfully')
        }
        await CreateUser(formValues);
    }
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
    useEffect(() => {
        document.title = 'Sign up • Instagram';
    })

    return (
        <div className='px-10 py-4 relative left-[700px] '>


            <div className={`${errors.email ? 'w-[350px] h-[700px] ' : 'w-[350px] h-[630px] '}  border border-[#dad1d1] outline-1  px-2 py-3`}>
                <img className='ml-[18%] mt-[5%]' src={Instatext} alt='text-logo'></img>
                <p className='text-center ml-9 w-[80%] text-gray-500 font-bold'>Sign up to see photos and videos from your friends.</p>
                <button className='relative mt-[5%] h-[38px] w-[275px] bg-blue-500 text-white rounded-lg hover:bg-blue-700 text-[14px] font-bold'><img className='absolute left-8 h-[24px] w-[24px]' alt='fb-icon' src={icon}></img>&nbsp;Log in with facebook</button>

                <div className='flex mt-[5%] ml-[12%]'>
                    <img className='' alt='underline' src={Underline}></img>
                    <p className='text-gray-500 font-bold'>OR</p>
                    <img className='' alt='underline' src={Underline}></img>
                </div>

                <form className='mt-[8%] relative' onSubmit={(e) => handleSubmit(e)}>
                    <input
                        name='email'
                        className='text-[12px] w-[275px] h-[35px] border border-[#dad1d1] p-2 outline-0 bg-gray-100'
                        placeholder='Email address'
                        onChange={handleChange}
                    ></input>
                    {errors.email && <span className='ml-[35%] w-[100%] text-[14px] text-red-500 text-left'>{errors.email}</span>}
                    <input
                        name='fullname'
                        className='text-[12px] w-[275px] h-[35px] border border-[#dad1d1] p-2 mt-[5%] outline-0  bg-gray-100'
                        placeholder='Full Name'
                        onChange={handleChange}
                    ></input>
                    <input
                        name='username'
                        className='text-[12px] w-[275px] h-[35px] border border-[#dad1d1] p-2 mt-[5%] outline-0  bg-gray-100'
                        placeholder='Username'
                        onChange={handleChange}
                    >
                    </input>
                    <input
                        name='password'
                        className=' text-[12px] w-[275px] h-[35px] border border-[#dad1d1] p-2 mt-[5%] outline-0  bg-gray-100'
                        type={passwordType}
                        placeholder='Password'
                        onChange={handleChange}
                    ></input>
                    {errors.password && <span className='ml-[35%] w-[100%] text-[14px] text-red-500 text-left'>{errors.password}</span>}
                    <p
                        // className='right-10  absolute  text-[16px] font-bold cursor-pointer'
                        className={`${errors.password ? 'right-10 bottom-[160px]' : 'right-10 bottom-[139px]'}  absolute  text-[16px] font-bold cursor-pointer`}
                        onClick={showHidePassword}
                    >
                        {isShowHide ? 'Show' : 'Hide'}</p>
                    <p className='text-[11px] mt-2 ml-8 text-gray-500 w-[80%] leading-4'>People who use our service may have uploaded your contact information to Instagram. Learn more</p>
                    <p className='text-[11px] mt-2 ml-8 text-gray-500 w-[80%] leading-4'>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>
                    <button type='submit' className='mt-[5%] h-[35px] w-[275px] text-[14px] bg-blue-500 text-white rounded-lg opacity-70 font-bold'>Sign up</button>
                </form>
            </div>
            <div className='w-[350px] h-[60px] border border-[#dad1d1] outline-1 mt-[1%] px-[1%] py-4'>
                <p>Have an account ? <a href='/' className='cursor-pointer  text-blue-400 text-[14px]'>Log in</a></p>
            </div>
            <div className='mt-5 w-[350px] '>
                <p>Get the app</p>
                <img src={Getapp} alt='get-app' className='ml-[11%]'></img>
            </div>
        </div>
    )
}
