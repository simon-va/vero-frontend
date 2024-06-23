import { FC, useState } from 'react';
import { selectModules } from '../../../../redux-modules/modules/selectors.ts';
import { useAppSelector } from '../../../../hooks/redux.ts';
import {
    Box,
    Divider,
    Table,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import Module from './module/Module.tsx';
import styles from './modules.styles.ts';


const Modules: FC = () => {
    const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);

    const modules = useAppSelector(selectModules);

    const handleExpand = (id: number) => {
        setExpandedModuleId((prev) => prev === id ? null : id);
    };

    return (
        <Box>
            <Typography variant="body1" sx={styles.intro}>
                Module sind Erweiterungen für die Verwaltung des Vereins. Sie können beliebig hinzugefügt oder entfernt
                werden. Keine Sorge, die Daten bleiben erhalten, auch wenn das Modul nicht benuzt wird.
            </Typography>
            <Divider/>
            <Box sx={styles.tableWrapper}>
                <Table
                    stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={styles.moduleName}
                            >
                                Modul
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={styles.useName}
                            >
                                Benutzen
                            </TableCell>
                        </TableRow>
                    </TableHead>

                </Table>
                {modules.map((module) => (
                    <Module
                        module={module}
                        key={module.id}
                        handleExpand={handleExpand}
                        isExpanded={expandedModuleId === module.id}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Modules;
