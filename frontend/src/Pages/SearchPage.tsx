//import { information } from "../Api"
import CardList from "../Components/Lists/CardList"
import DropdownCat from "../Components/Dropdowns/DropdownCat"
//import  Card  from "./../Components/Cards/Card"
// import {information} from "./../Api"

type Props = {}

const SearchPage: React.FC<Props> = (props: Props): JSX.Element => {
  return (
    <div >
        <div className="flex justify-center items-center w-full ">
            <div className="flex gap-1 mx-3 sm:mx-6  md:mx-12 lg:mr-20 lg:ml-8  w-full my-6 ">
                <DropdownCat />
                <DropdownCat />
            </div>
        </div>
      <div className=" flex justify-center items-center w-full ">
        <CardList />
      </div>
    </div>
  )
}

export default SearchPage