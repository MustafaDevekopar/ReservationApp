
import { useParams } from "react-router";
import { FieldDataType, FootballFaild } from "../../Reservations";
import { useEffect, useState } from "react";
import { FootbalfieldsGetById } from "../../Api";
type Props = {}

const FieldInformation = (props: Props) => {

const { fieldId } = useParams<{ fieldId?: string }>(); // Dynamically retrieve the id parameter from the URL
const [fieldData, setFieldData] = useState<FieldDataType | null>(null); // State to store the fetched data

useEffect(() => {
  const fetchData = async () => {
    try {
      if (!fieldId) return; // Exit early if id is undefined

      const data = await FootbalfieldsGetById(parseInt(fieldId)); // Convert id to number
      setFieldData(data); // Update state with the fetched data
    } catch (error) {
      console.error('Error fetching football field data:', error);
    }
  };

  fetchData();
}, [fieldId]); 

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