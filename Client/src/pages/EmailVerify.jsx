import React, { useContext, useEffect } from 'react'
import {assets} from '../assets/assets.js'
import axios from 'axios'
import { AppContent } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const EmailVerify = () => {

  axios.defaults.withCredentials = true

  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContent)

  const navigate = useNavigate()

  const inputRefs = React.useRef([])

  const inputHandler = (e, index) => {
    if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
      inputRefs.current[index + 1].focus();
    }
  }

  const inputHandlerDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  const pasteHandler = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index)=>{
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')
      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp})
      if (data.success){
        toast.success(data.message)
        getUserData()
        navigate('/')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin, userData])

  return (
    <div className='flex items-center justify-center min-h-screen sm:px-0'>
       <img src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-24 cursor-pointer' onClick={() => navigate('/')} />
       <form onSubmit={onSubmitHandler} className='bg-gradient-to-br from-blue-200 to-purple-400 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6'>Enter the 6 digit code sent to your email id.</p>
        <div className='flex justify-between mb-8'>
          {Array(6).fill(0).map((_, index) => (
            <input 
            type="text" 
            maxLength='1' 
            key={index} 
            required
            className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
            ref={e => inputRefs.current[index] = e}
            onInput={(e) => inputHandler (e, index)}
            onKeyDown={(e) => inputHandlerDown (e,index)}
            onPaste={pasteHandler}
            />
          ))}
        </div>
        
        <div className="flex justify-center">
            <button className="cursor-pointer overflow-hidden relative z-100 border border-black group px-8 py-1 rounded-full">
              <span className="relative z-10 group-hover:text-white font-medium duration-500">Verify Email</span>
              <span className="absolute w-full h-full bg-[#333A5C] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
              <span className="absolute w-full h-full bg-[#333A5C] -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </button>
          </div>

       </form>
    </div>
  )
}

export default EmailVerify
