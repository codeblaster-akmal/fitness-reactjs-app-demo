import React from 'react'
import { TableRow } from 'views/MemberList/MemberList.styles';
import { TableContainer } from 'views/MemberList/MemberList.styles';
import { Column } from 'views/MemberList/MemberList.styles';
import { TableHeader } from 'views/MemberList/MemberList.styles';
import { StatusHeaderColumns } from './InStatusList'

const DueStatusList = () => {
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
        </div >
    )
}

export default DueStatusList
