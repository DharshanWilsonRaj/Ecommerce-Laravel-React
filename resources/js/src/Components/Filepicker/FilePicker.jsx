import React from 'react'

const FilePicker = ({ handlePick = () => { }, ...otherProps }) => {

    const handleFilePicker = (e) => {
        if (e.target?.files?.length !== 0) {
            handlePick(Array.from(e.target.files));
        }
    }
    return (
        <div>
            <input type='file' onChange={handleFilePicker} {...otherProps} />
        </div>
    )
}

export default FilePicker
