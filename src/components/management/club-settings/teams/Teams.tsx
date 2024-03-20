import { FC, useState } from 'react';
import { Box, Divider, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useAppSelector } from '../../../../hooks/redux.ts';
import { selectTeams } from '../../../../redux-modules/teams/selectors.ts';
import Team from './team/Team.tsx';
import AddTeam from './add-team/AddTeam.tsx';


const Teams: FC = () => {
    const [expandedModuleId, setExpandedModuleId] = useState<number | null>(null);

    const teams = useAppSelector(selectTeams);

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
            <AddTeam/>
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
                { teams.map((team) => (
                    <Team
                        key={ team.id }
                        team={ team }
                        handleExpand={ handleExpand }
                        isExpanded={ expandedModuleId === team.id }
                    />
                )) }
            </Box>
        </Box>
    );
};

export default Teams;
