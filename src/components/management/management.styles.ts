import { Theme } from '@mui/material';
import { StylesTheme } from '../../types/mui.ts';

const styles: StylesTheme = {
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'stretch'
    },
    content: {
        flex: 1
    },
    contentWrapper: {
        backgroundColor: (theme: Theme) => theme.custom.contentBackground,
        height: '100%',
        width: '100%',
        padding: '20px',
        borderTopLeftRadius: '12px'
    }
};

export default styles;