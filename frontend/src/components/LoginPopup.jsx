import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios'

function LoginPopup({ setShow }) {

    const {url , token , setToken} = useContext(StoreContext);
    const [currentState, setCurrentState] = useState("Sign up");
    const [data ,setData] = useState({
        name:"",
        email : "",
        password: ""
    });

    const onChangeHandler = (e)=>{

        const name = e.target.name ;
        const value = e.target.value ;
        setData({...data , [name]:value});
    }

    const onLogin = async (e)=>{
        e.preventDefault();
        let newUrl = url ;
        if(currentState === "Login"){
            newUrl += "/api/user/login"
        }else{
            newUrl += "/api/user/register"
        }
        const connection = await axios.post(newUrl , data);
        if(connection.data.success){
            setToken(connection.data.token);
            localStorage.setItem("token" , connection.data.token);
            setShow(false);
        }else{
            alert(connection.data.message)
        }

        
    }




    return (
        <div className='  absolute z-10 w-full h-full bg-[#00000090] grid '>

            <form onSubmit={onLogin} className=' rounded-2xl place-self-center w-[max(23vw,330px)] text-[#808080] bg-white  flex flex-col gap-6 py-6 px-7 text-[14px] animate-fade2 '>
                <div className="flex justify-between items-center text-black">
                    <h2 className='text-2xl '>{currentState}</h2>
                    <img onClick={() => setShow(false)} src={assets.cross_icon} className='cursor-pointer w-4' alt="" />
                </div>
                <div className="flex flex-col gap-5">
                    {currentState === "Login" ? <></> : <input name='name' value={data.name} onChange={onChangeHandler} type="text" className='border-1  outline-none focus:border-[#FF4C24] rounded-md py-1 px-2' placeholder='Your Name' required />}

                    <input name='email' value={data.email} onChange={onChangeHandler} type="email"  className='border-1  outline-none focus:border-[#FF4C24] rounded-md py-1 px-2' placeholder='Your Email' required />
                    <input name='password' value={data.password} onChange={onChangeHandler} type="password"  className='border-1  outline-none focus:border-[#FF4C24] rounded-md py-1 px-2' placeholder='password' required />
                </div>
               {currentState==="Sign up" ?  <div className="flex gap-2">
                    <input type="checkbox" className='peer border-none outline-none' required />
                    <p className='peer-checked:text-black'>By Continuing , i agree to the terms of use & privacy policiy</p>
                </div> : <></>}
                <button type='submit' className='border-none py-2 rounded-md bg-[#FF4C24] text-white px-1'>{currentState === "Sign up" ? "Sign up" : "Login"}</button>
                {currentState === "Sign up" ? <p className='text-gray-700 text-center'>Already have an account? <span className='cursor-pointer text-blue-600'   onClick={()=> setCurrentState("Login")}>Login here</span></p> : <p className='text-gray-700 text-center'>Create a new Account? <span className='cursor-pointer text-blue-600'   onClick={()=> setCurrentState("Sign up")}>Click here</span></p>
                }


            </form>

        </div>
    )
}

export default LoginPopup
