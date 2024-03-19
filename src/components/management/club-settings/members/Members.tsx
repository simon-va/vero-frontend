import { FC } from 'react';
import {
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
import SingleMember from './single-member/SingleMember.tsx';

const titles = [
    {
        name: 'Vorname',
        width: '80px'
    },
    {
        name: 'Nachname',
        width: '120px'
    },
    {
        name: 'Email Adresse',
        width: '260px'
    },
    {
        name: 'Telefon',
        width: '160px'
    },
    {
        name: 'Adresse',
        width: 'auto'
    },
    {
        name: 'Stadt',
        width: 'auto'
    },
    {
        name: 'PLZ',
        width: 'auto'
    }
];

const Members: FC = () => {
    const members = useAppSelector(selectMembers);

    return (
        <>
            <Typography variant="body1" sx={ { p: 2 } }>
                Mitglieder machen den Verein zu dem, was er ist. Hier kannst du Mitglieder hinzufügen, bearbeiten und
                löschen.
            </Typography>
            <Divider/>
            <TableContainer component={ Paper } sx={ {
                maxHeight: '700px',
                mt: '12px'
            } }>
                <Table
                    stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            { titles.map((title) => (
                                <TableCell key={ title.name } style={ { width: title.width } }>
                                    { title.name }
                                </TableCell>
                            )) }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { members.map((member) => (
                            <SingleMember key={ member.id } member={ member }/>
                        )) }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Members;