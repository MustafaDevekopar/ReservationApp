import  Card  from "./../Components/Cards/Card"
import React from 'react'

type Props = {}

const HomPage = (props: Props) => {
  return (
    <div className=" flex justify-center items-center w-full ">
        <div className="grid gap-4 
        sm:grid-cols-1  md:grid-cols-2  lg:grid-cols-3 
        mx-3 sm:mx-6  md:mx-12 lg:mr-20 lg:ml-8  w-full my-6 ">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

       </div>
    </div>
  )
}

export default HomPage