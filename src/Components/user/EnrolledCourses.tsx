/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnrolledCoursesView, generateCertificate } from "@/Api/user";
// import axios from "axios";
import { useState, useEffect } from "react";
import { FiDownload } from 'react-icons/fi'
import { Link } from "react-router-dom";
interface prerequisite {
    title: string;

}
interface benefits {
    title: string;

}
interface Course {
    courseStatus: any;
    courseId: any;
    _id?: string;
    category: string;
    price: number;
    estimatedPrice: number;
    name: string;
    instructor?: string;
    instructorId?: string;
    instructorName?: string;
    description: string;
    level: number;
    tags?: string;
    prerequisite: prerequisite[];
    benefits: benefits[]
    demoUrl?: string,
    thumbnail?: string;
    chapters?: string[],
    approved?: boolean,
    listed?: boolean,
    image?: string
    adminVerified?: boolean,
    publish?: boolean
    rating?: number;
    noOfPurchase?: number

}

const EnrolledCourses = () => {
    const id = localStorage.getItem('userId') as string | null
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await EnrolledCoursesView(id)
                console.log(response?.data?.EnrolledCourses)
                if (response?.data) {
                    setCourses(response.data?.EnrolledCourses);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, [id]);

    const downloadCertificate = async (courseId:any) => {
        try {
             await generateCertificate(courseId, id, "blob")
            
        } catch (error) {
            console.error("Error generating certificate:", error);
        }
    };



    return (
        
        <div className="max-w-screen-xl h-full m-3 mx-auto p-5 sm:p-10 md:p-16 ">
            <div className="grid grid-cols-1 md:grid-cols-3  sm:grid-cols-2 gap-16 rounded-lg">
                {courses && courses.map(course => (
                   
                        <div className="rounded bg-white  overflow-hidden shadow-lg w-72 h-96 flex flex-col">
                            <div className="relative h-48">
                            <Link to={`/coursedetails/${course?.courseId?._id}`} key={course?.courseId?._id}>
                                <img className="w-full h-full object-cover" src={course?.courseId?.thumbnail} alt="Course thumbnail" />
                                <div className="hover:bg-transparent transition duration-300 flex absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-0"></div>
                            </Link>
                            </div>
                            <div className="px-6 py-4 flex-1">
                                <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{course.courseId?.name}</a>
                                <p className="text-gray-500 text-sm">{course?.courseId?.category}</p>
                            </div>
                            <div className="px-6 py-4 flex justify-between items-center">
                                <span className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{course.courseId?.estimatedPrice}</span>
                                {course?.courseStatus && (
                                    <div className="flex flex-col items-center">
                                        <button
                                            onClick={() => downloadCertificate(course?.courseId?._id)}
                                            className="bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
                                        >
                                            <FiDownload className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                        </div>
                    
                ))}
            </div>
            </div>
        
    );
};

export default EnrolledCourses;