import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {assets} from '../assets/assets'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Orders() {
  const url = "http://localhost:4000";
  const [order ,setorder]= useState([]);

  const fetchAllOrder = async ()=>{
    const response = await axios.get(`${url}/api/order/all-order`);
    if(response.data.success){
      setorder(response.data.data);
    }else{
      toast.error("Error")
      
    }
  }

  const statushandler =async (e , orderid)=>{

    const response = await axios.post(`${url}/api/order/update` , {orderid : orderid , status : e.target.value});
    if(response.data.success){
      await fetchAllOrder();
      toast.success("Sataus updated")
    }
    else{
      console.log("error")
    }
    

    

  }

  useEffect(()=>{
    fetchAllOrder();
  },[]);

  return (
    <>
    <div className=' w-full py-1 px-2 font-mukta'>
       <h1 className='text-center text-2xl '>Order Page</h1>
       <div className="conatiner">
        {order.map((orderr , index)=>{
         return <div key={index} className="grid rounded-lg   border-[1px] border-orange-500 p-5 my-[30px] mx-0 text-[14px] text-[#505050]  grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start">
            <img src={assets.parcel_icon} alt="" />

            <div className=" font-semibold ">
              <p>{orderr.items.map((item,index)=>{

                if(index === orderr.items.length -1){
                  return item.name + " X " + item.quantity
                }else{
                  return item.name + " X " + item.quantity +","
                }

              })}</p>
              <p className="order-item nm font-semibold mt-4 mb-[5px] ">
                {orderr.address.firstName + " " + orderr.address.lastName} 
              </p>
              <div className='font-medium text-gray-500'>
                <p >{orderr.address.street+ " ,"}</p>
                <p>{orderr.address.city+ " ," + orderr.address.state +" ," + orderr.address.country +" ," + orderr.address.zipcode}</p>
              </div>
              <p className='font-medium text-gray-500'>{orderr.address.phone}</p>
            </div>
            <p className='font-semibold'>Items : {orderr.items.length}</p>
            <p>${orderr.amount}</p>
            <select onChange={(e)=>statushandler(e,orderr._id)} value={orderr.status} className='bg-[#ffe8e4] border-[1px] border-orange-500 rounded-md py-1 px-2 outline-none w-[max(10vw,120px)] ' >
              <option value="Food Processing">Food-Processing</option>
              <option value="Out-For-Delivery">Out-For-Delivery</option>
              <option value="Delviery">Deivery</option>
            </select>

          </div>
        })}

       </div>

    </div>

    </>
  )
}

export default Orders
