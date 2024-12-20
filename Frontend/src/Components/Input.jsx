import React from 'react'

const Input = ({label, name, register, type="", required="", errors,placeholder="", onChange=""}) => {



    return (
        <>
            <label
                htmlFor={name}
                className="mb-1 inline-block text-gray-300">
                {label}
            </label>
            <input
                placeholder={placeholder}
                type={type}
                {...register(name, {required : required})}
                className="mb-4 rounded-lg border bg-transparent px-3 py-2" />
        </>
    )
}

export default Input