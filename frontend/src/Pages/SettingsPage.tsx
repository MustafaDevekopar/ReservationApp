import { Icon } from '@iconify-icon/react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../Context/useAuth';


type Props = {}

const SettingsPage = (props: Props) => {
    const { userId } = useParams<{ userId?: string }>();
    const {isLoggedIn, user} = useAuth();


  return (
    <div className="flex flex-col  gap-4 max-w-md min-w-2xl mx-auto mt-12">
        <h2 className="text-xl text-center text-DarkGray font-bold">الاعدادات</h2>
        <Link to={`/location/${userId}`} className="flex items-center gap-2 mx-2">
        <Icon icon="pajamas:location" className="text-Darkgreen text-2xl"/>
            <span className="text-sm font-bold text-DarkGray">تعديل الموقع الجغرافي</span>
        </Link>
        {
            isLoggedIn()  && user?.accountType === "FieldOwner" && (
            <Link to={`/opening-time/${userId}`} className="flex items-center gap-2 mx-2">
            <Icon icon="mdi:clipboard-text-date-outline"  className="text-Darkgreen text-2xl"/>
                <span className="text-sm font-bold text-DarkGray">تعديل  ساعات افتتاح الملعب</span>
            </Link> )
        }
        {
            isLoggedIn()  && user?.accountType !== "FieldOwner" && (
            <Link to={`/team-create/${userId}`} className="flex items-center gap-2 mx-2">
            <Icon icon="fluent:people-team-add-24-regular"  className="text-Darkgreen text-2xl"/>
                <span className="text-sm font-bold text-DarkGray">انشاء فريق</span>
            </Link> )
        }
        <Link to={ isLoggedIn()  && user?.accountType !== "FieldOwner" ? `/profile/update/${userId}` : ""} className="flex items-center gap-2 mx-2">
            <Icon icon="mingcute:profile-line"   className="text-Darkgreen text-2xl"/>
            <span className="text-sm font-bold text-DarkGray">  تعديل الملف الشخصي</span>
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
            <Icon icon="grommet-icons:validate" className="text-Darkgreen text-2xl"/>
            <span className="text-sm font-bold text-DarkGray">توثيق الحساب</span>
        </Link>
        <Link to={""} className="flex items-center gap-2 mx-2">
        <Icon icon="charm:shield-keyhole"  className="text-Darkgreen text-2xl"/>
            <span className="text-sm font-bold text-DarkGray">كلمة المرور</span>
        </Link>
    </div>
  )
}

export default SettingsPage