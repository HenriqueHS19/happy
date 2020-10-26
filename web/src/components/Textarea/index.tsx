import React, { useEffect, useRef, TextareaHTMLAttributes } from 'react';
import { useField } from '@unform/core';

import './styles.css';

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
    description?: string;
}

const Textarea: React.FC<ITextarea> = function ({ name, label, description, ...rest }) {

    const textareaRef = useRef(null);
    const { fieldName, defaultValue, registerField } = useField(name);

    useEffect(function () {
        registerField({
            name: fieldName,
            ref: textareaRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <div className="textarea-block">
            <label htmlFor={name}>
                {label}
                { description && <p> { description } </p> }

            </label>
            <textarea ref={textareaRef} defaultValue={defaultValue} {...rest} />
        </div>
    );
}

export default Textarea;