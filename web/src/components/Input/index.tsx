import React, { useEffect, useRef, InputHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import './styles.css';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

const Input: React.FC<IInput> = function ({ name, label, children, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, defaultValue, registerField } = useField(name);

    useEffect(function () {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField])

    return (
        <div className="input-block">
            <label htmlFor={name}> {label} </label>
            {children ?
                <div className="container-input">
                    <input ref={inputRef} defaultValue={defaultValue} type="text" autoComplete="off" {...rest} />
                    { children }
                </div>
                :
                <input ref={inputRef} defaultValue={defaultValue} type="text" autoComplete="off" {...rest} />
            }

        </div>
    );
}

export default Input;