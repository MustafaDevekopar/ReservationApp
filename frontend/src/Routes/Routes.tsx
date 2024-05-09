import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import SearchPage from "../Pages/SearchPage";
import FavoritePage from "../Pages/FavoritePage";
import ReservationsPage from "../Pages/ReservationsPage";
import PostPage from "../Pages/PostPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "favorite", element: <FavoritePage /> },
            { path: "search", element: <SearchPage /> },
            { path: "reservations", element: <ReservationsPage /> },
            { path: "posts", element: <PostPage /> },
        ],
    }
])