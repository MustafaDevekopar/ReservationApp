export interface FootballFaild {
    id: number;
    name: string;
    username: string;
    password: string;
    phoneNumbr: string;
    location: string;
    avatar: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    phoneNumbr: number;
    createdAt: string;
    avatar: string;
  }
export interface Post {
  id: number;
  title: String;
  text: String;
  image: Text;
  }
export interface Governorate {
    id: number;
    name: string;
  }
