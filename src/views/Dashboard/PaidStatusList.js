import React from 'react'
import { StatusHeaderColumns } from './InStatusList'
import { TableRow } from 'views/MemberList/MemberList.styles';
import { TableContainer } from 'views/MemberList/MemberList.styles';
import { Column } from 'views/MemberList/MemberList.styles';
import { TableHeader } from 'views/MemberList/MemberList.styles';
import ActionButtonsGroup from "components/ActionButtonsGroup/ActionButtonsGroup";

const PaidStatusList = ({ list, handleViewClick }) => {
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
                    <Column size="5%">
                      <ActionButtonsGroup viewIcon  OnViewClick={handleViewClick(row.id)}/>
                    </Column>
                </TableRow>
                ))}
            </TableContainer>
        </div>
    )
}

export default PaidStatusList
