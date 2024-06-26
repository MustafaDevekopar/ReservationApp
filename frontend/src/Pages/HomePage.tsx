
import SliderMain from "../Components/Sliders/SliderMain"
import CardMiniList from "../Components/Lists/CardMiniList"

type Props = {}

const HomePage: React.FC<Props> = (props: Props): JSX.Element => {

  return (
    <div>
    <div className=" flex justify-center items-center w-full ">
      <div className=" mx-3 sm:mx-6  md:mx-12 lg:mr-24 lg:ml-8  w-full mt-2">
          <SliderMain />
      </div>
    </div>
    <div className=" flex justify-center items-center w-full ">
      <CardMiniList />
    </div>
    </div>
  )
}

export default HomePage