import React from 'react'
import './InputElement.scss'
const InputElement = (
    {
        label,
        placeholder,
        required,
        error,
        ...otherProps
    }
) => {
    return (
        <div className='input_element_container'>
            <label htmlFor={label} className='form-label' {...otherProps}>{label} <span className='text-danger'>{required ? "*" : ""}</span> </label>
            <input className={`form-control border border-dark ${error ? "input_error" : ""}`} {...otherProps} placeholder={placeholder} id={label} />
            {error && <span className="text-danger error_msg">{error}</span>}
        </div>
    )
}

export default InputElement
