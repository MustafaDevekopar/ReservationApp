
import BtnRoundedFull from './BtnRoundedFull'
import {WhiteConfirmIcon, WhitClose} from "./../../Components/IconsComponent/IconComponent"

type Props = {
  onClick: () => void;
}


const ConfirmOrBackBox: React.FC<Props> = ({onClick}) : JSX.Element => {
  return (
    <div className="flex justify-between m-4">
        <BtnRoundedFull
            text="رجوع"
            bgColor='bg-red-500'
            Icon = {<WhitClose />}
            onClick={console.log}
        />
        <BtnRoundedFull
            text="تأكيد"
            bgColor='bg-blue-600'
            Icon = {<WhiteConfirmIcon />}
            onClick={onClick}
        />
    </div>
  )
}

export default ConfirmOrBackBox