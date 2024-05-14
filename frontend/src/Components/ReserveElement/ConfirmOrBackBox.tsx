
import BtnRoundedFull from './BtnRoundedFull'
import {WhiteConfirmIcon, WhitClose} from "./../../Components/IconsComponent/IconComponent"

type Props = {}

const ConfirmOrBackBox = (props: Props) => {
  return (
    <div className="flex justify-between items-center w-full m-8 px-8">
        <BtnRoundedFull
            text="رجوع"
            bgColor='bg-red-500'
            Icon = {<WhitClose />}
        />
        <BtnRoundedFull
            text="تأكيد"
            bgColor='bg-blue-600'
            Icon = {<WhiteConfirmIcon />}
        />
    </div>
  )
}

export default ConfirmOrBackBox