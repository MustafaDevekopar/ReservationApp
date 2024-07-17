
import BtnRoundedFull from './BtnRoundedFull'
import {WhiteConfirmIcon, WhitClose} from "./../../Components/IconsComponent/IconComponent"
import { Icon } from '@iconify-icon/react';

type Props = {
  onClick: () => void;
  text: string;
  bgColor:string;
  icon: string;
}


const ConfirmOrBackBox: React.FC<Props> = ({onClick, text, bgColor, icon}) : JSX.Element => {
  return (
    <div className="flex justify-between m-4">
        {/* <BtnRoundedFull
            text="رجوع"
            bgColor='bg-red-500'
            Icon = {<WhitClose />}
            onClick={console.log}
        /> */}
        <BtnRoundedFull
            text={text}
            bgColor={bgColor}
            Icon = {<Icon icon={icon} className="text-2xl"/>}
            onClick={onClick}
        />
    </div>
  )
}

export default ConfirmOrBackBox