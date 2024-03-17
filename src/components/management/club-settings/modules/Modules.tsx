import { FC, useState } from 'react';
import { selectModules } from '../../../../redux-modules/modules/selectors.ts';
import { useAppSelector } from '../../../../hooks/redux.ts';
import {
    Box,
    Divider,
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
                Plugins sind Erweiterungen für die Verwaltung des Vereins. Sie können beliebig hinzugefügt werden.
            </Typography>
            <Divider/>

            <Box sx={ {
                marginTop: '12px',
                width: '540px'
            } }>
                <Box sx={ {
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '12px'
                } }>
                    <Typography variant="body1" sx={ { fontWeight: 'bold', paddingLeft: 1 } }>
                        Plugins
                    </Typography>
                    <Typography variant="body1" sx={ { fontWeight: 'bold' } }>
                        Benutzen
                    </Typography>
                </Box>
                <Divider/>
                { modules.map((module) => (
                    <Module
                        id={ module.id }
                        name={ module.name }
                        key={ module.id }
                        handleExpand={ handleExpand }
                        isExpanded={ expandedModuleId === module.id }
                    />
                )) }
            </Box>
        </Box>
    );
};

export default Modules;