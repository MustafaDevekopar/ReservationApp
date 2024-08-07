// import axios from "axios";
// import axios from "axios";
import axios, { AxiosResponse } from 'axios';
import { FootballFaild, Governorate, Post, User, Comment, ReservationStatus, Reservation, ReservaiotionWithField, UserProfiletype, UserDataType, FieldDataType, ReservationFieldType, CategoryType, LocationDataType, TeamDataType, NotificationDataType } from './Reservations';
 
import {GreenHomeIcon, OutlineHomeIcon, GreenFavoriteIcon, OutLineFavoriteIcon,
    GreenPostsIcon,OutlinePostsIcon, GreenSearchIcon, OutlineSearchIcon ,
    GreenReservationIcon,OutlineReservationIcon} from "./Components/IconsComponent/IconComponent";

    import {HomeIcon, FavoriteIcon, PostsIcon, SearchIcon, ReservationIcon} from "./Components/IconsComponent/IconComponent";

 
   export const NavContentPc = [
     { id: 1, pathAndisSelected: "/", iconSrc: <HomeIcon />,outlineIconSrc: <OutlineHomeIcon />, label: "الرئيسيه"},
    //  { id: 6, pathAndisSelected: "/userprofile/1", iconSrc: <FavoriteIcon />,outlineIconSrc: <OutLineFavoriteIcon />, label: "البرروفايل"},
     { id: 2, pathAndisSelected: "/favorite", iconSrc: <FavoriteIcon />,outlineIconSrc: <OutLineFavoriteIcon />, label: "المفضله"},
     { id: 3, pathAndisSelected: "/posts", iconSrc: <PostsIcon />,outlineIconSrc: <OutlinePostsIcon />, label: "المنشورات"},
     { id: 4, pathAndisSelected: "/search", iconSrc: <SearchIcon />,outlineIconSrc: <OutlineSearchIcon />, label: "البحث"},
     { id: 5, pathAndisSelected: "/reservations/current", iconSrc: <ReservationIcon />,outlineIconSrc: <OutlineReservationIcon />, label: "الحجوزات"},
 
   ];

export const NavContentMobile = [
    { id: 1, pathAndisSelected: "/", iconSrc: <GreenHomeIcon />,outlineIconSrc: <OutlineHomeIcon />, label: "الرئيسيه"},
    // { id: 6, pathAndisSelected: "/userprofile/1", iconSrc: <GreenFavoriteIcon />,outlineIconSrc: <OutLineFavoriteIcon />, label: "بروقايل"},
    { id: 2, pathAndisSelected: "/favorite", iconSrc: <GreenFavoriteIcon />,outlineIconSrc: <OutLineFavoriteIcon />, label: "المفضله"},
    { id: 3, pathAndisSelected: "/posts", iconSrc: <GreenPostsIcon />,outlineIconSrc: <OutlinePostsIcon />, label: "المنشورات"},
    { id: 4, pathAndisSelected: "/search", iconSrc: <GreenSearchIcon />,outlineIconSrc: <OutlineSearchIcon />, label: "البحث"},
    { id: 5, pathAndisSelected: "/reservations/current", iconSrc: <GreenReservationIcon />,outlineIconSrc: <OutlineReservationIcon />, label: "الحجوزات"},

  ];

 /// reseve date 
  export const ReservDateInfo = [
    { id: 1, isReserved: true, isSelected_DateOrTime: "2/23 الخميس" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2/24 الجمعه" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2/25 السبت" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2/26 الاحد" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2/27 الاثنين" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2/28 الثلاثاء" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2/29 الاربعاء" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2/30 الخميس" },
  ];
  
  export const ReservTimeInfo = [
    { id: 1, isReserved: false, isSelected_DateOrTime: "9:00 ص" },
    { id: 2, isReserved: false, isSelected_DateOrTime: "10:00 ص" },
    { id: 3, isReserved: false, isSelected_DateOrTime: "11:00 ص" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "12:00 ص" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "1:00 م" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "2:00 م" },
    { id: 1, isReserved: true, isSelected_DateOrTime: "3:00 م" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "4:00 م" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "5:00 م" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "6:00 م" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "7:00 م" },
    { id: 1, isReserved: true, isSelected_DateOrTime: "8:00 م" },
    { id: 1, isReserved: true, isSelected_DateOrTime: "9:00 م" },
    { id: 1, isReserved: true, isSelected_DateOrTime: "10:00 م" },
    { id: 1, isReserved: false, isSelected_DateOrTime: "11:00 م" },

  ];
  // ======================== api ==========================
 const API_URL = "https://localhost:7249/api/";

  interface AddPostRequest {
    title: string;
    text: string;
    image: File;
  }
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found, please login again');
  }
  export const AddNewPost = async (fieldId: number, postData: AddPostRequest): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('text', postData.text);
      formData.append('image', postData.image);
  
      const response = await axios.post(`https://localhost:7249/api/Post?FieldId=${fieldId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Ensure token is sent
        },
      });
      console.log("responce : " + response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        throw error;
      } else {
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred");
      }
    }
  }
  

export const UsersGet = async (): Promise<User[]> => {
  try {

    const response: AxiosResponse<User[]> = await axios.get<User[]>("https://localhost:7249/api/User");
    console.log(response.data);
    return response.data; // Return the array of users from the response

  } catch(error) {

    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;

    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }

  }
}
export const FootbalfieldsGet = async (): Promise<FieldDataType[]> => {
  try {

    const response: AxiosResponse<FieldDataType[]> = await axios.get<FieldDataType[]>(`${API_URL}FootballFiel`);
    //console.log(response.data);
    return response.data; // Return the array of users from the response

  } catch(error) {

    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;

    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }

  }
}
export const PostsGet = async (): Promise<Post[]> => {
  try {

    const response: AxiosResponse<Post[]> = await axios.get<Post[]>("https://localhost:7249/api/Post");
    return response.data; 

  } catch(error) {

    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }

  }
}
export const PostsOfFieldGet = async (fieldId: number): Promise<Post[]> => {
  try {

    const response: AxiosResponse<Post[]> = await axios.get<Post[]>(`https://localhost:7249/api/Post/${fieldId}/postsfield`);
    return response.data; 

  } catch(error) {

    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }

  }
}


