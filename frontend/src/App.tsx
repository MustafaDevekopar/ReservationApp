import './App.css';
import NavBarIcons from './Components/Navbar/NavBarIcons';
import NavBarIconsMobile from './Components/Navbar/NavBarIconsMobile';
import Navbar from './Components/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { UserProvider } from './Context/useAuth';
import { ToastContainer } from 'react-toastify';
import NotificationList from './Components/Lists/NotificationList';
import { NotificationProvider } from './Context/NotificationContext';

function App() {
  // Get the current location using react-router's useLocation hook
   const location = useLocation();

  // Define an array of paths where I want to show navbar and navbar Icon 
  const pathsToHideComponents = ['/', '/favorite', "/search", "/posts", "/reservations/current", "/reservations/previous", "/showpost"];

  // Check if the current path is in the pathsToShowArray array
  const shouldHideComponent = pathsToHideComponents.includes(location.pathname);

  return (// mb-20
    <div className="App"> 
      <UserProvider >
        <NotificationProvider>
          {/* Conditional rendering of Component to show */}
          {shouldHideComponent && <Navbar />}
          {shouldHideComponent && <NavBarIconsMobile />}
          {shouldHideComponent && <NavBarIcons />}
          <Outlet />
            
        <ToastContainer />
        {/* <NotificationList /> */}
        </NotificationProvider>
        {/* <Notification /> */}
      </UserProvider>
    </div>
  );
}

export default App;


