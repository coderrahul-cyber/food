import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from '../Context/StoreContext';

function FoodItem({item}) {

    const {cardItem,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <>
    <div className="w-full m-auto rounded-lg animate-fade2  p-2 shadow-lg ">

    <div className="relative ">
        <img src={url + "/images/"+item.image} className='w-full rounded-tl-[15px] rounded-tr-[15px] rounded-bl-none rounded-br-0 ' alt="" />
        {
             !cardItem[item._id] 
             ? <img src={assets.add_icon_white} className=' w-9 absolute bottom-[15px] right-[15px]  mt-1 shadow-lg rounded-full  cursor-pointer ' onClick={()=> addToCart(item._id)} alt=""/> : 
             <div className=" absolute bottom-[15px] right-[15px] flex items-center gap-2 p-[6px] rounded-[50px] bg-white mt-1">
                <img onClick={()=>removeFromCart(item._id)} src={assets.remove_icon_red} className='cursor-pointer w-7 ' alt="" />
                <p>{cardItem[item._id]}</p>
                <img onClick={()=>addToCart(item._id)} src={assets.add_icon_green} className='cursor-pointer w-7 ' alt="" />

             </div>
        }
    </div>      
    <div className="p-5">
        <div className="flex justify-between items-center mb-[10px] ">
            <p className='text-[20px] capitalize font-500'>{item.name}</p>
            <img src={assets.rating_starts} className='w-[70px]' alt="" />
        </div>
        <div className="">
            <p className='text-[#676767] text-[12px]'>{item.description}</p>
            <p className='text-red-500 text-[22px] font-500 my-[10px] mx-0 '>${item.price}</p>
        </div>
    </div>
    </div>
    </>
  )
}

export default FoodItem
