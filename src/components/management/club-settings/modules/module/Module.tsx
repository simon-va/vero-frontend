import { FC } from 'react';
import { Box, Checkbox, Collapse, Divider, IconButton, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface ModuleProps {
    id: number;
    name: string;
    handleExpand: (id: number) => void;
    isExpanded: boolean;
    isSelected: boolean;
}

const Module: FC<ModuleProps> = ({ id, name, handleExpand, isExpanded, isSelected }) => {
    return (
        <>
            <Box sx={ {
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            } }>
                <IconButton
                    edge="end"
                    onClick={ () => handleExpand(id) }
                    sx={ { backgroundColor: 'transparent' } }
                >
                    { isExpanded ? <ExpandLess/> : <ExpandMore/> }
                </IconButton>
                <Typography onClick={ () => handleExpand(id) } sx={ { flex: 1 } }>
                    { name }
                </Typography>
                <Checkbox sx={ { marginRight: '26px' } } checked={ isSelected }/>
            </Box>
            <Collapse in={ isExpanded } timeout="auto" unmountOnExit>
                <Typography variant="body2" gutterBottom sx={ { marginLeft: '40px' } }>
                    Additional Information:
                </Typography>
            </Collapse>
            <Divider/>
        </>
    );
};

export default Module;