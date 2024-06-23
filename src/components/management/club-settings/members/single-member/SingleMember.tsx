import { FC } from 'react';
import { Member } from '../../../../../types/members.ts';
import { TableCell, TableRow } from '@mui/material';
import StringField from './string-field/StringField.tsx';
import ContextMenu from './context-menu/ContextMenu.tsx';

interface SingleMemberProps {
    member: Member;
}

const SingleMember: FC<SingleMemberProps> = ({ member }) => {
    return (
        <TableRow key={ member.id }>
            <TableCell
                sx={ {
                    padding: '2px'
                } }
            >
                <ContextMenu
                    memberId={ member.id }
                    userId={ member.userId }
                />
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