import React from 'react'

type Props = {
    tableTitle: string;
}

const TableTitle = ({tableTitle}: Props) => {
  return (
    <div>
        <h3>{tableTitle}</h3>
    </div>
  )
}

export default TableTitle