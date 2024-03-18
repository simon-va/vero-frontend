import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import styles from './header.styles.ts';
import Account from './account/Account.tsx';
import { useAppSelector } from '../../../hooks/redux.ts';
import { selectSelectedClub } from '../../../redux-modules/clubs/selectors.ts';


const Header: FC = () => {
    const club = useAppSelector(selectSelectedClub);

    return (
        <Box sx={ styles.root }>
            <Box sx={ styles.left }>
                <CameraIcon fontSize="large" color="primary"/>
                <Typography variant="h4">
                    VerO
                </Typography>
            </Box>
            <Box sx={ styles.right }>
                <Typography variant="body2">{club?.name}</Typography>
                <IconButton sx={ styles.iconButton }>
                    <HelpOutlineOutlinedIcon/>
                </IconButton>
                <Account/>
            </Box>
        </Box>
    );
};

export default Header;