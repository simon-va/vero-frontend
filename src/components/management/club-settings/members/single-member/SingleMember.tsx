import { FC } from 'react';
import { Member } from '../../../../../types/members.ts';
import { TableRow } from '@mui/material';
import StringField from './string-field/StringField.tsx';

interface SingleMemberProps {
    member: Member;
}

const SingleMember: FC<SingleMemberProps> = ({ member }) => {
    return (
        <TableRow key={ member.id }>
            <StringField
                value={ member.firstName }
                memberId={ member.id }
                key="firstName"
            />
            <StringField
                value={ member.lastName }
                memberId={ member.id }
                key="lastName"
            />
            <StringField
                value={ member.email }
                memberId={ member.id }
                key="email"
            />
            <StringField
                value={ member.phone }
                memberId={ member.id }
                key="phone"
            />
            <StringField
                value={ member.address }
                memberId={ member.id }
                key="address"
            />
            <StringField
                value={ member.city }
                memberId={ member.id }
                key="city"
            />
            <StringField
                value={ member.zipCode }
                memberId={ member.id }
                key="zipCode"
            />
        </TableRow>
    );
};

export default SingleMember;