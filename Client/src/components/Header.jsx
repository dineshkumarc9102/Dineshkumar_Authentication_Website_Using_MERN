import React, { useContext } from 'react'
import {assets} from '../assets/assets.js'
import { AppContent } from '../context/AppContext.jsx'

const Header = () => {

  const {userData} = useContext(AppContent);

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800' >
      <img src={assets.user} alt="" className='w-36 h-36 rounded-full mb-6'/>
      <h1 className='flex items-center gap2 text-xl sm:text-3xl'>Hey {userData ? userData.name : 'Developer'}  !!</h1>
      <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to our app</h2>
      <button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-black hover:text-white trasition-all'>Get Start</button>
      
    </div>
  )
}

export default Header
