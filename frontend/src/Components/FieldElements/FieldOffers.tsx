import  {GreenConfirm} from "../IconsComponent/IconComponent"

type Props = {}

const FieldOffers = (props: Props) => {
  return (
    <div className="grid grid-cols-2 grid-rows-5 w-full bg-white text-LightGray rounded-xl shadow-md p-4 mt-8">

            <div className="flex text-xs gap-1 items-center mb-1">
                <GreenConfirm />
                <span className="">تحكيم مجاني</span>
            </div>
            <div className="flex text-xs gap-1 items-center mb-1">
                <GreenConfirm />
                <span>تحكيم مجاني</span>
            </div>
            <div className="flex text-xs gap-1 items-center mb-1">
                <GreenConfirm />
                <span>تحكيم مجاني</span>
            </div>                    

            <div className="flex text-xs gap-1 items-center mb-1">
                <GreenConfirm />
                <span className="">تحكيم مجاني</span>
            </div>
            <div className="flex text-xs gap-1 items-center mb-1">
                <GreenConfirm />
                <span>تحكيم مجاني</span>
            </div>

    </div>
  )
}

export default FieldOffers