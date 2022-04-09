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

const InStatusList = () => {
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
                <TableRow>
                    <Column size={"30%"} alignTo="left">
                        PFG0001
                    </Column>
                    <Column size={"30%"} alignTo="left">
                        John Doe
                    </Column>
                    <Column size={"30%"} alignTo="left">
                        {"8054235662"}
                    </Column>
                </TableRow>
            </TableContainer>
        </div>
    )
}

export default InStatusList
