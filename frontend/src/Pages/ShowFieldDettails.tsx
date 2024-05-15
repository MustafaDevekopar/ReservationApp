import React, { useState } from 'react'
import CardIconsTextsBox from '../Components/CardElements/CardIconsTextsBox'
import ActiveLink from '../Components/LinkStyled/ActiveLink'
import { Outlet, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { LikeIcon, ShareIcon, StarRatting } from '../Components/IconsComponent/IconComponent'

type Props = {}

const ShowFieldDettails = (props: Props) => {
    const location = useLocation();
    const [selectedPath, setSelectedPath] = useState<string>(location.pathname);
    const handleIconClick = (path: string) => {
      setSelectedPath(path);
    };
  return (
    <div className="static flex justify-center w-full lg:px-10 xl:px-10 lg:pt-10 xl:pt-10 h-screen">
        <div className="flex flex-col lg:flex-row-reverse xl:flex-row-reverse lg:mx-12  w-full h-full">
            <div className="relative lg:flex-1 xl:flex-1 ">
                <img 
                className="aspect-[16/9] w-full object-cover lg:rounded-3xl xl:rounded-3xl"
                  src="https://i.pinimg.com/originals/c2/a5/19/c2a519566d628121523b1e75205586a5.jpg" alt="" />
                <div className='w-full h-6 bg-bgWhight absolute bottom-0 left-0 right-0 rounded-t-3xl'></div>
            </div>
            <div className="px-3 md:p-4 lg:m-0 xl:m-0 lg:flex-1 xl:flex-1 h-full ">
                <div className="flex items-center justify-between">
                    <span className="mb-2 lg-mb-4 xl:mb-4 line-clamp-1 lg:text-lg xl:text-lg ">ملعب سباعي الرمادي</span>
                     <span className='flex mr-8 text-LightXlGray text-xs  gap-1'> 
                        <StarRatting className=''/>
                        3.5
                     </span>  
                     <span className='flex flex-col items-center text-xs  ml-10 text-LightXlGray text-x gap-1'> 
                        <LikeIcon className='w-6'/>
                        195
                     </span>  
                </div>


                <div className=' flex flex-col justify-between lg:ml-10 xl:ml-10 h-[80%]'>
                    <div>
                        <CardIconsTextsBox 
                            locationText="الرمادي حي المعلمين"
                            distance="1.2"
                            views="223"
                            phoneNumber="07843876745"
                        />                     
                    </div>
                     <div className="w-full ">
                        <button className="text-sm text-blue-500 px-2 py-1 rounded-xl outline outline-2 outline-blue-400 ">
                           <div className='flex gap-2'>مشاركه <ShareIcon  /></div> 
                        </button>
                        <button className="text-sm text-blue-500 px-5 py-1 rounded-xl outline outline-2 outline-blue-400 mx-2">متابعه</button>
                     </div>
                    <div>
                        <div className="flex justify-center  ">
                            <ActiveLink 
                                path="/showfield/services"
                                isSelected={selectedPath === "/showfield/services"}
                                TitleLink="الخدمات"
                                onClick={handleIconClick}
                            />
                            <ActiveLink 
                                path="/showfield/offers"
                                isSelected={selectedPath === "/showfield/offers"}
                                TitleLink="العروض"
                                onClick={handleIconClick}
                            /> 
                        </div> 
                        {/* disply services or offers */}
                        <Outlet />                       
                    </div>



                    <div className="flex justify-center items-center bg-Darkgreen rounded-xl  text-white">
                      <Link to="/reserve" className=" w-full h-full text-center py-2 ">احجز الان</Link>
                    </div>


                </div>
     

            </div>



        </div>

    </div>
  )
}

export default ShowFieldDettails