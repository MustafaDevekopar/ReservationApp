
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import "./Table.css";
import {Icon} from "@iconify-icon/react"
import { User } from "../../../AdminType";
import { UsersGet } from "../../../AdminApi";
import Tablehead from "./Components/Tablehead";
import TableTitle from "./Components/TableTitle";
import { DefaultAvatar } from "../../../../assets/Image";

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
      <TableTitle tableTitle="المستخدمين"/>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Tablehead titleData={["id","المستخدم","الاسم", "رقم الهاتف", "التاريخ", "نوع", ""]}/>

          <TableBody  className="bg-white" >
            {user.map((row) => (
              <TableRow
                key={row.userGet.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="border-none"
              >
                <TableCell component="th" scope="row" align="center">
                  {row.userGet.id}
                </TableCell>
                {/* ============Post Owner avatar=========== */}

                <TableCell align="center" >
                    <div className="flex flex-col justify-center items-center">
                        <img 
                            src={
                                row.userGet.avatar === null
                                ? DefaultAvatar
                                : `data:image/png;base64,${row.userGet.avatar}`
                            }
                            alt="صورة" className="object-cover w-12 min-w-12 h-12 rounded-full outline-1 outline outline-white" 
                        />  
                        <span className="text-xs font-buld">{row.userName}</span>  
                    </div>                          
                </TableCell>
                <TableCell align="center" className="flex flex-col">
                  {row.userGet.name != null ? row.userGet.name : "غير معروف" }
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