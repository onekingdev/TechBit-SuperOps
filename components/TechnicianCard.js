import React from 'react';
import { FaUser } from 'react-icons/fa'

function TechnicianCard({ id, name, role, team }) {
    return (
        // <div className="p-[100px]">
        //     <div key={id} className="" >
        //         <div className="">
        //             <h6>{name}</h6>
        //             <h4>{role}</h4>
        //             <h5>{team}</h5>
        //         </div>
        //     </div>
        // </div>     
        <li className="mt-0.5 w-full">
            <a className="py-2.7 hover:bg-blue-500/13 text-sm ease-nav-brand my-0 mx-2 flex items-center whitespace-nowrap rounded-lg px-4 text-slate-700 transition-colors" href="#">
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-center stroke-0 text-center xl:p-2.5">
                <FaUser className="relative top-0 text-sm leading-normal text-blue-500 ni ni-tv-2" />
            </div>
            <span className="ml-1 duration-300 opacity-100 pointer-events-none ease">{name}</span>
            </a>
        </li>
    )
}

export default TechnicianCard
