import { FC, useState, MouseEvent } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import ConfirmDialog from '../../../../../shared/confirm-dialog/ConfirmDialog.tsx';
import {
    saveMemberDelete,
    saveRemoveUserFromMember
} from '../../../../../../redux-modules/members/actions.ts';
import { useAppDispatch } from '../../../../../../hooks/redux.ts';
import AssignUser from './assign-user/AssignUser.tsx';

interface ContextMenuProps {
    memberId: number;
    userId: number | null;
}

const ContextMenu: FC<ContextMenuProps> = ({ memberId , userId}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [openDialogId, setOpenDialogId] = useState<number | null>(null);

    const isMenuOpen = Boolean(anchorEl);

    const dispatch = useAppDispatch();

    const handleOpenMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleOpenDialog = (dialogId: number) => {
        setOpenDialogId(dialogId);

        setAnchorEl(null);
    };

    const handleCloseDialog = () => {
        setOpenDialogId(null);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDeleteMember = () => {
        void dispatch(saveMemberDelete(memberId));
        setOpenDialogId(null);
    };

    const handleRemoveUser = () => {
        void dispatch(saveRemoveUserFromMember(memberId));

        setOpenDialogId(null);
    };

    return (
        <>
            <IconButton
                onClick={ handleOpenMenu }
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                anchorEl={ anchorEl }
                open={ isMenuOpen }
                onClose={ handleCloseMenu }
            >
                <MenuItem onClick={ () => handleOpenDialog(1) }>
                    <ListItemIcon>
                        <PersonAddAlt1OutlinedIcon fontSize="small"/>
                    </ListItemIcon>
                    <Typography>
                        Benutzer zuweisen
                    </Typography>
                </MenuItem>
                {userId && (
                    <MenuItem onClick={ () => handleOpenDialog(2) }>
                        <ListItemIcon>
                            <PersonRemoveAlt1OutlinedIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography>
                            Benutzer entfernen
                        </Typography>
                    </MenuItem>
                )}
                <MenuItem onClick={ () => handleOpenDialog(3) }>
                    <ListItemIcon>
                        <DeleteOutlineOutlinedIcon fontSize="small" color="error"/>
                    </ListItemIcon>
                    <Typography color="error">
                        Mitglied löschen
                    </Typography>
                </MenuItem>
            </Menu>
            <AssignUser
                isOpen={ openDialogId === 1 }
                onClose={ handleCloseDialog }
                memberId={ memberId }
            />
            <ConfirmDialog
                isOpen={ openDialogId === 2 }
                onClose={ handleCloseDialog }
                onConfirm={ handleRemoveUser }
                title="Benutzer entfernen"
                message="Der zugewiesene Benutzer wird entfernt. Diese Aktion kann nicht rückgängig gemacht werden."
            />
            <ConfirmDialog
                isOpen={ openDialogId === 3 }
                onClose={ handleCloseDialog }
                onConfirm={ handleDeleteMember }
                title="Mitglied löschen"
                message="Alle Verbindungen zu diesem Mitglied werden gelöscht. Diese Aktion kann nicht rückgängig gemacht werden."
            />
        </>
    );
};

export default ContextMenu;