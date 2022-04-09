import React from 'react'
import { TableRow } from 'views/MemberList/MemberList.styles';
import { TableContainer } from 'views/MemberList/MemberList.styles';
import { Column } from 'views/MemberList/MemberList.styles';
import { TableHeader } from 'views/MemberList/MemberList.styles';
import { StatusHeaderColumns } from './InStatusList'

const OutStatusList = ({ list }) => {
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

export default OutStatusList