import { TableCell, TableHead, TableRow } from '@mui/material'

interface Props{
    titleData: string[]; 
}

const Tablehead = ({titleData}: Props) => {
  return (
    <TableHead>
    <TableRow className="font-bold">
    {titleData.map((title) => (
      <TableCell align="center" key={title} >{title}</TableCell>
    ))}
    </TableRow>
  </TableHead>
  )
}

export default Tablehead