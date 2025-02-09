import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {

  const {backendUrl} = useContext(AppContent)
  axios.defaults.withCredentials = true

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState('')
  const [otp, setOtp] = useState(0)
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)

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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
  } 

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  } 

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email, otp, newPassword})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  } 

  return (
    <div  className='flex items-center justify-center min-h-screen sm:px-0'>
      <img src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-24 cursor-pointer' onClick={() => navigate('/')} />
      
      {/* Reset Password */}

      {!isEmailSent && 
      <form onSubmit={onSubmitEmail} className='bg-gradient-to-br from-blue-200 to-purple-400 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-center mb-6'>Enter your register email id.</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
        <img src={assets.email} alt="" className='w-5'/>
        <input
        onChange={e => setEmail(e.target.value)}
        value={email}
        type="email" 
        placeholder='Email Id' 
        required 
        className='bg-transparent outline-none text-[#d5d2d2]' />
      </div>
      
      <div className="flex justify-center">
        <button className="cursor-pointer overflow-hidden relative z-100 border border-black group px-8 py-1 rounded-full">
          <span className="relative z-10 group-hover:text-white font-medium duration-500">Submit</span>
          <span className="absolute w-full h-full bg-[#333A5C] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
          <span className="absolute w-full h-full bg-[#333A5C] -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
        </button>
      </div>
      </form> 
      }

      {/* Reset Password OTP */}
      
      {!isOtpSubmitted && isEmailSent &&
      <form onSubmit={onSubmitOtp} className='bg-gradient-to-br from-blue-200 to-purple-400 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
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
              <span className="relative z-10 group-hover:text-white font-medium duration-500">Submit</span>
              <span className="absolute w-full h-full bg-[#333A5C] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
              <span className="absolute w-full h-full bg-[#333A5C] -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </button>
          </div>
       </form>
       }

       {/* New Password */}

       {isOtpSubmitted && isEmailSent &&
       <form onSubmit={onSubmitNewPassword} className='bg-gradient-to-br from-blue-200 to-purple-400 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-2xl font-semibold text-center mb-4'>New Password</h1>
        <p className='text-center mb-6'>Enter your register email id.</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src={assets.password} alt="" className='w-5'/>
          <input 
          onChange={e => setNewPassword(e.target.value)}
          value={newPassword}
          type="password" 
          placeholder='Password' 
          required 
          className='bg-transparent outline-none text-[#d5d2d2]' />
        </div>
        <div className="flex justify-center">
        <button className="cursor-pointer overflow-hidden relative z-100 border border-black group px-8 py-1 rounded-full">
          <span className="relative z-10 group-hover:text-white font-medium duration-500">Submit</span>
          <span className="absolute w-full h-full bg-[#333A5C] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
          <span className="absolute w-full h-full bg-[#333A5C] -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
        </button>
       </div>
       </form>
       }

    </div>
  )
}

export default ResetPassword
