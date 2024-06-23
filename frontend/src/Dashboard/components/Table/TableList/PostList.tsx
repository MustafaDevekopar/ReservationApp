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
import { PostsGet } from '../../../../Api';
import { Post } from '../../../../Reservations';
import { DefaultAvatar, DefaultPost } from "../../../../assets/Image";
import TextShowTogel from "./Components/TextShowTogel";
import TableTitle from "./Components/TableTitle";

type Props = {}

const PostList = (props: Props) => {
    const [post, setPost] = useState<Post[]>([]); 

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const postData = await PostsGet(); 
          setPost(postData);
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
        <Tablehead titleData={["id","المنشور","النص", "الناشر","اسم الملعب", "التارخ", ""]}/>
        
          <TableBody  className="bg-white" >
            {post.map((row) => (
              <TableRow
                key={String(row.id)}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="border-none"
              >
                {/* ========Id=========== */}
                <TableCell component="th" scope="row" align="center">{row.id}</TableCell>
                {/* ========Post=========== */}
                <TableCell className="flex">
                       <img 
                     src={
                         row.image === null
                         ? DefaultPost
                         : `data:image/png;base64,${row.image}`
                     }
                    alt={"صوره"} className="min-w-20 w-20 object-cover overflow-hidden rounded-md " />
                </TableCell>
                {/* ============post text=========== */}
                <TableCell align="right" className="w-[40%]">
                    <TextShowTogel text={row.text != null ? row.text : "النص غير موجود"}/> 
                </TableCell>
                {/* ============Post Owner avatar=========== */}

                <TableCell align="center" >
                    <div className="flex flex-col justify-center items-center">
                        <img 
                            src={
                                row.field.avatar === null
                                ? DefaultAvatar
                                : `data:image/png;base64,${row.field.avatar}`
                            }
                            alt="صورة" className="object-cover w-12 min-w-12 h-12 rounded-full" 
                        />  
                        <span className="text-xs font-buld">{row.field.username}</span>  
                    </div>                          
                </TableCell>
                {/* ============Post Owner name=========== */}

                <TableCell >
                    <span className="">{row.field.name}</span>                                            
                </TableCell>                    

                {/* ============post date=========== */}
                <TableCell >
                    {"date "}
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

export default PostList