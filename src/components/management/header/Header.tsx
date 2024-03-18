import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import styles from './header.styles.ts';


const Header: FC = () => {
    return (
        <Box sx={ styles.root }>
            <Box sx={ styles.left }>
                <CameraIcon fontSize="large" color="primary"/>
                <Typography variant="h4">
                    VerO
                </Typography>
            </Box>
            <Box sx={ styles.right }>
                <Typography variant="body2">MGV Sängerbund 1885</Typography>
                <IconButton sx={ styles.iconButton }>
                    <HelpOutlineOutlinedIcon/>
                </IconButton>
                <IconButton sx={ styles.iconButton }>
                    <AccountCircleOutlinedIcon/>
                </IconButton>
            </Box>
        </Box>
    );
};

export default Header;