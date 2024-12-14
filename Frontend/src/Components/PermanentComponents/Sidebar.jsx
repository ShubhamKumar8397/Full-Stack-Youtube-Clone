import React from 'react'
import { sideBarElements } from '../../contrants'
import {SidebarElementButton} from '../index.js'
import { Link } from 'react-router-dom'


const Sidebar = () => {

    return (
        <>
        <div className="group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 border-t border-white bg-[#121212] px-2 py-2 sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] lg:sticky lg:max-w-[250px]">
                    <ul className="flex justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
                        {
                            sideBarElements?.map((cur) => (
                               <Link key={cur.id} to={cur.to}>
                                 <SidebarElementButton key={cur.id} title={cur.title} svg={cur.svg} />
                               </Link>

                            ))
                        }
                        
                        <SidebarElementButton title={"Setting"} svg={"../Public/Logo/support.svg"} className={"hidden sm:block mt-auto"} />
                        <SidebarElementButton title={"Support"} svg={"../Public/Logo/support.svg"} className={"hidden sm:block"} />

                    </ul>
                </div>
        </>
    )
}

export default Sidebar