import { FC, useState } from 'react';
import { Box, Divider, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useAppSelector } from '../../../../hooks/redux.ts';
import { selectGroups } from '../../../../redux-modules/groups/selectors.ts';
import Group from './group/Group.tsx';
import AddGroup from './add-group/AddGroup.tsx';


const Groups: FC = () => {
    const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);

    const groups = useAppSelector(selectGroups);

    const handleExpand = (id: number) => {
        setExpandedModuleId((prev) => prev === id ? null : id);
    };

    return (
        <Box>
            <Typography variant="body1" sx={ { p: 2 } }>
                Mit Gruppen können Mitglieder im Verein gruppiert werden. Beim Fußball könnte das zum Beispiel eine
                Mannschaft sein.
            </Typography>
            <Divider/>
            <AddGroup/>
            <Box sx={ {
                marginTop: '12px',
                width: '600px'
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
                                Gruppe
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                { groups.map((group) => (
                    <Group
                        key={ group.id }
                        group={ group }
                        handleExpand={ handleExpand }
                        isExpanded={ expandedModuleId === group.id }
                    />
                )) }
            </Box>
        </Box>
    );
};

export default Groups;
