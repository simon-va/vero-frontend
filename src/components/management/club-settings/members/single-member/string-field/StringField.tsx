import { ChangeEvent, FC, useState } from 'react';
import { TableCell, useTheme } from '@mui/material';

interface StringFieldProps {
    value: string;
    memberId: number;
    key: string;
}

const StringField: FC<StringFieldProps> = ({ value, memberId, key }) => {
    const [localString, setLocalString] = useState(value);

    const theme = useTheme();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLocalString(event.target.value);
    };

    const handleBlur = () => {
        console.log('Update string');
    };

    return (
        <TableCell>
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
