import { KeyboardDatePicker } from '@material-ui/pickers'
import TextFieldInputWrapper from 'assets/jss/material-dashboard-react/components/textFieldStyle'
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import { Box } from '@material-ui/core';
import { TableHeader } from 'views/MemberList/MemberList.styles';
import { Column } from 'views/MemberList/MemberList.styles';
import { TableContainer } from 'views/MemberList/MemberList.styles';
import { TableRow } from 'views/MemberList/MemberList.styles';
import { getFormattedDate } from 'utils/dateNtime';
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";

const headerColumns = [
    {
        id: 1,
        align: "left",
        label: "Date/Time ",
        width: "50%",
    },
    {
        id: 2,
        label: "Status",
        width: "50%",
    },
];

const MemberTrack = ({ member }) => {
    return (
        <Box>
            <GridContainer alignItems='center' justifyContent='space-between'>
                <GridItem md={6} lg={6}>
                    <TextFieldInputWrapper>
                        <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            label="From"
                            format="dd/MM/yyyy"
                            InputAdornmentProps={{ position: "end" }}
                        />
                    </TextFieldInputWrapper>
                </GridItem>
                <GridItem md={6} lg={6}>
                    <TextFieldInputWrapper>
                        <KeyboardDatePicker
                            autoOk
                            variant="inline"
                            label="To"
                            format="dd/MM/yyyy"
                            InputAdornmentProps={{ position: "end" }}
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
                    {member.member_tracks.map((row, index) => {
                        return (
                            <TableRow key={index}>
                                <Column size="50%" alignTo="left">
                                    {getFormattedDate(new Date(row.setCurrentDateTime))}
                                </Column>
                                <Column size="50%">{row.isAvailable ? <Success>
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
