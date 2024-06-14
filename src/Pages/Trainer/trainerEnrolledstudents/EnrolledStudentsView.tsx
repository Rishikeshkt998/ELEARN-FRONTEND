/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchEnrolledStudents } from '@/Api/trainer';
// import axios from 'axios';
import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
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
    isDeleted: boolean

}
interface User {
    _id?: string;
    name: string;
    email: string;
    password: string,
    phone?: string,
    profileimage?: any;
    otp?: string;
    isVerified?: boolean,
    isBlocked?: boolean,

}

interface EnrolledStudentsdata {
    course:Course;
    user: User;
    enrolledTime: Date;
}

function EnrolledStudentsView() {
    const [data, setData] = useState<EnrolledStudentsdata[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =await fetchEnrolledStudents()
                    setData(response?.data?.EnrolledStudents);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="relative p-20 overflow-x-auto h-screen bg-gray-900 ">
            
            <table className="w-full text-sm text-left rtl-text-right text-white ">
                <thead className="text-xs text-gray-200 uppercase bg-gray-700 dark-bg-gray-700 dark-text-gray-400">
                    <tr>
                        <th scope="col" className=" px-6 py-3">
                            Student name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Enrolled course
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Enrolled time
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data&&data.map(({ user, course }, index) => (
                        <tr key={index} className="bg-gray-100 border-b dark-bg-gray-800 dark-border-gray-700">
                            <td className="bg-gray-500 px-6 py-4 font-medium text-white whitespace-nowrap dark-text-white">
                                {user?.name}
                            </td>
                            <td className=" bg-gray-500 px-6 py-4">
                                {user && user.phone}
                            </td>
                            <td className="px-6 bg-gray-500 py-4">
                                {user && user.email}
                            </td>
                            <td className="bg-gray-500 px-6 py-4">
                                {course && course.name}
                            </td>
                            {/* <td className=" bg-gray-500 px-6 py-4">
                                {course && course.enrolledTime}
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EnrolledStudentsView;