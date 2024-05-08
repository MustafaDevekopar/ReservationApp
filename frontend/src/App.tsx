import './App.css';
import NavBarIcons from './Components/Navbar/NavBarIcons';
import NavBarIconsMobile from './Components/Navbar/NavBarIconsMobile';
import Navbar from './Components/Navbar/Navbar';
import { Outlet } from 'react-router';

function App() {
  return (
    <div className="App ">
      <Navbar />
      <NavBarIcons />
      <NavBarIconsMobile />
      <Outlet />
      {/* <HomePage /> */}
      {/* <FavoritePage /> */}
      {/* <SearchPage /> */}

    </div>
  );
}

export default App;
