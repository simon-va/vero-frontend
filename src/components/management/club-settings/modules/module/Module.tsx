import { FC } from 'react';
import { Box, Checkbox, Collapse, Divider, IconButton, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import type { Module as IModule } from '../../../../../types/module';
import { useAppDispatch } from '../../../../../hooks/redux.ts';
import { saveModuleFromClubDelete, saveModuleToClubAdd } from '../../../../../redux-modules/clubs/actions.ts';

interface ModuleProps {
    module: IModule;
    handleExpand: (id: number) => void;
    isExpanded: boolean;
}

const Module: FC<ModuleProps> = ({ module, handleExpand, isExpanded }) => {
    const { id, name, description, isSelected, isComingSoon } = module;
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
                gap: '12px',
                height: '53px',
            } }>
                <IconButton
                    edge="end"
                    onClick={ () => handleExpand(id) }
                    sx={ { backgroundColor: 'transparent' } }
                >
                    { isExpanded ? <ExpandLess/> : <ExpandMore/> }
                </IconButton>
                <Typography onClick={ () => handleExpand(id) } sx={ { flex: 1, userSelect: 'none', cursor: 'pointer' } }>
                    { name } { isComingSoon && (
                    <Typography component='span' sx={ { fontSize: '10px', opacity: 0.8 } }>(Coming soon)</Typography>
                ) }
                </Typography>
                <Checkbox
                    disabled={ isComingSoon }
                    sx={ { marginRight: '26px' } }
                    checked={ isSelected }
                    onChange={ handleClick }
                />
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