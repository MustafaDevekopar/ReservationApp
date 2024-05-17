
import CardIconsTextsBox from '../Components/CardElements/CardIconsTextsBox'
import ShareFollowBtns from '../Components/FieldElements/ShareFollowBtns'
import ServicesOffers from '../Components/FieldElements/ServicesOffers'
import LinkToButton from '../Components/Buttons/LinkToButton'
import ImageShowField from '../Components/FieldElements/ImageShowField'
import FieldTitleRateingLikes from '../Components/FieldElements/FieldTitleRateingLikes'

type Props = {}

const ShowFieldDettails: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div className="static flex justify-center w-full lg:px-10 xl:px-10 lg:pt-10 xl:pt-10 h-screen">
        <div className="flex flex-col lg:flex-row-reverse xl:flex-row-reverse lg:mx-12  w-full h-full">

            <ImageShowField imageSrc="https://i.pinimg.com/originals/c2/a5/19/c2a519566d628121523b1e75205586a5.jpg"/>

            <div className="px-3 md:p-4 lg:m-0 xl:m-0 lg:flex-1 xl:flex-1 h-full ">
                <FieldTitleRateingLikes 
                    fieldName="ملعب سباعي الرمادي"
                    rating="3.5"
                    likes="163"
                />

                <div className=' flex flex-col justify-between lg:ml-10 xl:ml-10 h-[80%]'>
                    <div>
                        <CardIconsTextsBox 
                            locationText="الرمادي حي المعلمين"
                            distance="1.2"
                            views="223"
                            phoneNumber="07843876745"
                        />                     
                    </div>

                    {/* share and follow outline buttons  */}
                    <ShareFollowBtns />

                    {/* services and Offers box */}
                    <ServicesOffers />

                    {/* to reserve page  */}
                    <LinkToButton 
                        text="احجز الأن"
                        bgColor="Darkgreen"
                        textColor="white"
                        textSize="sm"
                        width="auto"
                        paddingx="0"
                        paddingy="0"
                        path="/reserve"
                    />
                </div>
            </div>

        </div>
    </div>
  )
}

export default ShowFieldDettails