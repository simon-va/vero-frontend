import { Team as ITeam } from '../../../../../types/teams.ts';
import { FC } from 'react';
import {
    Box,
    Collapse,
    Divider,
    IconButton,
    List,
    ListItem,
    Typography
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useAppSelector } from '../../../../../hooks/redux.ts';
import { RootState } from '../../../../../redux-modules';
import { selectMemberByTeamId } from '../../../../../redux-modules/members/selectors.ts';
import ContextMenu from './context-menu/ContextMenu.tsx';

interface TeamProps {
    team: ITeam;
    handleExpand: (id: number) => void;
    isExpanded: boolean;
}

const Team: FC<TeamProps> = ({ team, handleExpand, isExpanded }) => {
    const { id, name, isSystemTeam, memberIds } = team;
    const members = useAppSelector((state: RootState) => selectMemberByTeamId(state, id));

    return (
        <>
            <Box sx={ {
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                height: '53px'
            } }>
                <IconButton
                    edge="end"
                    onClick={ () => handleExpand(id) }
                    sx={ { backgroundColor: 'transparent' } }
                >
                    { isExpanded ? <ExpandLess/> : <ExpandMore/> }
                </IconButton>
                <Typography
                    onClick={ () => handleExpand(id) }
                    sx={ { flex: 1, userSelect: 'none', cursor: 'pointer' } }
                >
                    { name }
                </Typography>
                {
                    <ContextMenu
                        teamId={ id }
                        name={ name }
                        isSystemTeam={ isSystemTeam }
                        memberIds={ memberIds }
                    />
                }
            </Box>
            <Collapse in={ isExpanded } timeout="auto" unmountOnExit>
                <Box
                    sx={ { margin: '0 0 12px 40px' } }
                >
                    { members.length > 0 ? (
                        <List
                            disablePadding
                        >
                            {
                                members.map(({ id: memberId, firstName, lastName }) => (
                                    <ListItem disablePadding
                                              key={ `${ id }-${ memberId }` }>{ firstName } { lastName }</ListItem>
                                ))
                            }
                        </List>
                    ) : (
                        <Box>Keine Mitglieder</Box>
                    ) }
                </Box>
            </Collapse>
            <Divider/>
        </>
    );
};

export default Team;
