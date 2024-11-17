import React from 'react'

const EditInput = ({name, label, onChange, className, type="text", value= ""}) => {
    return (
        <div className={`w-full  lg:pl-2 ${className ? className : "" }`}>
            <label
                htmlFor="lastname"
                className="mb-1 inline-block">
                {label}
            </label>
            <input
                value={value}
                onChange={onChange}
                name= {name}
                type={type}
                className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                placeholder={`Enter ${label}`}
            />
        </div>
    )
}

export default EditInput