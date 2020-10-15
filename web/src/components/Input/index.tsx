import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
}

const Input: React.FC<IInput> = function ({ name, label, ...rest }) {
    return (
        <div className="input-block">
            <span> {label} </span>
            <input type="text" {...rest} />
        </div>
    );
}

export default Input;