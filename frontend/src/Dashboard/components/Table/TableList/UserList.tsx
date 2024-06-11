
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import "./Table.css";
import {Icon} from "@iconify-icon/react"
import { User } from "../../../AdminType";
import { UsersGet } from "../../../AdminApi";

interface Props {}

const UserList = (props: Props) => {
    const [user, setUser] = useState<User[]>([]); 
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const fieldData = await UsersGet(); // Call UsersGet function to fetch users
          setUser(fieldData); // Update state with fetched users
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers(); // Call fetchUsers function when component mounts
    }, []);
  return (
    <div className="overflow-x-hidden">
      <h3>المستخدمين</h3>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="font-bold">
              <TableCell align="center">id</TableCell>
              <TableCell align="center">المستخدم</TableCell>
              <TableCell align="center">رقم الهاتف</TableCell>
              <TableCell align="center">التاريخ</TableCell>
              <TableCell align="center">نوع</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody  className="bg-white" >
            {user.map((row) => (
              <TableRow
                key={String(row.userGet.id)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="border-none"
              >
                <TableCell component="th" scope="row" align="center">{row.userGet.id}</TableCell>
                <TableCell align="center" className="flex flex-col">
                    <div>
                        {row.userGet.name != null ? row.userGet.name : "غير معروف" }
                    </div>
                    <div >
                        {row.userName}
                    </div>
                </TableCell>
                <TableCell align="center">{row.phoneNumber}</TableCell> 
                <TableCell align="center">
                  {row.userGet.createdAt }
                </TableCell>
                <TableCell align="center" className="Details">{row.accountType}</TableCell>
                <TableCell align="center" className="Details ">
                  <Icon icon="fluent:delete-48-filled" className="text-red-600 text-2xl"/>
                  <Icon icon="mdi:shield-tick" className="text-Darkgreen text-2xl"/>{/* icon="mdi:tick-decagram */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserList