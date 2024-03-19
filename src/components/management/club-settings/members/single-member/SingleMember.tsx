import { FC } from 'react';
import { Member } from '../../../../../types/members.ts';
import { IconButton, TableCell, TableRow } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import StringField from './string-field/StringField.tsx';
import { useAppDispatch } from '../../../../../hooks/redux.ts';
import { saveMemberDelete } from '../../../../../redux-modules/members/actions.ts';

interface SingleMemberProps {
    member: Member;
}

const SingleMember: FC<SingleMemberProps> = ({ member }) => {
    const dispatch = useAppDispatch();

    const handleDeleteMember = () => {
        void dispatch(saveMemberDelete(member.id));
    };

    return (
        <TableRow key={ member.id }>
            <TableCell
                sx={{
                    padding: '2px',
                }}
            >
                <IconButton
                    onClick={ handleDeleteMember }
                >
                    <DeleteOutlineOutlinedIcon
                        color="error"
                    />
                </IconButton>
            </TableCell>
            <StringField
                value={ member.firstName }
                memberId={ member.id }
                keyAtt="firstName"
            />
            <StringField
                value={ member.lastName }
                memberId={ member.id }
                keyAtt="lastName"
            />
            <StringField
                value={ member.email }
                memberId={ member.id }
                keyAtt="email"
            />
            <StringField
                value={ member.phone }
                memberId={ member.id }
                keyAtt="phone"
            />
            <StringField
                value={ member.address }
                memberId={ member.id }
                keyAtt="address"
            />
            <StringField
                value={ member.city }
                memberId={ member.id }
                keyAtt="city"
            />
            <StringField
                value={ member.zipCode }
                memberId={ member.id }
                keyAtt="zipCode"
            />
        </TableRow>
    );
};

export default SingleMember;