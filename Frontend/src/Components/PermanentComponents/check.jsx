import React from 'react'

const check = () => {
    return (
        <div>
            <div class="h-screen overflow-y-auto bg-[#121212] text-white">
                <div class="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
                    <div class="mx-auto inline-block w-16">
                        <img src=".Public/Logo/tubelogo.svg" alt="" />
                    </div>
                    <div class="mb-6 w-full text-center text-2xl font-semibold uppercase">Play</div>
                    
                    <button class="bg-[#ae7aff] px-4 py-3 text-black">Sign in with Email</button>
                </div>
            </div>
        </div>
    )
}

export default check