export const FootbalfieldsGetById = async (id: number): Promise<FieldDataType> => {
  try {
    const response: AxiosResponse<FieldDataType> = await axios.get<FieldDataType>(`${API_URL}FootballFiel/${id}`);
    //console.log(response.data);
    return response.data;
  } catch(error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}


export const CommentsGet = async (postId: number): Promise<Comment[]> => {
  try {
    const response: AxiosResponse<Comment[]> = await axios.get<Comment[]>(`https://localhost:7249/api/Comment/${postId}/commentPost`);
    //console.log(response.data);
    return response.data;
  } catch(error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}


interface AddCommentRequest {
  text: string;
}

export const addComment = async (userId: number, postId: String, commentText: string): Promise<void> => {
  try {
    // const requestBody: AddCommentRequest = { text: commentText };
    const requestBody: AddCommentRequest = { text: commentText };
    await axios.post(`https://localhost:7249/api/Comment?userId=${userId}&postId=${postId}`, requestBody);
    //console.log("Comment added successfully");
  } catch(error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

export const GovernorateGet = async (): Promise<Governorate[]> => {
  try {

    const response: AxiosResponse<Governorate[]> = await axios.get<Governorate[]>("https://localhost:7249/api/Governorate");
    // console.log(response.data);
    return response.data; // Return the array of users from the response

  } catch(error) {

    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;

    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }

  }
}
export const CategoryGet = async (): Promise<CategoryType[]> => {
  try {

    const response: AxiosResponse<CategoryType[]> = await axios.get<CategoryType[]>(`${API_URL}Category`);
    // console.log(response.data);
    return response.data; // Return the array of users from the response

  } catch(error) {

    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;

    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }

  }
}


// reserv date 
export const GetReservDate = async (): Promise<ReservationStatus> => {
  try {

    const response: AxiosResponse<ReservationStatus> = await axios.get<ReservationStatus>
    ("https://localhost:7249/api/ReservationStatus/1");
    return response.data; 

  } catch(error) {

    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }

  }
}
export const GetReservationsOfField = async (fieldId: number): Promise<Reservation[]> => {
  try {

    const response: AxiosResponse<Reservation[]> = await axios.get<Reservation[]>
    (`https://localhost:7249/api/Reservation/field/${fieldId}`);
    return response.data; 

  } catch(error) {

    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }

  }
}


//========== get reservation of field by token ============
export const GetMyReservationsOfField = async (isFieldOwner: boolean): Promise<ReservationFieldType[]> => {

  const endPoient_url = isFieldOwner ?"Reservation/MyReservationsField" : "Reservation/MyReservationsUser" ;
  try {

    const response: AxiosResponse<ReservationFieldType[]> = await axios.get<ReservationFieldType[]>
    ( API_URL + endPoient_url,{
      headers: {
        'Authorization': `Bearer ${token}` // Ensure token is sent
      },
    });

    return response.data; 

  } catch(error) {

    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }

  }
}

