import React from 'react';

const Trainerdashboard: React.FC = () => {
    return (
       
        <main>
    <div className="pt-6  px-4 bg-gray-400">
        <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="bg-white shadow rounded-lg p-4 sm:p-12 xl:p-12  2xl:col-span-2">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex-shrink-0">
                        
                        <h3 className="text-base  text-black font-semibold">Jumb into course creation</h3>
                    </div>
                            <button className="bg-violet-500 text-white  py-2 px-4 ml-2">Create Your Course</button>
                </div>
                <div id="main-chart"></div>
            </div>
                    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 flex flex-col sm:flex-row">
                        <div className="mb-4 sm:mr-4 flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Create Engaging Courses</h3>
                            <span className="text-base font-normal text-gray-500">Whether you've been teaching for years or are teaching for the first time, you can make an engaging course. We've compiled resources and best practices to help you get to the next level, no matter where you're starting.</span>
                            <div className='pt-5'>
                                <a href="#" className=" text-violet-500 underline font-medium hover:text-violet-600">Get Started</a>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center items-start">
                            <img src="https://s.udemycdn.com/instructor/dashboard/engaging-course-2x.jpg" alt="Engaging Courses" className="rounded-lg w-52 h-auto" />
                        </div>
                    </div>
        </div>
        <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ">
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 mb-6 ">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                                <img src="https://s.udemycdn.com/instructor/dashboard/video-creation-2x.jpg" alt="Engaging Courses" className="rounded-lg w-44 h-auto" />
                        
                    </div>
                            <div className="w-0 flex flex-col items-end justify-end flex-1 text-green-500 font-bold">
                                <h3 className="font-semibold text-gray-500">Get Started with Video</h3>
                                <div className='pt-5 text-left'>
                                    <a href="#" className=" text-violet-500 underline font-medium hover:text-violet-600">Get Started</a>
                                </div>
                                
                            </div>
                </div>
            </div>
            <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 mb-6 ">
                <div className="flex items-center ">
                    <div className="flex-shrink-0">
                                <img src="https://s.udemycdn.com/instructor/dashboard/build-audience-2x.jpg" alt="Engaging Courses" className="rounded-lg w-44 h-auto" />
                    </div>
                    <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                                <div className="w-0 flex flex-col items-end justify-end flex-1 text-green-500 font-bold">
                                    <h3 className="font-semibold text-gray-500">Build Your Audience</h3>
                                    <div className='pt-5 text-left'>
                                        <a href="#" className=" text-violet-500 underline font-medium hover:text-violet-600">Get Started</a>
                                    </div>

                                </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    </div>
    </main >
        
    );
};

export default Trainerdashboard
    