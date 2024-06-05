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
import FieldServices from "../Components/FieldElements/FieldServices";
import FieldOffers from "../Components/FieldElements/FieldOffers";
import ProfilePage from "../Pages/ProfilePage";
import UsersPage from "../Pages/UsersPage";
import ShowFieldDettails from "../Pages/ShowFieldDettails";
import AddPost from "../Pages/AddPost";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "favorite", element: <FavoritePage /> },
            { path: "posts", element: <PostsPage /> },
            { path: "search", element: <SearchPage /> },
            { path: "reserve/:fieldId", element: <ProtectedRoute> <ReservePage /> </ProtectedRoute> },
            { path: "showpost/:id", element: <ShowPost />},
            { path: "comments/:postId", element: <ShowPostComments />},
            { path: "profile/:fieldId", element: <ProfilePage />},
            { path: "users", element: <UsersPage />},
            { path: "addpost/:fieldId", element: <AddPost />},
            { path: "login", element: <LoginPage />},
            { path: "register", element: <RegisterPage />},
            { 
                path: "reservations/", 
                element: <ReservationsPage />, 
                children: [
                    { path:"current" , element: <ReservationCurrent />},
                    { path:"previous" , element: <ReservationPrevious />},
                ],
            },

            {
                path: "showfield/:id/", 
                element: <ShowFieldDettails />,
                children: [
                    {path: "services", element: <FieldServices />},
                    {path: "offers", element: <FieldOffers />},
                ],
            },

        ],
    }
])