// ==========delete reservation by id ============
export const DeleteReservation = async (reservationId: string): Promise<string> => {
  try {
    const response = await axios.delete(API_URL + `Reservation/${reservationId}`, {
      headers: {
        'Authorization': `Bearer ${token}` // Ensure token is sent
      },
    });

    return response.data; // Return the response data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}


export const GetReservationsOfUser = async (userId: number): Promise<ReservaiotionWithField[]> => {
  try {

    const response: AxiosResponse<ReservaiotionWithField[]> = await axios.get<ReservaiotionWithField[]>
    (`https://localhost:7249/api/Reservation/user/${userId}`);
    return response.data; 

  } catch(error) {

    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }

  }
}


interface AddReserveBody {
  dateTime: string;
}
export const addReserve = async (fieldId: number, dateTimeValue: string): Promise<void> => {
  try {
    const requestBody: AddReserveBody = { dateTime: dateTimeValue };
    //console.log(requestBody)
    await axios.post(`https://localhost:7249/api/Reservation?fieldId=${fieldId}`, requestBody,{
        headers: {
        'Authorization': `Bearer ${token}` // Ensure token is sent
      },    
    }

    );
    //console.log("Reserved successfully");
  } catch(error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

// ==========updat user avatar ===============


export const UpdateUserAvatar = async (userId: number, image: File, isUserAvatar: boolean): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('Avatar', image);
    const EndPoint_URL = isUserAvatar ? `User/${userId}/avatar` : `FootballFiel/updateFieldAvatar/${userId}` ;

    const response = await axios.put(API_URL + EndPoint_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        //'Authorization': `Bearer ${token}` // Ensure token is sent
      },
    });

    //console.log("Avatar updated successfully");
    return response.data; // Return the response data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}
// ==========updat user profile ===============


export const UpdateUserProfile = async (userId: number, updatData: UserProfiletype): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('userName', updatData.userName);
    formData.append('name', updatData.name);
    formData.append('biography', updatData.biography);

    const response = await axios.put(`${API_URL}User/updateUser/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        //'Authorization': `Bearer ${token}` // Ensure token is sent
      },
    });

    //console.log("responce: " + response.data);
    return response.data; // Return the response data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}


// ==========updat user location ===============

export const UpdateUserLocation = async (userId: number, LocationData: LocationDataType, isField: boolean): Promise<string> => {
  try {
    const Url = isField ? `${API_URL}FootballFiel/updateLocation/${userId}`: `${API_URL}User/updateLocation/${userId}`;
    const formData = new FormData();
    formData.append('Latitude', LocationData.latitude);
    formData.append('Longitude', LocationData.longitude);
  

    const response = await axios.put(Url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    //console.log("responce: " + response.data);
    return response.data; // Return the response data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}
// ==========updat user profile ===============


export const UpdateFieldProfile = async (userId: number, updatData: UserProfiletype): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('userName', updatData.userName);
    formData.append('name', updatData.name);
    formData.append('biography', updatData.biography);

    const response = await axios.put(`${API_URL}FootballFiel/updateProfile/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        //'Authorization': `Bearer ${token}` // Ensure token is sent
      },
    });

    //console.log("responce: " + response.data);
    return response.data; // Return the response data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}


// ==========updat user ===============


export const UpdateUser = async (userId: number, patchData: any) => {
  try {
    const response = await axios.patch(`${URL}/${userId}`, patchData, {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    });
    //console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw error.response?.data || 'Unknown error occurred';
  }
};

