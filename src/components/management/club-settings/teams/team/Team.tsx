import { FC, useCallback } from 'react';
import { Paper, Typography } from '@mui/material';
import { StylesTheme } from '../../../../../types/mui.ts';
import { Team as ITeam } from '../../../../../types/teams.ts';
import { RootState } from '../../../../../redux-modules';
import { selectMemberByTeam } from '../../../../../redux-modules/members/selectors.ts';
import { useAppSelector } from '../../../../../hooks/redux.ts';

const styles: StylesTheme = {
    root: {
        minWidth: '280px',
        height: '540px'
    },
    title: {
        textAlign: 'center',
        padding: '20px 0'
    },
    membersWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '0 20px'
    }
};

interface TeamProps {
    team: ITeam;
}

const Team: FC<TeamProps> = ({ team }) => {
    const membersSelector = useCallback((state: RootState) => selectMemberByTeam(state, team.id), [team.id]);
    const members = useAppSelector(membersSelector);

    return (
        <Paper sx={ styles.root }>
            <Typography variant="h6" sx={ styles.title }>{ team.name }</Typography>
            { members.map((member) => (
                <Typography key={ member.id }>{ member.firstName } { member.lastName }</Typography>
            )) }
        </Paper>
    );
};

export default Team;