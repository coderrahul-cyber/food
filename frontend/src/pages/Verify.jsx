import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';

function Verify() {

    const {url} = useContext(StoreContext);

    const [searchParams , setsearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderid = searchParams.get("orderId");
    const navigate = useNavigate();

     const verifyPayment = async ()=>{
        const response = await axios.post(`${url}/api/order/verify` , {success , orderid});
        console.log(response);
        if(response.data.success) {
            navigate('/my-order');
        }else{
            navigate("/");
        }

     }

     useEffect(()=>{

        verifyPayment();

     },[])

  return (
    <div className='verify min-h-[60vh] grid '>

        <div className="spin animate-spin  w-[100px] h-[100px] place-self-center border-[5px] border-[#bdbdbd] border-t-orange-500  rounded-full">

        </div>
      
    </div>
  )
}

export default Verify
