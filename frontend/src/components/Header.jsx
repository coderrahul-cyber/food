import React from 'react'

function Header() {
  return (
    <>
    <div  className='header h-[34vw]  bg-headerI bg-no-repeat bg-contain relative  '>

        <div className=" animate-fade absolute flex flex-col items-start gap-[1vw] max-w-[50%] bottom-[10%] left-[6vw]">

            <h2 className=' font-[500] text-ss text-white '>Order your favourite food here</h2>
            <p className='text-[1vw] text-white'>Choose from a diverse menu featturing a delectable array of dishes crafted with the finest ingredients and  culineary expertise . To satisfy your craving and elevate your dining experience , one delicious meal at a time .  </p>
            <button className='bg-white text-[#747474]  font-[500] py-[1vw] px-[2.3vw] rounded-[50px] text-ss1 '>View Menu</button>
        </div>
    
    </div>
    </>
      
  )
}

export default Header
