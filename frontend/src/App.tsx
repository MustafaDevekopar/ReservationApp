import { Favorite } from '@mui/icons-material';
import './App.css';
import NavBarIcons from './Components/Navbar/NavBarIcons';
import NavBarIconsMobile from './Components/Navbar/NavBarIconsMobile';
import Navbar from './Components/Navbar/Navbar';
import HomPage from './Pages/HomPage';
import FavoritePage from './Pages/FavoritePage';

function App() {
  return (
    <div className="App ">
      <Navbar />
      <NavBarIconsMobile/>
      <NavBarIcons />
      <HomPage />
      {/* <FavoritePage /> */}
    </div>
  );
}

export default App;
