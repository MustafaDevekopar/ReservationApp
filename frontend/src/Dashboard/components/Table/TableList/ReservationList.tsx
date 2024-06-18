import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./../Table.css";
import {Icon} from "@iconify-icon/react"
import Tablehead from "./Components/Tablehead";
import { DefaultAvatar, DefaultPost } from "../../../../assets/Image";
import TextShowTogel from "./Components/TextShowTogel";
import TableTitle from "./Components/TableTitle";
import { ReservationGet } from "../../../AdminApi";
import { ReservationType } from "../../../AdminType";
import { formatDate } from "../../../../Components/ReserveElement/Helpers";

type Props = {}

const ReservationList = (props: Props) => {
    const [reservation, setReservation] = useState<ReservationType[]>([]); 

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const data = await ReservationGet(); 
          setReservation(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []);

    return (
        <div className="overflow-x-hidden">
      <TableTitle tableTitle="المنشورات"/>
      <TableContainer 
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Tablehead titleData={["id","صورة","معلومات الملعب", "صاحب الحجز","username","موعد الحجز", ""]}/>
        
          <TableBody  className="bg-white" >
            {reservation.map((row) => (
              <TableRow
                key={String(row.id)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="border-none"
              >
                {/* 1========Id=========== */}
                <TableCell component="th" scope="row" align="center">{row.id}</TableCell>
                {/* 1========image=========== */}
                <TableCell className="">
                    <div className="flex flex-col justify-center items-center">
                        <img 
                            src={
                                row.fieldGet.avatar === null
                                ? DefaultPost
                                : `data:image/png;base64,${row.fieldGet.avatar}`
                            }
                            alt={"صوره"} className="min-w-16 w-16 object-cover overflow-hidden rounded-md " />
                        <span className="text-xs font-buld">{row.fieldGet.username}</span>  
                    </div>
                </TableCell>
                {/* 3============field info=========== */}
                <TableCell align="center" >
                    <div className="flex flex-col">
                        <span className="">{row.fieldGet.name}</span>                                            
                        <span className="">{row.fieldGet.phoneNumber}</span>
                    </div>                            
                </TableCell>
                {/* 4============ reservation owner=========== */}

                <TableCell align="center" >
                    <div className="flex flex-col justify-center items-center">
                        <img 
                            src={
                                row.userGet.avatar === null
                                ? DefaultAvatar
                                : `data:image/png;base64,${row.userGet.avatar}`
                            }
                            alt="صورة" className="object-cover w-12 min-w-12 h-12 rounded-full" 
                        />  
                        <span className="text-xs font-buld">{row.userGet.username}</span>  
                    </div>                          
                </TableCell>
                {/* 5============Post Owner name=========== */}

                <TableCell align="center">
                    <div className="flex flex-col">
                        <span className="">{row.userGet.name}</span>                                            
                        <span className="">{row.userGet.phoneNumber}</span>                         
                    </div>                                        
                </TableCell>                    

                {/* ============reservation date=========== */}
                <TableCell >
                    <span>{formatDate(new Date(row.dateTime))}</span>
                </TableCell>
                <TableCell  className="w-30 min-w-30 flex ">
                  <Icon icon="fluent:delete-48-filled" className="text-red-600 text-2xl"/>
                  <Icon icon="mdi:shield-tick" className="text-Darkgreen text-2xl"/>{/* icon="mdi:tick-decagram */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
      );
}

export default ReservationList