/* eslint-disable @typescript-eslint/no-explicit-any */





import { GetCourses } from "@/Api/user";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Course {
    _id?: string;
    category: string;
    price: number;
    estimatedPrice: number;
    name: string;
    description: string;
    level: number;
    tags?: string;
    demoUrl?: string;
    thumbnail?: string;
    chapters?: string[];
    approved?: boolean;
    listed?: boolean;
    image?: string;
    adminVerified?: boolean;
    publish?: boolean;
    rating?: number;
    noOfPurchase?: number;
}

interface Props {
    searchTerm: string;
}

const CourseCard: FC<Props> = ({ searchTerm }) => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [coursesPerPage] = useState<number>(6); 

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await GetCourses()
                // axios.get('http://localhost:5000/api/user/course');
                if (response?.data) {
                    setCourses(response?.data);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, []);

    // Get current courses
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const filteredCourses = currentCourses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="max-w-screen-xl h-full mx-auto p-5 sm:p-10 md:p-16 ">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10 rounded-lg">
                {filteredCourses.map(course => (
                    <Link to={`/coursedetails/${course._id}`} key={course._id} >
                        <div key={course._id} className="rounded bg-white overflow-hidden  shadow-lg">
                            <div className="relative">
                                <img className="w-full" src={course.thumbnail} alt="Course thumbnail" />
                                <div className="hover:bg-transparent transition duration-300 flex absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
                                </div>
                            </div>
                            <div className="px-6 py-4">
                                <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{course.name}</a>
                                <p className="text-gray-500 text-sm">{course.category}</p>
                            </div>
                            <div className="px-6 py-4 flex justify-between items-center">
                                <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{course.estimatedPrice}</a>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="mt-16">
                {/* Pagination */}
                <nav className="flex justify-center">
                    <ul className="flex space-x-4">
                        {[...Array(Math.ceil(courses.length / coursesPerPage)).keys()].map(number => (
                            <li key={number}>
                                <button
                                    onClick={() => paginate(number + 1)}
                                    className={`${number + 1 === currentPage
                                            ? 'bg-indigo-500 text-white'
                                            : 'text-gray-500 hover:bg-gray-300'
                                        } px-3 py-1 rounded focus:outline-none`}
                                >
                                    {number + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default CourseCard;