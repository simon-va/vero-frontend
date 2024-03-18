import { FC } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { useAppSelector } from '../../../../hooks/redux.ts';
import { selectTeams } from '../../../../redux-modules/teams/selectors.ts';
import { StylesTheme } from '../../../../types/mui.ts';
import Team from './team/Team.tsx';


const styles: StylesTheme = {
    teamsWrapper: {
        display: 'flex',
        gap: '20px',
        padding: '12px',
        maxWidth: '80vw',
        overflowX: 'scroll'
    }
};

const Teams: FC = () => {
    const teams = useAppSelector(selectTeams);

    return (
        <Box>
            <Typography variant="body1" sx={ { p: 2 } }>
                Mit Teams können Mitglieder im Verein gruppiert werden. Beim Fußball könnte das zum Beispiel eine
                Mannschaft sein.
            </Typography>
            <Divider/>
            <Box sx={ styles.teamsWrapper }>
                { teams.map((team) => (
                    <Team key={ team.id } team={ team }/>
                )) }
            </Box>
        </Box>
    );
};

export default Teams;