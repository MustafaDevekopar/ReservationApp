
import { FieldDataType} from "../../Reservations";

type Props = {
  fieldData: FieldDataType | null;
}

const FieldInformation = ({fieldData}: Props) => {



if (!fieldData) {
  return <div>
    <h2 className="mb-2 text-DarkGray">.....</h2>
 </div>;
}
  return (
    <div>
        <h2 className="mb-2 text-DarkGray">الحجوزات المتاحه ل {fieldData.userGet.name}</h2>
    </div>
  )
}

export default FieldInformation