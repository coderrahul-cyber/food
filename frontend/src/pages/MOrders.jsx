import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../Context/StoreContext'
import axios from 'axios';
import { assets } from '../assets/assets';

function MOrders() {

    const {token , url}= useContext(StoreContext)

    const [data ,setData] = useState([]);

    const fetchOrder = async()=>{
        const response = await axios.post(`${url}/api/order/userorders` ,{} , {headers : {token : token}});
        setData(response.data.data);
    }

    useEffect(()=>{
        if(token) fetchOrder();
    },[token])


  return (
    <div className='myorder  my-[50px] mx-0 '>
       <h2>My Orders</h2>
       <div className="container  flex flex-col gap-5 mt-[30px]">
        {data.map((order,index)=>{
            return (
                <div key={index} className="orderss w-[89vw] border-[1px] rounded-md border-orange-500  items-center gap-[30px] text-[14px] text-[#454545] py-[10px] px-[15px] grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] ">
                    <img className='w-[50px] ' src={assets.parcel_icon} alt="" />
                    <p  className='text-gray-600'>{order.items.map((itemn , index)=>{
                        if(index === order.items.length -1){
                            return itemn.name+ " X" + itemn.quantity
                        }
                        else{
                            return itemn.name+ " X" + itemn.quantity+", "
                        }
                    })}</p>
                    <p>${order.amount}.00</p>
                    <p>Items : {order.items.length}</p>
                    <p className='flex gap-2'><span className='text-orange-500'>&#x25cf;</span><b className='font-semibold'>{order.status}</b></p>
                    <button onClick={fetchOrder} className='py-1 text-white px-2 bg-orange-500 rounded-md'>Track order</button>
                </div>
            )
        })}
       </div>
    </div>
  )
}

export default MOrders
