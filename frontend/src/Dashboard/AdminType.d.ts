export interface User {
    id: string,
    userName: string,
    phoneNumber: string,
    accountType: string,
    userGet: {
      id: number,
      name: string,
      createdAt: string,
      avatar: string|null,
    }
  }
  
export interface Field {
    id: string,
    userName: string,
    phoneNumber: string,
    accountType: string,
    fieldGet: {
      id: number,
      name: string,
      createdAt: string,
      location: string,
      createdAt: string,
      avatar: string|null,
    }
  }

  export type UserProfileToken = {
    userName: string;
    phonenumber: string;
    token: string;
    accountType: string;
}

export type UserProfile = {
    userName: string;
    phonenumber: string;
    accountType: string;
}
  
