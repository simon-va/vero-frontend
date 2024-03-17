import { StylesTheme } from '../../types/mui.ts';
import { Theme } from '@mui/material';

const styles: StylesTheme = {
    root: {
        backgroundColor: (theme: Theme) => theme.custom.contentBackground,
        height: '100%',
        width: '100%',
        padding: '20px',
        borderTopLeftRadius: '12px'
    }
};

export default styles;