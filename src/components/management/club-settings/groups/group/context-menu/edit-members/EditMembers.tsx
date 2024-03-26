import { ChangeEvent, FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks/redux.ts';
import {
    selectMembers
} from '../../../../../../../redux-modules/members/selectors.ts';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField, Typography
} from '@mui/material';
import { saveMemberSelectionUpdate } from '../../../../../../../redux-modules/groups/actions.ts';

interface EditMembersProps {
    isOpen: boolean;
    onClose: () => void;
    groupId: number;
    memberIds: number[];
}

const EditMembers: FC<EditMembersProps> = ({ isOpen, onClose, groupId, memberIds }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMembers, setSelectedMembers] = useState<number[]>(memberIds);

    const members = useAppSelector(selectMembers);

    const dispatch = useAppDispatch();

    const filteredMembers = members.filter(
        ({ firstName, lastName }) => `${ firstName } ${ lastName }`.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMemberToggle = (memberId: number) => {
        setSelectedMembers((prevSelected) => {
            if (prevSelected.includes(memberId)) {
                return prevSelected.filter((id) => id !== memberId);
            } else {
                return [...prevSelected, memberId];
            }
        });
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleCancel = () => {
        onClose();
        setTimeout(() => {
            setSelectedMembers(memberIds);

            setSearchQuery('');
        }, 200);
    };

    const handleSave = () => {
        onClose();

        void dispatch(saveMemberSelectionUpdate({
            groupId: groupId,
            prevMemberIds: memberIds,
            memberIds: selectedMembers
        }));
    };

    return (
        <Dialog
            open={ isOpen }
            onClose={ handleCancel }
        >
            <DialogTitle>
                <Typography>
                    Mitglieder auswählen
                </Typography>
                <TextField
                    label="Suchen"
                    fullWidth
                    value={ searchQuery }
                    onChange={ handleSearchChange }
                    size="small"
                    sx={ {
                        margin: '8px 0 4px',
                    } }
                />
            </DialogTitle>
            <DialogContent>
                <List
                    disablePadding
                      sx={ {
                          height: 300
                      } }
                >
                    { filteredMembers.map((member) => {
                        return (
                            <ListItem
                                key={ member.id }
                                disablePadding
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={ selectedMembers.includes(member.id) }
                                        onClick={ () => handleMemberToggle(member.id) }
                                    />
                                </ListItemIcon>
                                <ListItemText
                                >
                                    { `${ member.firstName } ${ member.lastName }` }
                                </ListItemText>
                            </ListItem>
                        );
                    }) }
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={ handleCancel }>
                    Abbrechen
                </Button>
                <Button onClick={ handleSave }>
                    Speichern
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditMembers;