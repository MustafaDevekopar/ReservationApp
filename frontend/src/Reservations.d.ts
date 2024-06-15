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
    avatar: Text;
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
    userName: "Mustafa",
    phoneNumber: "07830574093",
    accountType: "User",
    userGet: {
      id: interactive;
      name: string;
      username: string;
      biography : string;
      createdAt : string;
      avatar : Text;
    }

  }

// imag types
declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

