import { FC } from 'react';
import { Box, Checkbox, Collapse, Divider, IconButton, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useAppDispatch } from '../../../../../hooks/redux.ts';
import { saveModuleFromClubDelete, saveModuleToClubAdd } from '../../../../../redux-modules/clubs/actions.ts';

interface ModuleProps {
    id: number;
    name: string;
    description: string;
    handleExpand: (id: number) => void;
    isExpanded: boolean;
    isSelected: boolean;
}

const Module: FC<ModuleProps> = ({ id, name, handleExpand, isExpanded, isSelected, description }) => {
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (isSelected) {
            void dispatch(saveModuleFromClubDelete({ moduleId: id }));
        } else {
            void dispatch(saveModuleToClubAdd({ moduleId: id }));
        }
    };

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
                <Checkbox sx={ { marginRight: '26px' } } checked={ isSelected } onChange={ handleClick }/>
            </Box>
            <Collapse in={ isExpanded } timeout="auto" unmountOnExit>
                <Typography variant="body2" gutterBottom sx={ { marginLeft: '40px' } }>
                    { description }
                </Typography>
            </Collapse>
            <Divider/>
        </>
    );
};

export default Module;