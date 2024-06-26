
import CustomerReview from "../CustomerReview/CustomerReview";
import Updates from "../Updates/Updates";


const RightSide = () => {
  return (
    <div className="flex flex-col mx-2 mt-10 ">
      <div className="w-full">
        <h3>المشرفين</h3>
        <Updates />
      </div>
      <div>
        <h3>Customer Review</h3>
        <CustomerReview />
      </div>
    </div>
  );
};

export default RightSide;
