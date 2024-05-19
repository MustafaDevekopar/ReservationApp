
import CardMiniList from "../Components/Lists/CardMiniList";
type Props = {}

const FavoritePage: React.FC<Props> = (props: Props) : JSX.Element => {
  return (
    <div className=" flex justify-center items-center w-full ">
            <CardMiniList />
    </div>
  )
}

export default FavoritePage