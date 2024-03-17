import { FC } from 'react';
import { Box, IconButton, Link, Typography } from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import styles from './header.styles';


const Header: FC = () => {
    return (
        <Box sx={ styles.root }>
            <Link href="/" sx={ styles.left }>
                <CameraIcon fontSize="large" color="primary"/>
                <Typography variant="h4">
                    VerO
                </Typography>
            </Link>
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