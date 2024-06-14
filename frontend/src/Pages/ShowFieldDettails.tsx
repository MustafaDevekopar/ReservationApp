
import CardIconsTextsBox from '../Components/CardElements/CardIconsTextsBox'
import ShareFollowBtns from '../Components/FieldElements/ShareFollowBtns'
import ServicesOffers from '../Components/FieldElements/ServicesOffers'
import LinkToButton from '../Components/Buttons/LinkToButton'
import ImageShowField from '../Components/FieldElements/ImageShowField'
import FieldTitleRateingLikes from '../Components/FieldElements/FieldTitleRateingLikes'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { FootbalfieldsGetById } from '../Api'
import { FootballFaild } from '../Reservations'
//import { fileURLToPath } from 'url'
import { calculateDistance } from '../Helper/Helper'
  
  type Props = {}

    const ShowFieldDettails: React.FC<Props> = (): JSX.Element  => {
        const { id } = useParams<{ id?: string }>(); // Dynamically retrieve the id parameter from the URL
        const [fieldData, setFieldData] = useState<FootballFaild | null>(null); // State to store the fetched data
      
        useEffect(() => {
          const fetchData = async () => {
            try {
              if (!id) return; // Exit early if id is undefined
      
              const data = await FootbalfieldsGetById(parseInt(id)); // Convert id to number
              setFieldData(data); // Update state with the fetched data
            } catch (error) {
              console.error('Error fetching football field data:', error);
            }
          };
      
          fetchData(); // Call fetchData function when the component mounts or id changes
        }, [id]); // Include id in the dependency array
      
        if (!fieldData) {
          return <div>Loading...</div>; // Add loading indicator while fetching data
        }

  return (
    <div className="static flex justify-center w-full lg:px-10 xl:px-10 lg:pt-10 xl:pt-10 h-screen">
        <div className="flex flex-col lg:flex-row-reverse xl:flex-row-reverse lg:mx-12  w-full h-full">

            <ImageShowField imageSrc={fieldData.avatar}/>

            <div className="px-3 md:p-4 lg:m-0 xl:m-0 lg:flex-1 xl:flex-1 h-full ">
                <FieldTitleRateingLikes 
                    fieldName={fieldData.name}
                    rating="3.5"
                    likes="163"
                />

                <div className=' flex flex-col justify-between lg:ml-10 xl:ml-10 h-[80%]'>
                    <div>
                        <CardIconsTextsBox 
                            locationText={fieldData.location}
                            distance={String(calculateDistance(33.476281, 43.417747 , (fieldData.latitude), (fieldData.longitude) ) )}
                            views="223"
                            phoneNumber={fieldData.phoneNumbr}
                        />                     
                    </div>

                    {/* share and follow outline buttons  */}
                    <ShareFollowBtns />

                    {/* services and Offers box */}
                    <ServicesOffers 
                        servicesPath={`/showfield/${fieldData.id}/services`} 
                        offersPath={`/showfield/${fieldData.id}/offers`}
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