import { Icon } from '@iconify-icon/react'
import { Link, useParams } from 'react-router-dom'


type Props = {}

const SettingsPage = (props: Props) => {
    const { userId } = useParams<{ userId?: string }>();
  return (
    <div className="flex flex-col  gap-4 max-w-md min-w-2xl mx-auto mt-12">
        <h2 className="text-xl text-center text-DarkGray font-bold">الاعدادات</h2>
        <Link to={`/location/${userId}`} className="flex items-center gap-2 mx-2">
            <Icon icon="typcn:location" className="text-Darkgreen text-2xl"/>
            <span className="text-sm font-bold text-DarkGray">تعديل الموقع الجغرافي</span>
        </Link>
        <Link to={""} className="flex items-center gap-2 mx-2">
            <Icon icon="flowbite:language-outline" className="text-Darkgreen text-2xl"/>
            <span className="text-sm font-bold text-DarkGray">اللغة</span>
        </Link>
        <Link to={""} className="flex items-center gap-2 mx-2">
            <Icon icon="ic:outline-notifications-active"  className="text-Darkgreen text-2xl"/>
            <span className="text-sm font-bold text-DarkGray">الاشعارات</span>
        </Link>
        <Link to={""} className="flex items-center gap-2 mx-2">
            <Icon icon="iconoir:settings-profiles" className="text-Darkgreen text-2xl"/>
            <span className="text-sm font-bold text-DarkGray">توثيق الحساب</span>
        </Link>
        <Link to={""} className="flex items-center gap-2 mx-2">
            <Icon icon="hugeicons:profile-02" className="text-Darkgreen text-2xl"/>
            <span className="text-sm font-bold text-DarkGray"> الملف الشخصي</span>
        </Link>
        <Link to={""} className="flex items-center gap-2 mx-2">
            <Icon icon="carbon:password"  className="text-Darkgreen text-2xl"/>
            <span className="text-sm font-bold text-DarkGray">كلمة المرور</span>
        </Link>
    </div>
  )
}

export default SettingsPage