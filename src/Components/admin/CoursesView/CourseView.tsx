/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { CourseShow, unverifyCourse, verifyCourse } from '@/Api/admin';

interface prerequisite {
    title: string;
}
interface benefits {
    title: string;
}
interface Course {
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

const CourseView = () => {
    const [data, setData] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(5); // Adjust the number of courses per page here

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await CourseShow();
                console.log(response?.data);
                if (response?.data) {
                    setData(response?.data);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, []);

    const handleUnverify = async (id: string | undefined) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await unverifyCourse(id);
                    if (response?.data.success) {
                        setData(prevData =>
                            prevData.map(item =>
                                item._id === id ? { ...item, adminVerified: false } : item
                            )
                        );
                        Swal.fire({
                            title: "Success!",
                            text: "",
                            icon: "success"
                        });
                    }
                }
            });
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };

    const handleVerify = async (id: string | undefined) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await verifyCourse(id);
                    console.log(response);
                    if (response?.data.success) {
                        setData(prevData =>
                            prevData.map(item =>
                                item._id === id ? { ...item, adminVerified: true } : item
                            )
                        );
                        Swal.fire({
                            title: "Success!",
                            text: "",
                            icon: "success"
                        });
                    }
                }
            });
        } catch (error) {
            console.error('Error unblocking user:', error);
        }
    };

    // Get current courses
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = data.slice(indexOfFirstCourse, indexOfLastCourse);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="relative p-11 overflow-x-auto bg-white">
            <table className="w-full text-sm text-left text-gray-700 table-fixed">
                <thead className="text-xs text-gray-500 uppercase bg-gray-800">
                    <tr>
                        <th scope="col" className="px-6 py-3 w-1/5">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 w-1/5">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3 w-1/5">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3 w-1/5">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3 w-1/5">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentCourses.map((course) => (
                        <tr key={course?._id} className="bg-gray-100 border-b">
                            <td className="px-6 py-4 font-medium text-gray-900 truncate">
                                {course.name}
                            </td>
                            <td className="px-6 py-4 truncate">
                                {course.category}
                            </td>
                            <td className="px-6 py-4 truncate">
                                {course.price}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 truncate">
                                {course.description}
                            </td>
                            <td className="px-6 py-4">
                                {course?.adminVerified ? (
                                    <button onClick={() => handleUnverify(course?._id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Unverify</button>
                                ) : (
                                    <button onClick={() => handleVerify(course?._id)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Verify</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(data.length / coursesPerPage) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CourseView;

