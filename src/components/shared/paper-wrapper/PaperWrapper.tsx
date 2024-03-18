import { FC, ReactNode } from 'react';
import { Box, Container, CssBaseline, Paper } from '@mui/material';

interface PaperWrapperProps {
    children: ReactNode;
}

const PaperWrapper: FC<PaperWrapperProps> = ({ children }) => {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box sx={ {
                marginTop: '20vh'
            } }>
                <Paper sx={ {
                    p: 2,
                    height: '500px',
                    mb: '20px',
                    position: 'relative',
                } }>
                    { children }
                </Paper>
            </Box>
        </Container>
    );
};

export default PaperWrapper;