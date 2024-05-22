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
  text: String;
  dateTime: Date;
  user: {
      id: number;
      name: string;
      username: string;
      avatar: Text | null ;
    }
  }
