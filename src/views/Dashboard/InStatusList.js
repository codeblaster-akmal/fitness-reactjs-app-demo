import React from 'react'
import { TableRow } from 'views/MemberList/MemberList.styles';
import { TableContainer } from 'views/MemberList/MemberList.styles';
import { Column } from 'views/MemberList/MemberList.styles';
import { TableHeader } from 'views/MemberList/MemberList.styles';

export const StatusHeaderColumns = [
    {
        id: 1,
        align: "left",
        label: "ID",
        width: "30%",
    },
    {
        id: 2,
        align: "left",
        label: "Name",
        width: "30%",
    },
    {
        id: 3,
        align: "left",
        label: "Phone",
        width: "30%",
    },
];

const InStatusList = ({ list }) => {
    return (
        <div>
            <TableHeader>
                {StatusHeaderColumns.map(column => (
                    <Column
                        key={column.id}
                        size={column.width}
                        alignTo={column.align}
                    >
                        {column.label}
                    </Column>
                ))}
            </TableHeader>
            <TableContainer staticHeight={'55vh'}>
            {list?.map(row => (
                <TableRow>
                    <Column size={"30%"} alignTo="left">
                    {row?.memberId}
                    </Column>
                    <Column size={"30%"} alignTo="left">
                    {`${row?.firstname} ${row?.lastname}`}
                    </Column>
                    <Column size={"30%"} alignTo="left">
                    {row?.phone}
                    </Column>
                </TableRow>
                ))}
            </TableContainer>
        </div>
    )
}

export default InStatusList
