
import CardIconsTextsBox from '../Components/CardElements/CardIconsTextsBox'
import ShareFollowBtns from '../Components/FieldElements/ShareFollowBtns'
import ServicesOffers from '../Components/FieldElements/ServicesOffers'
import LinkToButton from '../Components/Buttons/LinkToButton'
import ImageShowField from '../Components/FieldElements/ImageShowField'
import FieldTitleRateingLikes from '../Components/FieldElements/FieldTitleRateingLikes'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { FootbalfieldsGetById } from '../Api'
import { FieldDataType, FootballFaild } from '../Reservations'
//import { fileURLToPath } from 'url'
import { calculateDistance } from '../Helper/Helper'
import FullPageLoader from '../Components/FullPageLoader/FullPageLoader'
  
  type Props = {}

    const ShowFieldDettails: React.FC<Props> = (): JSX.Element  => {
        const { id } = useParams<{ id?: string }>(); 
        const [fieldData, setFieldData] = useState<FieldDataType | null>(null); 
        const [loading, setLoading] = useState<boolean>(false);
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              if (!id) return; 
              setLoading(true);
              const data = await FootbalfieldsGetById(parseInt(id)); 
              setFieldData(data); 
            } catch (error) {
              console.error('Error fetching football field data:', error);
            }finally{
              setLoading(false)
            }
          };
      
          fetchData(); // Call fetchData function when the component mounts or id changes
        }, [id]); // Include id in the dependency array
      
        if (!fieldData) {
          return <FullPageLoader />; 
        }

  return (
    <div className="static flex justify-center w-full lg:px-10 xl:px-10 lg:pt-10 xl:pt-10 h-screen">
        <div className="flex flex-col lg:flex-row-reverse xl:flex-row-reverse lg:mx-12  w-full h-full">
        {loading && <FullPageLoader />} 

            <ImageShowField imageSrc={fieldData.userGet.avatar}/>

            <div className="px-3 md:p-4 lg:m-0 xl:m-0 lg:flex-1 xl:flex-1 h-full ">
                <FieldTitleRateingLikes 
                    fieldName={fieldData.userGet.name}
                    rating="3.5"
                    likes="163"
                />

                <div className=' flex flex-col justify-between lg:ml-10 xl:ml-10 h-[80%]'>
                    <div>
                        <CardIconsTextsBox 
                            locationText={fieldData.userGet.location}
                            distance={String(calculateDistance(33.476281, 43.417747 , (fieldData.userGet.latitude), (fieldData.userGet.longitude) ) )}
                            views="223"
                            phoneNumber={fieldData.phoneNumber}
                        />                     
                    </div>

                    {/* share and follow outline buttons  */}
                    <ShareFollowBtns />

                    {/* services and Offers box */}
                    <ServicesOffers 
                        servicesPath={`/showfield/${fieldData.userGet.id}/services`} 
                        offersPath={`/showfield/${fieldData.userGet.id}/offers`}
                    />

                    {/* to reserve page  */}
                    <LinkToButton 
                        text="احجز الأن"
                        bgColor="Darkgreen"
                        textColor="white"
                        textSize="sm"
                        width="auto"
                        paddingx="0"
                        paddingy="0"
                        path={`/reserve/${id}`}
                    />
                </div>
            </div>

        </div>
    </div>
  )
}

export default ShowFieldDettails