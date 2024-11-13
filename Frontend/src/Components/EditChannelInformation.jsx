import React, { useState } from 'react'
import { timeZoneOptions } from '../contrants'
import { useParams } from 'react-router-dom'

const EditChannelInFormation = () => {


    const { username } = useParams()
    console.log(username)

    const [formData, setFormData] = useState()

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }


    const handleChannelEdit = (event) => {
        event.preventDefault()


    }



    return (
        <>
            <div className="flex flex-wrap justify-center gap-y-4 py-4">
                <div className="w-full sm:w-1/2 lg:w-1/3">
                    <h5 className="font-semibold">Channel Info</h5>
                    <p className="text-gray-300">Update your Channel details here.</p>
                </div>
                <form className="w-full sm:w-1/2 lg:w-2/3" onSubmit={handleChannelEdit}>
                    <div className="rounded-lg border">
                        <div className="flex flex-wrap gap-y-4 p-4">
                            <div className="w-full">
                                <label
                                    className="mb-1 inline-block"
                                    htmlFor="username">
                                    Username
                                </label>
                                <div className="flex rounded-lg border">
                                    <p className="flex shrink-0 items-center border-r border-white px-3 align-middle">vidplay.com/</p>
                                    <input
                                        onChange={handleChange}
                                        name="username"
                                        type="text"
                                        className="w-full bg-transparent px-2 py-1.5"
                                        id="username"
                                        placeholder="@username"
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <label
                                    className="mb-1 inline-block"
                                    htmlFor="desc">
                                    Description
                                </label>
                                <textarea
                                    onChange={handleChange}
                                    name='description'
                                    className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                                    rows="4"
                                    id="desc"
                                    placeholder="Channel Description">

                                </textarea>
                                <p className="mt-0.5 text-sm text-gray-300">275 characters left</p>
                            </div>

                            <div className="w-full">
                                <label
                                    className="mb-1 inline-block"
                                    htmlFor="timezone">
                                    Timezone
                                </label>
                                <div className="relative w-full rounded-lg border">
                                    <div className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300">

                                    </div>
                                    <select
                                        onChange={handleChange}
                                        name='timezone'

                                        id="timezone"
                                        className="w-full border-r-8 border-transparent bg-black text-white py-1.5 pl-8">
                                        {
                                            timeZoneOptions.map((cur) => (
                                                <option key={cur.value} value={cur.value}>{cur.html}</option>
                                            ))
                                        }
                                    </select>
                                </div>

                            </div>
                        </div>
                        <hr className="border border-gray-300" />
                        <div className="flex items-center justify-end gap-4 p-4">
                            <button className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10">Cancel</button>
                            <button type='submit' className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black">Save changes</button>
                        </div>
                    </div>
                </form>
            </div>

        </>

    )
}

export default EditChannelInFormation