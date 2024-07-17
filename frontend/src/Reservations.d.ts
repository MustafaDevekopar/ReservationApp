export interface FootballFaild {
    id: number;
    name: string;
    username: string;
    password: string;
    phoneNumbr: string;
    location: string;
    avatar: Text;
    latitude: number;
    longitude: number;
}

export interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    phoneNumbr: number;
    createdAt: string;
    avatar: string|null;
    isRead: boolean,
    isAccepted: boolean | null
    isTeamLeader: boolean;
  }

export interface Post {
  id: number;
  title: String;
  text: String;
  image: Text;
  field: {
      id: Number;
      name : String;
      username: String;
      avatar: Text;
    }
}

export interface Governorate {
    id: number;
    name: string;
  }
export interface Comment {
  id: number;
  text: string;
  dateTime: Date;
  user: {
    id: number;
    name: string;
    username: string;
    avatar: string | null;
    }
  }

  type Reservation = {
    id: number;
    dateTime: string;
  };

  export interface ReservationStatus {
    id: number;
    openAt: string;
    closeAt: string;
  }

  export interface ReservaiotionWithField {
      id: number;
      dateTime: string;
      fields: {
        id: number;
        name: string;
        username: string;
        phoneNumbr: string;
      }
  }
// ===========userProfile update data ==========
  export interface UserProfiletype {
    userName: string,
    name : string,
    biography : string; 
  }

  export interface UserDataType {
    id: string;
    userName: string;
    phoneNumber: string;
    accountType: string;
    userGet: {
      id: interactive;
      name: string;
      username: string;
      biography : string;
      createdAt : string;
      avatar : Text ;
      latitude: string;
      longitude: string;
    }
  }
  
  export interface FieldDataType {
    id: string;
    userName: string;
    phoneNumber: string;
    accountType: string;
    userGet: {
      id: number;
      name: string;
      username: string;
      biography : string;
      createdAt : string;
      avatar : Text;
      location: string;
      latitude: number;
      longitude: number;
      openingDays: number
      openingHouer: string;
      governorateGet: {
        id: Number
        name: string;
      }
      categoryGet: {
        id: number;
        Name: string;
      }
    }

  }


  export interface ReservationFieldType {
    id: number;
    dateTime: string;
    userGet: {
      id: number;
      name: string;
      username : string;
      phoneNumber: string;
      avatar: string | null;
    },
    fieldGet: {
      id: number;
      name: string;
      username: string;
      phoneNumber: string;
      avatar: string | null;
    }
  }

export interface  CategoryType {
    id: number;
    name: string;
}

export interface LocationDataType {
  latitude: latitude,
  longitude: longitude,
};
  // export interface UserOrFiledType {
  //   id: number;
  //   name: string;
  //   username: string;
  //   biography: string;
  //   createdAt: string;
  //   avatar:Text;
  // }

// imag types
export interface TeamDataType {
    id: number;
    name: string;
    avatar: string|null;
    teamLeader: User;
    users: User[];
  }

// join in UserNotification 
// export interface userNotifications {
//     Id: number,
//     name: string,
//     username: string,
//     avatar: string,
//     isRead: boolean,
//     isAccepted: boolean | null
//   }
export interface NotificationDataType {
    id: number,
    text: string,
    isAccept: boolean | null,
    isRead: boolean,
    user: {
      id: number,
      name: string,
      username: string,
      avatar: string
    },
    footballField: {
      id: number,
      name: string,
      username : string,
      location : string,
      latitude: number,
      longitude: number,
      avatar: string
    },
    reservation: {
      id: number,
      dateTime: string
    },
    team: {
      id: number,
      name: string,
      avatar: string,
    },
    userNotifications: User[]
}


declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module '*.wav' {
  const value: string;
  export default value;
}



