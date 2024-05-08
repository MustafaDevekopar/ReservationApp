import React from 'react'

type Props = {}

const DropdownCat = (props: Props) => {
  return (
    <div className="relative w-24 lg:max-w-sm">
            <select className="w-full p-1 text-sm text-DarkGray bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-Darkgreen">
                <option className="text-sm" >المحافظة...</option>
                <option className="text-sm">الانبار</option>
                <option className="text-sm">نينوى</option>
                <option className="text-sm">اربيل</option>
                <option className="text-sm">دهوك</option>
                <option className="text-sm">كركوك</option>
            
            </select>
        </div>
  )
}

export default DropdownCat