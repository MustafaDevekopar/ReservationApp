import axios, { AxiosResponse } from "axios";
import { ReservationType, User } from "./AdminType";
import { Field } from "./AdminType";

// ==getUser================================
export const UsersGet = async (): Promise<User[]> => {
    try {
  
      const response: AxiosResponse<User[]> = await axios.get<User[]>("https://localhost:7249/api/UserAdmin/users");
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

// ==getfield================================
export const FieldsGet = async (): Promise<Field[]> => {
    try {
  
      const response: AxiosResponse<Field[]> = await axios.get<Field[]>("https://localhost:7249/api/UserAdmin/footbalfields");
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


// ==getfield================================
export const ReservationGet = async (): Promise<ReservationType[]> => {
    try {
  
      const response: AxiosResponse<ReservationType[]> = await axios.get<ReservationType[]>("https://localhost:7249/api/Reservation");
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