// =============== getuserById ==========
export const UserGetById = async (userId: number): Promise<UserDataType> => {
  try {
    const response: AxiosResponse<UserDataType> = await axios.get<UserDataType>(`${API_URL}User/${userId}`);
    //console.log(response.data);
    return response.data;
  } catch(error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}


// =============== getuserById ==========
export const UserOrFieldGetByUsername = async (Usename: string, isFieldOwner: boolean): Promise<UserDataType> => {
  const endpoint_url = isFieldOwner ? `FootballFiel/FieldByUsername/${Usename}`: `User/UserByUsername/${Usename}`;
  try {
    const response: AxiosResponse<UserDataType> = await axios.get<UserDataType>(API_URL + endpoint_url);
    //console.log(response.data);
    return response.data;
  } catch(error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}


// =============== get team ById ==========
export const GetAllTeamsByUserId = async (userId: number): Promise<TeamDataType[]> => {
  try {
    const response: AxiosResponse<TeamDataType[]> = await axios.get<TeamDataType[]>(`${API_URL}Team/user/${userId}/teams`);
    //console.log(response.data);
    return response.data;
  } catch(error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}



// ==========updat Opting Hours ===============

export const updateOpeningHours = async (fieldId: string, openingHours: string[]): Promise<any> => {
  try {
    const response = await axios.put(`${API_URL}FootballFiel/UpdateHours`, {
      fieldId,
      openingHours,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` ,
      },
    });
    console.log(" mYresponce : "+ response);
    return response;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}


// Update NotificationsResponse to match API response
interface NotificationsResponse {
  notifications: NotificationDataType[];
  totalNotifications: number;
}

export const NotificationsGetByserId = async (id: number, page: number, pageSize: number, isFieldOwner: boolean): Promise<NotificationsResponse> => {
  const UserOrField = isFieldOwner ? `fieldId/${id}` : `userId/${id}`;
  try {
    const response: AxiosResponse<NotificationsResponse> = await axios.get<NotificationsResponse>(
      `${API_URL}Notification/${UserOrField}`,
      {
        params: {
          page,
          pageSize
        }
      }
    );
    console.log('API Response:', response.data); // Log the response data to verify its structure
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}



// export const NotificationsGetByserId = async (id: number, isFieldOwner: boolean): Promise<NotificationDataType[]> => {
//   const UserOrField = isFieldOwner ? `fieldId/${id}` : `userId/${id}`;
//   try {
//     const response: AxiosResponse<NotificationDataType[]> = await axios.get<NotificationDataType[]>   
//         (`${API_URL}Notification/${UserOrField}` );
//     //console.log(response.data);
//     return response.data;
//   } catch(error) {
//     if (axios.isAxiosError(error)) {
//       console.error("Axios error:", error.message);
//       throw error;
//     } else {
//       console.error("Unexpected error:", error);
//       throw new Error("An unexpected error occurred");
//     }
//   }
// }
// get notification by notificationIdId
export const NotificationsGetById = async (notificationId: number): Promise<NotificationDataType> => {
  try {
    const response: AxiosResponse<NotificationDataType> = await axios.get<NotificationDataType>   
        (`${API_URL}Notification/${notificationId}` );
    //console.log(response.data);
    return response.data;
  } catch(error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

// update IsRead notification 

export const UpdateIsReadNotification = async (userId: number, notificationId: number): Promise<boolean> => {
  try {
    const response = await axios.put(`${API_URL}Notification/${notificationId}/markAsRead?userId=${userId}`
      , {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
    }
  );

    return response.status == 200; // Return true if the status is 200 (OK)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}
// update IsAccepted notification 

export const UpdateIsAcceptedUser = async (userId: number, notificationId: number, isAccepted: boolean): Promise<boolean> => {
  try {
    const response = await axios.put(`${API_URL}Notification/${notificationId}/isAccepted?userId=${userId}&isAccept=${isAccepted}`
      , {
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`,
      },
    }
  );

    return response.status == 200; // Return true if the status is 200 (OK)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

// notification count of user 
export const getNotificationCountByUserId = async (userId: number): Promise<number> => {
  try {
    const response = await axios.get<number>(`${API_URL}Notification/user/${userId}/count`);
    return response.data;
  } catch (error) {
    console.error('Error fetching notification count:', error);
    throw error;
  }
};

// notification to team 
export const sendNotificationToTeam = async (userId: number, fieldId: number, teamId: number, reservationId: number): Promise<void> => {
  try {
    await axios.post(`${API_URL}Notification/createTeamNotification?teamId=${teamId}&fieldId=${fieldId}&reservationId=${reservationId}`
      , {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};




// =============== User Search ==========
export const UsersSearchEndPoint = async (keyword: string, userId: number): Promise<User[]> => {
  try {
    const response: AxiosResponse<User[]> = await axios.get<User[]>(`${API_URL}User/search?keyword=${keyword}&excludeUserId=${userId}`);
    //console.log(response.data);
    return response.data;
  } catch(error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}


//========

interface CreateTeamParams {
  name: string;
  teamLeaderId: string;
  avatar: File | null;
  userIds: number[];
}

export const CreateTeam = async ({ name, teamLeaderId, avatar, userIds }: CreateTeamParams): Promise<boolean | any> => {
  try{
    const formData = new FormData();
    formData.append('Name', name);
    formData.append('TeamLeaderId', teamLeaderId);
    if (avatar) {
      formData.append('Avatar', avatar);
    }

    userIds.forEach((id, index) => {
      formData.append(`UserIds[${index}]`, id.toString());
    });

    // Add team leader ID to user IDs
    formData.append(`UserIds[${userIds.length}]`, teamLeaderId);

    const response =  await axios.post('https://localhost:7249/api/team', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }); 
    return response.status == 200 ; 
    
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error("Axios error:", error.message);
    throw error;
  } else {
    console.error("Unexpected error:", error);
    throw new Error("An unexpected error occurred");
  }
}
};