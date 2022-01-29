import { KeyboardDatePicker } from '@material-ui/pickers'
import TextFieldInputWrapper from 'assets/jss/material-dashboard-react/components/textFieldStyle'
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Box } from '@material-ui/core';
import { TableHeader } from 'views/MemberList/MemberList.styles';
import { Column } from 'views/MemberList/MemberList.styles';
import { TableContainer } from 'views/MemberList/MemberList.styles';
import { TableRow } from 'views/MemberList/MemberList.styles';
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import { useState } from 'react';

const headerColumns = [
    {
        id: 1,
        align: "left",
        label: "Date",
        width: "30%",
    },
    {
        id: 2,
        label: "Time",
        width: "30%",
    },
    {
        id: 3,
        label: "Status",
        width: "30%",
    },
];

const MemberTrack = ({ member }) => {

    const [filter, setFilter] = useState({
        from: "",
        to: ""
    });

    const filterFrom = (filter, item) => {
        if (filter.from) return new Date(item.setCurrentDateTime).toISOString().split("T")[0] >= new Date(filter.from).toISOString().split("T")[0];
        else return item;
    };

    const filterTo = (filter, item) => {
        if (filter.to) return new Date(item.setCurrentDateTime).toISOString().split("T")[0] <= new Date(filter.to).toISOString().split("T")[0];
        else return item;
    };

    const filterItems = (filter, item) => {
        return filterFrom(filter, item) && filterTo(filter, item);
    };

    const filterFunction = (item) => {
        if (filter.from || filter.to) {
            if (filterItems(filter, item)) {
                return item;
            }
        } else {
            return item;
        }
    };

    const handleFilter = (labelName) => (e) => {
        setFilter(prevState => {
            return {
                ...prevState,
                [labelName]: e
            }
        });
        return
    };

    return (
        <Box>
            <GridContainer alignItems='center' justifyContent='space-between'>
                <GridItem md={6} lg={6}>
                    <TextFieldInputWrapper>
                        <KeyboardDatePicker
                            inputVariant="filled"
                            autoOk
                            variant="inline"
                            label="From"
                            format="dd/MM/yyyy"
                            InputAdornmentProps={{ position: "end" }}
                            value={filter.from}
                            id="from"
                            name="from"
                            onChange={handleFilter("from")}
                        />
                    </TextFieldInputWrapper>
                </GridItem>
                <GridItem md={6} lg={6}>
                    <TextFieldInputWrapper>
                        <KeyboardDatePicker
                            inputVariant="filled"
                            autoOk
                            variant="inline"
                            label="To"
                            format="dd/MM/yyyy"
                            InputAdornmentProps={{ position: "end" }}
                            id="to"
                            name="to"
                            value={filter.to}
                            onChange={handleFilter("to")}
                        />
                    </TextFieldInputWrapper>
                </GridItem>
            </GridContainer>
            <Box mt={'2rem'}>
                {member.member_tracks.length ? <>
                    <TableHeader>
                        {headerColumns.map((column) => (
                            <Column
                                key={column.id}
                                size={column.width}
                                alignTo={column.align}
                            >
                                {column.label}
                            </Column>
                        ))}
                    </TableHeader>
                    <TableContainer>
                        {member.member_tracks.filter(filterFunction).map((row, index) => {
                            return (
                                <TableRow key={index}>
                                    <Column size="30%" alignTo="left">
                                        {row.tDate}
                                    </Column>
                                    <Column size="30%" alignTo="left">
                                        {row.tTime}
                                    </Column>
                                    <Column size="30%">{row.isAvailable ? <Success>
                                        {"In"}
                                    </Success> : <Warning>{"Out"}</Warning>}</Column>
                                </TableRow>
                            );
                        }
                        )}
                    </TableContainer>
                </> : "No Data..."}
            </Box>
        </Box>
    )
}

export default MemberTrack
