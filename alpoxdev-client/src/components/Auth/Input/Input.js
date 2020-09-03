import React from 'react';
import * as styled from './styled';

export default function AuthInput({
    value,
    setValue,
    name,
    placeholder,
    type
}){
    return(
        <styled.AuthInput
            value={value}
            onChange={setValue}
            type={type}
            name={name}
            placeholder={placeholder}/>
    )
}