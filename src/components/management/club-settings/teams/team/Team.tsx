import { Team as ITeam } from '../../../../../types/teams.ts';
import { FC } from 'react';
import { Box, Collapse, Divider, IconButton, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAppDispatch } from '../../../../../hooks/redux.ts';
import { saveTeamDelete } from '../../../../../redux-modules/teams/actions.ts';

interface TeamProps {
    team: ITeam;
    handleExpand: (id: number) => void;
    isExpanded: boolean;
}

const Team: FC<TeamProps> = ({ team, handleExpand, isExpanded }) => {
    const { id, name, memberIds } = team;

    const dispatch = useAppDispatch();

    const handleDelete = () => {
        void dispatch(saveTeamDelete({ teamId: id }));
    };

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
                <IconButton
                    sx={ {
                        marginRight: '8px'
                    } }
                    onClick={ handleDelete }
                >
                    <DeleteOutlineOutlinedIcon
                        color="error"
                    />
                </IconButton>
            </Box>
            <Collapse in={ isExpanded } timeout="auto" unmountOnExit>
                <Box
                    sx={ { margin: '0 0 12px 40px' } }
                >
                    {
                        memberIds.map((memberId) => (
                            <Box key={memberId}>{ memberId }</Box>
                        ))
                    }
                    { memberIds.length === 0 && <Box>Keine Mitglieder</Box> }
                </Box>
            </Collapse>
            <Divider/>
        </>
    );
};

export default Team;