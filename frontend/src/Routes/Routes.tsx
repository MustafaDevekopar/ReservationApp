import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import SearchPage from "../Pages/SearchPage";
import FavoritePage from "../Pages/FavoritePage";
import ReservationsPage from "../Pages/ReservationsPage";
import PostPage from "../Pages/PostPage";
import ReservationCurrent from "../Components/ReservationElements/ReservationCurrent";
import ReservationPrevious from "../Components/ReservationElements/ReservationPrevious";
import ReservePage from "../Pages/ReservePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "favorite", element: <FavoritePage /> },
            { path: "search", element: <SearchPage /> },
            { path: "posts", element: <PostPage /> },
            { 
                path: "reservations/", 
                element: <ReservationsPage />, 
                children: [
                    { path:"" , element: <ReservationCurrent />},
                    { path:"previous" , element: <ReservationPrevious />},
                ],
            },
            {path: "reserve", element: <ReservePage />}
        ],
    }
])