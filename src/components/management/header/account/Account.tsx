import { FC, useState } from 'react';
import {
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography
} from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { StylesTheme } from '../../../../types/mui.ts';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.ts';
import { selectClubs } from '../../../../redux-modules/clubs/selectors.ts';
import { setSelectedClubId } from '../../../../redux-modules/clubs/slice.ts';
import { Logout, PersonAdd } from '@mui/icons-material';
import { setAccessToken, setSelectedContent } from '../../../../redux-modules/app/slice.ts';

const styles: StylesTheme = {
    iconButton: {
        color: (theme) => theme.palette.text.primary,
        ml: 2
    }
};

const Account: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const clubs = useAppSelector(selectClubs);

    const dispatch = useAppDispatch();

    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectClub = (clubId: number) => {
        dispatch(setSelectedClubId(clubId));
    };

    const handleLogout = () => {
        handleClose();

        localStorage.removeItem('selectedClubId');
        localStorage.removeItem('accessToken');

        dispatch(setSelectedContent(-1));
        dispatch(setSelectedClubId(null));
        dispatch(setAccessToken(null));
    };

    const handleCreateClub = () => {
        handleClose();

        dispatch(setSelectedClubId(null));
    };

    return (
        <>
            <IconButton
                onClick={ handleClick }
                size="small"
                sx={ styles.iconButton }
                aria-controls={ open ? 'account-menu' : undefined }
                aria-haspopup="true"
                aria-expanded={ open ? 'true' : undefined }
            >
                <AccountCircleOutlinedIcon/>
            </IconButton>
            <Menu
                anchorEl={ anchorEl }
                id="account-menu"
                open={ open }
                onClose={ handleClose }
                onClick={ handleClose }

                transformOrigin={ { horizontal: 'right', vertical: 'top' } }
                anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
            >
                <Typography variant="h6" sx={ { textAlign: 'center' } }>Meine Vereine</Typography>
                {
                    clubs.map((club) => (
                        <MenuItem
                            key={ club.id }
                            onClick={ () => handleSelectClub(club.id) }
                        >
                            { club.name }
                        </MenuItem>
                    ))
                }
                <Divider/>
                <MenuItem onClick={ handleCreateClub }>
                    <ListItemIcon>
                        <GroupAddIcon fontSize="small"/>
                    </ListItemIcon>
                    Verein erstellen
                </MenuItem>
                <MenuItem onClick={ handleLogout }>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export default Account;