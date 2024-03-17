import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import styles from './contentWrapper.styles.ts';

interface ContentWrapperProps {
    children: ReactNode;
}

const ContentWrapper: FC<ContentWrapperProps> = ({ children }) => (
    <Box sx={ styles.root }>{ children }</Box>
);


export default ContentWrapper;