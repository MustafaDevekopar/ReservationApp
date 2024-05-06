import './App.css';
import NavBarIcons from './Components/Navbar/NavBarIcons';
import NavBarIconsMobile from './Components/Navbar/NavBarIconsMobile';
import Navbar from './Components/Navbar/Navbar';
import HomPage from './Pages/HomPage';

function App() {
  return (
    <div className="App ">
      <Navbar />
      <NavBarIconsMobile/>
      <NavBarIcons />
      <HomPage />
      {/* <Card /> */}
    </div>
  );
}

export default App;
