import { FC } from 'react';
import {
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useAppSelector } from '../../../../hooks/redux.ts';
import { selectMembers } from '../../../../redux-modules/members/selectors.ts';
import SingleMember from './single-member/SingleMember.tsx';
import AddMember from './add-member/AddMember.tsx';

const titles = [
    {
        name: '',
        width: 'auto',
        key: 'delete'
    },
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
            <AddMember/>
            <Table
                stickyHeader
                sx={ {
                    mt: '12px'
                } }
            >
                <TableHead>
                    <TableRow>
                        { titles.map((title) => (
                            <TableCell
                                key={ title?.key ?? title.name }
                                sx={ {
                                    width: title.width,
                                    padding: '10px 6px'
                                } }
                            >
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
        </>
    );
};

export default Members;