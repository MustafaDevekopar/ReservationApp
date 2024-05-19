
import { LikeIcon, StarRatting } from '../IconsComponent/IconComponent'

type infoProps = {
    fieldName: string;
    rating: string;
    likes: string;
}

const FieldTitleRateingLikes = ({
    fieldName,
    rating,
    likes,
}: infoProps) => {
  return (
        <div className="flex items-center justify-between lg:justify-start xl:justify-start xl:gap-8 lg:gap-8">
            <span className="mb-2 lg-mb-4 xl:mb-4 line-clamp-1 lg:text-lg xl:text-lg ">{fieldName}</span>
            <span className='flex mr-8 text-LightXlGray text-xs  gap-1'> 
                <StarRatting className=''/>
                3{rating}
            </span>  
            <span className='flex flex-col items-center text-xs  ml-10 text-LightXlGray text-x gap-1'> 
                <LikeIcon className='w-6'/>
                {likes}
            </span>  
        </div>
  )
}

export default FieldTitleRateingLikes