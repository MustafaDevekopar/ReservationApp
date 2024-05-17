import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import SearchPage from "../Pages/SearchPage";
import FavoritePage from "../Pages/FavoritePage";
import ReservationsPage from "../Pages/ReservationsPage";
import ReservationCurrent from "../Components/ReservationElements/ReservationCurrent";
import ReservationPrevious from "../Components/ReservationElements/ReservationPrevious";
import ReservePage from "../Pages/ReservePage";
import PostsPage from "../Pages/PostsPage";
import ShowPost from "../Pages/ShowPost";
import ShowPostComments from "../Pages/ShowPostComments";
import ShowFieldDettails from "../Pages/ShowFieldDettails";
import FieldServices from "../Components/FieldElements/FieldServices";
import FieldOffers from "../Components/FieldElements/FieldOffers";
import ProfilePage from "../Pages/ProfilePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "favorite", element: <FavoritePage /> },
            { path: "posts", element: <PostsPage /> },
            { path: "search", element: <SearchPage /> },
            { 
                path: "reservations/", 
                element: <ReservationsPage />, 
                children: [
                    { path:"current" , element: <ReservationCurrent />},
                    { path:"previous" , element: <ReservationPrevious />},
                ],
            },
            {path: "reserve", element: <ReservePage />},
            {path: "showpost", element: <ShowPost />},
            {
                path: "showfield/", 
                element: <ShowFieldDettails />,
                children: [
                    {path: "services", element: <FieldServices />},
                    {path: "offers", element: <FieldOffers />},
                ],
            },
            {path: "comments", element: <ShowPostComments />},
            {path: "profile", element: <ProfilePage />},
        ],
    }
])