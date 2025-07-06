import React from 'react';
import {
    TextInputProps,

} from 'react-native';
import ButtonInput from './ButtonInput.tsx';
import EmailInput from './EmailInput.tsx';
import UserInput from './UserInput.tsx';
import PasswordInput from './PasswordInput.tsx';
import PhoneInput from './PhoneInput.tsx';
import DefaultInput from './DefaultInput.tsx';
import SearchInput from './SearchInput.tsx';

// Define the possible types for the TextInput
type TextInputType =
    | 'user'
    | 'search'
    | 'button'
    | 'email'
    | 'password'
    | 'phone'
    | any
interface TextInputPropsExtended extends TextInputProps {
    type: TextInputType;
    title?: string;
    onPress?: () => void;
    style?: object;
}

export default function TextInput({
    type,
    ...props
}: TextInputPropsExtended) {
    let content;

    switch (type) {
        case 'button':
            content = (<ButtonInput {...props} />);
            break;
        case 'email':
            content = (<EmailInput {...props}/>);
            break;
        case 'user':
            content = (<UserInput {...props} />);
            break;
        case 'search':
            content = (<SearchInput {...props}/>);
            break;
        case 'password':
            content = (
               <PasswordInput {...props}/>
            );
            break;
        case 'phone':
            content = (<PhoneInput {...props}/>);
            break;
        default : content = (<DefaultInput  {...props}/>);
            break;
    }
    return content;
}

