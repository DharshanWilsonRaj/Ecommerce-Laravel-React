import React from 'react'
import './InputElement.scss'
const InputElement = (props) => {
    const {
        label,
        placeholder,
        required,
        error,
        type,
        ...otherProps
    } = props;

    const inputProps = {
        className: `form-control inputs border border-dark ${error ? "input_error" : ""}`,
        placeholder: placeholder,
        id: label,
        ...otherProps
    };

    return (
        <div className='input_element_container'>
            <label
                htmlFor={label}
                className='form-label'
                {...otherProps}>{label} <span className='text-danger'>{required ? "*" : ""}</span>
            </label>

            {type === "textarea" ? <textarea {...inputProps} /> : <input  {...inputProps} />}
            {error && <span className="text-danger error_msg">{error}</span>}
        </div>
    )
}

export default InputElement
