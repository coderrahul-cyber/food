import React, { useState } from 'react'
import Header from '../components/Header'
import Explore from '../components/Explore'
import FoodDisplay from '../components/FoodDisplay';
import AppDownload from '../components/AppDownload';
import Circle from '../components/Circle';

function Home() {

  const [category , setCategory]=useState("All");


  return (
    <>

    <Header/>
    <Explore category={category} setCategory={setCategory}/>
    <FoodDisplay category={category} />
    <AppDownload />
    <Circle/>

    
     
    </>
  )
}

export default Home