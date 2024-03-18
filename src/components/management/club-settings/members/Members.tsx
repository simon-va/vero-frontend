import { FC } from 'react';
import {
    Box,
    Divider, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useAppSelector } from '../../../../hooks/redux.ts';
import { selectMembers } from '../../../../redux-modules/members/selectors.ts';

const Members: FC = () => {
    const members = useAppSelector(selectMembers);

    return (
        <Box>
            <Typography variant="body1" sx={ { p: 2 } }>
                Mitglieder machen den Verein zu dem, was er ist. Hier kannst du Mitglieder hinzufügen, bearbeiten und
                löschen.
            </Typography>
            <Divider/>
            <TableContainer component={ Paper }>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Admin</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { members.map((member) => (
                            <TableRow key={ member.id }>
                                <TableCell>{ member.firstName }</TableCell>
                                <TableCell>{ member.lastName }</TableCell>
                                <TableCell>{ member.email }</TableCell>
                                <TableCell>{ member.isAdmin ? 'Yes' : 'No' }</TableCell>
                            </TableRow>
                        )) }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Members;