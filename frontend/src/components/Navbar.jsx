import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link,  useNavigate } from 'react-router-dom';
import { StoreContext } from '../Context/StoreContext';
import {Link as Scroll} from "react-scroll";
function Navbar({setShow}) {

    const [menu , setMenu]=useState("home");
    const navigate = useNavigate();

    const {getCartTotal , token , setToken }=useContext(StoreContext);

    const logout = ()=>{

      localStorage.removeItem("token");
      setToken("");
      navigate("/");

    }


  return (
    <>
      <div id='nav' className=" animate-fade py-5 px-0 flex items-center justify-between">
       <Link to='/'>
        <img src={assets.logo} className=' w-[150px]  ' alt="" />
       
       </Link>
        <ul className='flex gap-5 text-[#49557e] text-[18px]  '>

            <Link to='/' onClick={()=>setMenu("home")} className={menu === `home`  ? `pb-[2px] cursor-pointer   border-b-2 border-[#49557e]`  : "cursor-pointer"}>home</Link>
            <Scroll to="explore" spy={true} smooth={true} duration={500}  offset={50} onClick={()=>setMenu("menu")} className={menu === `menu`  ? `pb-[2px] cursor-pointer border-b-2 border-[#49557e]` : " cursor-pointer"}>menu</Scroll>
            <Scroll to="app-download" spy={true} smooth={true} duration={500}  offset={50} onClick={()=>setMenu("mobile-app")} className={menu=== `mobile-app` ? `pb-[2px] cursor-pointer border-b-2 border-[#49557e]` : "cursor-pointer"}>mobile-app</Scroll>
            <Scroll to="footer" spy={true} smooth={true} duration={500}  offset={50} onClick={()=>setMenu("contact-us")} className={menu === `contact-us` ? `pb-[2px] cursor-pointer border-b-2 border-[#49557e]` : "cursor-pointer"}>contact-us</Scroll>

        </ul>
        <div className="flex items-center gap-10 phone:(gap-[30px]) ">
            <img src={assets.search_icon} className='cursor-pointer phone:(w-[22px])' alt="" />
            <div className="relative ">
              <Link to='/cart'>
                <img src={assets.basket_icon} className='cursor-pointer' alt="" /></Link>

                <div className={getCartTotal()===0 ? "" : `dot absolute min-w-[10px] min-h-[10px] bg-red-500 top-0 -right-2 rounded-md`}> 
                </div>

            </div>
            {!token ? 
            <button onClick={()=>setShow(true)} className='bg-transparent text-lg text-[#49557e] border-[1px] border-red-500 py-[10px] px-[30px] rounded-[50px] cursor-pointer hover:bg-[#fff4f2] transition-all duration-300 phone:()'>Sign-in</button>
            : <div className=" relative peer/p   ">
              <img src={assets.profile_icon} className='peer/p cursor-pointer' alt="" />
              <ul className='  absolute hidden right-0 z-100 hover:flex cursor-pointer  peer-hover/p:flex gap-2  flex-col   bg-white p-2 '>
                <li  onClick={()=>navigate('/my-order')} className='flex gap-2'><img className='w-5 ' src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout} className='flex gap-2'><img className='w-5 ' src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>

            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Navbar