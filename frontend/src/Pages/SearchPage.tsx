import DropdownCat from "../Components/Dropdowns/DropdownCat"
import  Card  from "./../Components/Cards/Card"
import React from 'react'

type Props = {}

const SearchPage = (props: Props) => {
  return (
    <div>
        <div className=" flex justify-center items-center w-full ">
            <div className="flex gap-1 mx-3 sm:mx-6  md:mx-12 lg:mr-20 lg:ml-8  w-full my-6 ">
                <DropdownCat />
                <DropdownCat />
            </div>
        </div>
    <div className=" flex justify-center items-center w-full ">
        <div className="grid gap-4 
        sm:grid-cols-1  md:grid-cols-2  lg:grid-cols-3 
        mx-3 sm:mx-6  md:mx-12 lg:mr-24 lg:ml-8  w-full ">
        
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

       </div>
    </div>
    </div>
  )
}

export default SearchPage