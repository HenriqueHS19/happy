import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string;
    label: string;
    description?: string;
}

const Textarea: React.FC<ITextarea> = function ({ name, label, description, ...rest }) {
    return (
        <div className="textarea-block">
            <span>
                {label}
                { description && <p> { description } </p> }

            </span>
            <textarea />
        </div>
    );
}

export default Textarea;