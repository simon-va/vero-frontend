import { FC, useState } from 'react';
import { selectModules } from '../../../../redux-modules/modules/selectors.ts';
import { useAppSelector } from '../../../../hooks/redux.ts';
import {
    Box,
    Divider,
    Paper,
    Table,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import Module from './module/Module.tsx';


const Modules: FC = () => {
    const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);

    const modules = useAppSelector(selectModules);

    const handleExpand = (id: number) => {
        setExpandedModuleId((prev) => prev === id ? null : id);
    };

    return (
        <Box>
            <Typography variant="body1" sx={ { p: 2 } }>
                Module sind Erweiterungen für die Verwaltung des Vereins. Sie können beliebig hinzugefügt oder entfernt
                werden. Keine Sorge, die Daten bleiben erhalten, auch wenn das Modul nicht benuzt wird.
            </Typography>
            <Divider/>
            <Paper sx={ {
                marginTop: '12px',
                width: '540px'
            } }>
                <Table
                    stickyHeader
                >
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={ {
                                    padding: '10px 6px 10px 16px'
                                } }
                            >
                                Modul
                            </TableCell>
                            <TableCell
                                align="right"
                                sx={ {
                                    fontWeight: 'bold',
                                    padding: '10px 16px 10px 6px'
                                } }
                            >
                                Benutzen
                            </TableCell>
                        </TableRow>
                    </TableHead>

                </Table>
                { modules.map((module) => (
                    <Module
                        module={ module }
                        key={ module.id }
                        handleExpand={ handleExpand }
                        isExpanded={ expandedModuleId === module.id }
                    />
                )) }
            </Paper>
        </Box>
    );
};

export default Modules;