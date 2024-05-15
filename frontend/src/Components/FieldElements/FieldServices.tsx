
import { GreenConfirm } from '../IconsComponent/IconComponent'

type Props = {}

const FieldServices = (props: Props) => {
  return (
    <div className="flex w-full bg-white text-LightGray rounded-xl shadow-md p-4 mt-8">
    <div className="flex-1">
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
            <span>تحكيم مجاني</span>
        </div>           
    </div>
    <div className="flex-1">
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
    </div>



</div>
  )
}

export default FieldServices