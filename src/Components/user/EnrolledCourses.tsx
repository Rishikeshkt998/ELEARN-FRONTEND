/* eslint-disable @typescript-eslint/no-explicit-any */
import { EnrolledCoursesView } from "@/Api/user";
// import axios from "axios";
import { useState, useEffect } from "react";
interface prerequisite {
    title: string;

}
interface benefits {
    title: string;

}
interface Course {
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
                // axios.get(`http://localhost:5000/api/user/enrolledview/${id}`);
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

   



    return (
        <div className="max-w-screen-xl  bg-gray-900 mx-auto  sm:p-10 ">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
                
                {courses&&courses?.map(course => (
                    <div key={course?._id} className="rounded bg-white overflow-hidden shadow-lg">
                        <div className="relative">
                            <img className="w-full" src={course?.courseId?.thumbnail} alt="Course thumbnail" />

                        </div>

                        <div className="px-6 py-4">

                            <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{course.courseId?.name}</a>
                            <p className="text-gray-500 text-sm">{course?.courseId?.category}</p>
                        </div>
                        <div className="px-6 py-4 flex justify-between items-center">
                            <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{course.courseId?.price}</a>
                        </div>


                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnrolledCourses;