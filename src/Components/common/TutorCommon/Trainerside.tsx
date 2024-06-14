import React from 'react';
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { IoCreateOutline } from "react-icons/io5";
import { MdOutlineLiveTv } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { LuContact2 } from "react-icons/lu";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Trainerside: React.FC = () => {
    return (
        <aside
            id="sidebar"
            className="fixed hidden z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75 bg-blue-950 text-white"
            aria-label="Sidebar"
        >
            <div className="relative flex-1 flex flex-col min-h-0 border-r border-blue-950 bg-blue-950 pt-0">
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 bg-blue-950 divide-y divide-gray-700 space-y-1">
                        <ul className="space-y-2 pb-2">
                            <li>
                                <form action="#" method="GET" className="lg:hidden">
                                    <label htmlFor="mobile-search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg
                                                className="w-5 h-5 text-gray-500"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            name="email"
                                            id="mobile-search"
                                            className="bg-gray-700 border border-gray-600 text-black text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5"
                                            placeholder="Search"
                                        />
                                    </div>
                                </form>
                            </li>
                            <li className=" rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-300">
                                <a
                                    
                                    className="text-base font-normal flex items-center p-2 group"
                                >
                                    <RxDashboard /><Link to="/tutor/home" className="ml-3 flex-1 whitespace-nowrap text-white">Dashboard</Link>
                                </a>
                            </li>
                            <li className=" rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-300">
                                <div className="text-base font-normal flex items-center p-2 group">
                                    <IoCreateOutline /><Link to="/tutor/coursepage" className="ml-3 text-white">Create Courses</Link>
                                </div>
                            </li>
                            <li className=" rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-300">
                            
                                <div className="text-base font-normal flex items-center p-2 group">
                                    <MdOutlineLiveTv /><Link to="/tutor/courseview" className="ml-3 text-white">Live Courses</Link>
                                
                                </div>
                            </li>
                            <li className=" rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-300">
                                <div className="text-base font-normal flex items-center p-2 group">
                                    <IoCreateOutline /><Link to="/tutor/sheduleclassview" className="ml-3 text-white">Classes</Link>
                                </div>
                            </li>
                            <li className="rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-300">
                                <a
                                    
                                    className="text-base font-normal flex items-center p-2 group"
                                >
                                    <PiStudent /><Link to="/tutor/enrolled" className="ml-3 text-white">Enrolled Students</Link>
                                </a>
                            </li>
                            <li className=" rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-300">
                                <a
                                    
                                    className="text-base font-normal flex items-center p-2 group"
                                >
                                    <LuContact2 /><span className="ml-3 text-white">Contact</span>
                                </a>
                            </li>
                            <li className=" rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-300">
                                <a
                                    
                                    className="text-base font-normal flex items-center p-2 group"
                                >
                                    <MdOutlineChatBubbleOutline /><Link to="/tutor/chattutor" className="ml-3 text-white">Chat</Link>
                                </a>
                            </li>
                            <li className=" rounded-lg transition duration-200 hover:border-transparent hover:bg-gray-300">
                                <a
                                   
                                    className="text-base font-normal flex items-center p-2 group"
                                >
                                    <CgProfile /><Link to="/tutor/tutorprofile" className="ml-3 flex-1 whitespace-nowrap text-white ">Profile</Link>
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </aside>

    );
};

export default Trainerside

