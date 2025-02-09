import React, { useContext } from 'react';
import { assets } from '../assets/assets.js';
import {useNavigate} from 'react-router-dom'
import { AppContent } from '../context/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
 
const Navbar = () => {

  const navigate = useNavigate()
  const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContent)
  
  const sendVerifyOtp = async () => {
    try {
      axios.defaults.withCredentials =true;

      const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')

      if (data.success) {
        navigate('/email-verify')
        toast.success(data.message)
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true
      const {data} = await axios.post(backendUrl + '/api/auth/logout')
      data.success && setIsLoggedin(false)
      data.success && setUserData(false)
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img src={assets.logo} alt="icon" className="w-28 sm:w-24" />

      {userData ? 
      <div className='w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group'>
        {userData.name[0].toUpperCase()}
        <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded-full pt-10'>
          <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
            {!userData.isAccountVerified && 
            <li onClick={sendVerifyOtp} className='py-1 px-2 hover:bg-gray-200 cursor-pointer'>Verify Email</li> 
            }
            <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
          </ul>
        </div>
      </div>

      :  

      <button onClick={() => navigate('/login')} 
      className="flex items-center gap-2 cursor-pointer bg-gradient-to-b from-indigo-500 to-indigo-600 shadow-[0px_4px_32px_0_rgba(99,102,241,.70)] px-6 py-3 rounded-full border-[1px] border-slate-500 text-black font-medium group">
        <div className="relative overflow-hidden">
          <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
            Login
          </p>
          <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)]">
            Login
          </p>
        </div>
        <img src={assets.login_icon} alt="login icon" className="w-5" />
      </button>
      }
      
      

    </div>
  );
};

export default Navbar;
