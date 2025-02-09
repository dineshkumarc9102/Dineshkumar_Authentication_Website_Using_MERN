import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets.js'
import {useNavigate} from 'react-router-dom'
import { AppContent } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContent)

  const onSubmitHandler = async (e) => {

    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if (state === 'Sign Up') {
        const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password})

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        }else{
          toast.error(error.message);
        }

      }else{
        const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password})

        if (data.success) {
          setIsLoggedin(true)
          getUserData()
          navigate('/')
        }else{
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 '>
      <img src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-24 cursor-pointer' onClick={() => navigate('/')} />
      <div className='bg-gradient-to-br from-blue-200 to-purple-400 p-10 rounded-lg shadow-lg w-full sm:w-96 text-black-300 text-sm'>
        <h2 className='text-3xl font-semibold text-center mb-3'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
        <p className='text-center text-sm mb-6'>{state === 'Sign Up' ? 'Create your Account' : 'Login to your Account!'}</p>

        <form onSubmit={onSubmitHandler}>
          {state === 'Sign Up' && (
            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.person} alt="" className='w-5'/>
            <input
            onChange={e => setName(e.target.value)} 
            value={name} 
            type="text" 
            placeholder='Full Name' 
            required 
            className='bg-transparent outline-none text-[#d5d2d2]' />
          </div>
          )}
          
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

          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.password} alt="" className='w-5'/>
            <input
            onChange={e => setPassword(e.target.value)}
            value={password}  
            type="password" 
            placeholder='Password' 
            required 
            className='bg-transparent outline-none text-[#d5d2d2]' />
          </div>

          <p onClick={() => navigate('/reset-password')} className='mb-4 cursor-pointer'>Forgot Password?</p>
          
          <div className="flex justify-center">
            <button className="cursor-pointer overflow-hidden relative z-100 border border-black group px-8 py-1 rounded-full">
              <span className="relative z-10 group-hover:text-white font-medium duration-500">{state} !</span>
              <span className="absolute w-full h-full bg-[#333A5C] -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500"></span>
              <span className="absolute w-full h-full bg-[#333A5C] -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500"></span>
            </button>
          </div>
        </form>

        {state === 'Sign Up' ? 
        (
          <p className='text-center text-xs mt-4'>Already have an account?{' '}
            <span onClick={()=>setState('Login')} className='text-blue-700 cursor-pointer underline'>Login here</span>
          </p>
        ) : 
        (
          <p className='text-center text-xs mt-4'>Don't have an account?{' '}
           <span onClick={()=>setState('Sign Up')} className='text-blue-700 cursor-pointer underline'>Sign up</span>
          </p>
        )}

      </div>
    </div>
  )
}

export default Login
