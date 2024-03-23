import { FC, useState } from 'react';
import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ConfirmDialog from '../../../../../shared/confirm-dialog/ConfirmDialog.tsx';
import { saveTeamDelete } from '../../../../../../redux-modules/teams/actions.ts';
import { useAppDispatch } from '../../../../../../hooks/redux.ts';
import EditMembers from './edit-members/EditMembers.tsx';

interface ContextMenuProps {
    teamId: number;
    name: string;
    isSystemTeam: boolean;
    memberIds: number[];
}

const ContextMenu: FC<ContextMenuProps> = ({ teamId, name, isSystemTeam, memberIds }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = useState<number | null>(null);

    const open = Boolean(anchorEl);

    const dispatch = useAppDispatch();

    const handleMoreClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (dialogId: number) => {
        setOpenDialog(dialogId);

        setAnchorEl(null);
    };

    const handleCloseDialog = () => {
        setOpenDialog(null);
    };

    const handleTeamDelete = () => {
        void dispatch(saveTeamDelete({ teamId }));
    };

    return (
        <>
            <IconButton
                onClick={ handleMoreClick }
                sx={ {
                    marginRight: '8px'
                } }
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={ anchorEl }
                open={ open }
                onClose={ handleClose }
            >
                <MenuItem onClick={ () => handleClose(1) }>
                    <ListItemIcon>
                        <EditOutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    Mitglieder bearbeiten
                </MenuItem>
                { !isSystemTeam && (
                    <MenuItem onClick={ () => handleClose(2) }>
                        <ListItemIcon>
                            <DeleteOutlineOutlinedIcon fontSize="small" color="error"/>
                        </ListItemIcon>
                        <Typography color="error">
                            Gruppe löschen
                        </Typography>
                    </MenuItem>
                ) }
            </Menu>
            <EditMembers
                isOpen={ openDialog === 1 }
                onClose={ handleCloseDialog }
                teamId={ teamId }
                memberIds={ memberIds }
            />
            <ConfirmDialog
                isOpen={ openDialog === 2 }
                onClose={ handleCloseDialog }
                onConfirm={ handleTeamDelete }
                title="Gruppe löschen"
                message={ `Möchtest du die Gruppe ${ name } wirklich löschen? Alle Mitglieder werden entfernt. Diese Aktion kann nicht rückgängig gemacht werden.` }
            />
        </>
    );
};

export default ContextMenu;