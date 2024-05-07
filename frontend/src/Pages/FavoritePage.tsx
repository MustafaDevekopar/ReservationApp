import CardMini from "../Components/Cards/CardMini"
type Props = {}

const FavoritePage = (props: Props) => {
  return (
    <div className=" flex justify-center items-center w-full ">
        <div className="grid gap-3 
        grid-cols-2 sm:grid-cols-2  md:grid-cols-2  lg:grid-cols-4 
        mx-3 sm:mx-6  md:mx-12 lg:mr-20 lg:ml-8  w-full my-6 ">
            <CardMini />
            <CardMini />
            <CardMini />
            <CardMini />
            <CardMini />
            <CardMini />
            <CardMini />
            <CardMini />
            <CardMini />
            <CardMini />

       </div>
    </div>
  )
}

export default FavoritePage