import { ChangeEvent, FC, useState } from 'react';
import { TableCell, useTheme } from '@mui/material';
import { useAppDispatch } from '../../../../../../hooks/redux.ts';
import { saveMemberUpdate } from '../../../../../../redux-modules/members/actions.ts';

interface StringFieldProps {
    value: string;
    memberId: number;
    keyAtt: string;
}

const StringField: FC<StringFieldProps> = ({ value, memberId, keyAtt }) => {
    const [localString, setLocalString] = useState(value);

    const theme = useTheme();

    const dispatch = useAppDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocalString(event.target.value);
    };

    const handleBlur = () => {
        void dispatch(saveMemberUpdate({
            memberId,
            payload: {
                [keyAtt]: localString.trim()
            }
        }));
    };

    return (
        <TableCell
            sx={{
                paddingLeft: '6px',
                paddingRight: '6px',
            }}
        >
            <input
                type="text"
                style={ {
                    border: 'none',
                    outline: 'none',
                    background: 'none',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                    color: theme.palette.text.primary,
                    caretColor: theme.palette.text.primary,
                    width: '100%'
                } }
                onBlur={ handleBlur }
                value={ localString }
                onChange={ handleChange }
            />
        </TableCell>
    );
};

export default StringField;
