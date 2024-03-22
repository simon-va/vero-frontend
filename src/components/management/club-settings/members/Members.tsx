import { FC } from 'react';
import {
    Box,
    Divider,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useAppSelector } from '../../../../hooks/redux.ts';
import { selectMembers } from '../../../../redux-modules/members/selectors.ts';
import SingleMember from './single-member/SingleMember.tsx';
import AddMember from './add-member/AddMember.tsx';
import styles from './members.styles.ts';

const titles = [
    {
        name: '',
        width: 'auto',
        key: 'delete'
    },
    {
        name: 'Vorname',
        width: 'auto'
    },
    {
        name: 'Nachname',
        width: 'auto'
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
        width: '80px'
    },
    {
        name: 'PLZ',
        width: '80px'
    }
];

const Members: FC = () => {
    const members = useAppSelector(selectMembers);

    return (
        <>
            <Typography variant="body1" sx={styles.intro}>
                Mitglieder machen den Verein zu dem, was er ist. Hier kannst du Mitglieder hinzufügen, bearbeiten und
                löschen.
            </Typography>
            <Divider/>
            <AddMember/>
            <Box sx={styles.tableWrapper}>
                <TableContainer sx={styles.tableContainer}>
                    <Table
                        stickyHeader
                    >
                        <TableHead>
                            <TableRow>
                                {titles.map((title) => (
                                    <TableCell
                                        key={title?.key ?? title.name}
                                        sx={{
                                            width: title.width,
                                            padding: '10px 6px'
                                        }}
                                    >
                                        {title.name}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {members.map((member) => (
                                <SingleMember key={member.id} member={member}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};

export default Members;
