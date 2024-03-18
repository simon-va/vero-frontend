import { StylesTheme } from '../../../types/mui.ts';

const styles: StylesTheme = {
    root: {
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    left: {
        paddingLeft: '16px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit'
    },
    right: {
        paddingRight: '16px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    iconButton: {
        color: (theme) => theme.palette.text.primary
    }
};

export default styles;