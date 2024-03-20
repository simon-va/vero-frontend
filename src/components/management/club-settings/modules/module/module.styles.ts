import { StylesTheme } from '../../../../../types/mui.ts';

const styles: StylesTheme = {
    module: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        height: '53px'
    },
    expandButton: {
        backgroundColor: 'transparent'
    },
    moduleText: {
        flex: 1,
        userSelect: 'none',
        cursor: 'pointer'
    },
    comingSoon: {
        fontSize: '10px',
        opacity: 0.8
    },
    checkBox: {
        marginRight: '26px'
    },
    collapse: {
        margin: '0 12px 12px 40px'
    }
};

export default styles;
