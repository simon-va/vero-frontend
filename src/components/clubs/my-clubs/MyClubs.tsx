import { FC } from 'react';
import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.ts';
import { selectClubs } from '../../../redux-modules/clubs/selectors.ts';
import { setSelectedClubId } from '../../../redux-modules/clubs/slice.ts';
import { setRoute } from '../../../redux-modules/app/slice.ts';

const MyClubs: FC = () => {
    const clubs = useAppSelector(selectClubs);

    const dispatch = useAppDispatch();

    const handleSelectClub = (clubId: number) => {
        dispatch(setSelectedClubId(clubId));
        dispatch(setRoute('/management'));
    };

    return (
        <List component="nav">
            {
                clubs.map((club) => (
                    <ListItemButton key={ club.id } onClick={ () => handleSelectClub(club.id) }>
                        <ListItemText primary={ club.name }/>
                    </ListItemButton>
                ))
            }
            {
                clubs.length === 0 && (
                    <Typography variant="body2" sx={ { textAlign: 'center' } }>
                        Du bist in keinem Verein
                    </Typography>
                )
            }
        </List>
    );
};

export default MyClubs;