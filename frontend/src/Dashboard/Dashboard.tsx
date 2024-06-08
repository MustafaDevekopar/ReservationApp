
import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RigtSide/RightSide";
import Sidebar from "./components/Sidebar";
import "./Dashboard.css";


type Props = {}

const Dashboard = (props: Props) => {
  return (
    //sm:mx-6  md:mx-6 lg:mx-60 xl:mx-60
  <div className="bg-dashboardGradient sm:h-auto md:h-auto lg:h-screen xl:h-screen flex items-center justify-center mx-0 px-0 ">
    <div className="bg-Glass h-[97%] w-[97%] rounded-3xl  
    grid grid-cols-1  gap-4 
    lg:grid-cols-[12%,65%,auto] xl:grid-cols-[12%,65%,auto]" >
    <Sidebar/>
    <MainDash/>
    <RightSide/>    

  </div>
  </div>
  )
}

export default Dashboard