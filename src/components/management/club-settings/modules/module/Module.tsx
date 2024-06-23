import { FC } from 'react';
import { Box, Checkbox, Collapse, Divider, IconButton, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import type { Module as IModule } from '../../../../../types/module';
import { useAppDispatch } from '../../../../../hooks/redux.ts';
import { saveModuleFromClubDelete, saveModuleToClubAdd } from '../../../../../redux-modules/clubs/actions.ts';
import styles from './module.styles.ts';

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
            <Box sx={styles.module}>
                <IconButton
                    edge="end"
                    onClick={() => handleExpand(id)}
                    sx={styles.expandButton}
                >
                    {isExpanded ? <ExpandLess/> : <ExpandMore/>}
                </IconButton>
                <Typography
                    onClick={() => handleExpand(id)}
                    sx={styles.moduleText}
                >
                    {name} {isComingSoon && (
                    <Typography component="span" sx={styles.comingSoon}>(Coming soon)</Typography>
                )}
                </Typography>
                <Checkbox
                    disabled={isComingSoon}
                    sx={styles.checkBox}
                    checked={isSelected}
                    onChange={handleClick}
                />
            </Box>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Typography variant="body2" gutterBottom sx={styles.collapse}>
                    {description}
                </Typography>
            </Collapse>
            <Divider/>
        </>
    );
};

export default Module;
