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
import UsersPage from "../Pages/UsersPage";
import ShowFieldDettails from "../Pages/ShowFieldDettails";
import AddPost from "../Pages/AddPost";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../Dashboard/Dashboard";
import UserList from "../Dashboard/components/Table/TableList/UserList";
import FieldList from "../Dashboard/components/Table/TableList/FieldList";
import RoleProtectedRoute from "./RoleProtectedRoute";
import AddNewAdminPage from "../Dashboard/AddNewAdminPage";
import PostList from "../Dashboard/components/Table/TableList/PostList";
import UpdateProfilePage from "../Pages/UpdateProfilePage";
import UserProfilePage from "../Pages/ProfileUserPage";
import UpdateFieldProfilePage from "../Pages/UpdateFieldProfilePage";
import ProfileFieldPage from "../Pages/ProfileFieldPage";
import ReservationList from "../Dashboard/components/Table/TableList/ReservationList";
import SettingsPage from "../Pages/SettingsPage";
import LocationUpdatePage from "../Pages/LocationUpdatePage";
import OpeningHoursPage from "../Pages/OpeningHoursPage";
import NotificationPage from "../Pages/NotificationPage";
import ShowNotificationPage from "../Pages/ShowNotificationPage";
import AddNotificationPage from "../Pages/AddNotificationPage";
import TeamCreatePage from "../Pages/TeamCreatePage";



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
            { path: "fieldprofile/:userId", element: <ProfileFieldPage />},
            { path: "userprofile/:userId", element: <UserProfilePage />},
            { path: "setting/:userId", element: <SettingsPage />},
            { path: "location/:userId", element: <LocationUpdatePage />},
            { path: "users", element: <UsersPage />},
            { path: "login", element: <LoginPage />},
            { path: "register", element: <RegisterPage />},
            { path: "profile/update/:userId", element: <UpdateProfilePage />},
            { path: "field-update/:userId", element: <UpdateFieldProfilePage />},
            { path: "opening-time/:fieldId", element: <OpeningHoursPage />},
            { path: "notification/:userId", element: <NotificationPage />},
            { path: "showNotification/:notificationId/userId/:userId", element: <ShowNotificationPage />},
            { path: "team-create/:userId", element: <TeamCreatePage/>},
            // { path: "AddNotification/:userId", element: <AddNotificationPage />},
            { path: "AddNotification/fieldId/:fieldId/reservationId/:reservationId/userId/:userId", element: <AddNotificationPage />},
            { path: "addpost/:fieldId", element: 
                <RoleProtectedRoute allowedRoles={['FieldOwner']}>
                    <AddPost />
                </RoleProtectedRoute>},
            { 
                path: "dashboard/", element:
                        <RoleProtectedRoute allowedRoles={['Admin', 'MainAdmin']}>
                            <Dashboard />
                        </RoleProtectedRoute> ,
                children: [
                    {path: "fields" , element: <FieldList />},
                    {path: "Users" , element: <UserList />},
                    {path: "Posts" , element: <PostList />},
                    {path: "reservations" , element: <ReservationList />},
                    {path: "newAdmin" , element: 
                            <RoleProtectedRoute allowedRoles={['MainAdmin']}>
                                <AddNewAdminPage />
                            </RoleProtectedRoute>
                            },
                ],
            },
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