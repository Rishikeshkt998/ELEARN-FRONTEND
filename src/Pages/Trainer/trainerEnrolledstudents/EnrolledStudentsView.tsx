/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchEnrolledStudents } from '@/Api/trainer';
import { useEffect, useState } from 'react';

interface Prerequisite {
    title: string;
}
interface Benefits {
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
    prerequisite: Prerequisite[];
    benefits: Benefits[];
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
    isDeleted: boolean;
}
interface User {
    _id?: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    profileimage?: any;
    otp?: string;
    isVerified?: boolean;
    isBlocked?: boolean;
}
interface EnrolledStudentsData {
    course: Course;
    user: User;
    enrolledTime: string;
}

const formatLocalTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleString();
};

function EnrolledStudentsView() {
    const [data, setData] = useState<EnrolledStudentsData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3; // Number of items per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchEnrolledStudents();
                console.log(response);

                const enrolledStudentsDetails = response?.data?.EnrolledStudents.enrolledStudentsDetails || [];
                const enrolledStudents = response?.data?.EnrolledStudents.enrolledStudents || [];

                // Combine times with data
                const combinedData = enrolledStudentsDetails.map((detail: any, index: any) => {
                    return { ...detail, enrolledTime: enrolledStudents[index]?.enrolledTime || '' };
                });

                setData(combinedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="relative p-20 overflow-x-auto h-screen bg-gray-900">
            <table className="w-full text-sm text-left rtl-text-right text-white">
                <thead className="text-xs text-gray-200 uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Student name</th>
                        <th scope="col" className="px-6 py-3">Phone</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Enrolled course</th>
                        <th scope="col" className="px-6 py-3">Enrolled time</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(({ user, course, enrolledTime }, index) => (
                        <tr key={index} className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="bg-gray-500 px-6 py-4 font-medium text-white whitespace-nowrap dark:text-white">{user?.name}</td>
                            <td className="bg-gray-500 px-6 py-4">{user?.phone}</td>
                            <td className="px-6 bg-gray-500 py-4">{user?.email}</td>
                            <td className="px-6 bg-gray-500 py-4">
                                {course?.name}
                            </td>
                            <td className="bg-gray-500 px-6 py-4">{formatLocalTime(enrolledTime)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastItem >= data.length}
                    className="px-4 py-2 mx-1 bg-gray-700 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default EnrolledStudentsView;