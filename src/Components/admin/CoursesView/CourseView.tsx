
import { useState, useEffect } from 'react';
// import { blockUser, getUsers, userUnblock } from '../../Api/admin';
// import Swal from 'sweetalert2';
import axios from 'axios';
import Swal from 'sweetalert2';
import { unverifyCourse, verifyCourse } from '@/Api/admin';
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

}

const CourseView = () => {
    const [data, setData] = useState<Course[]>([]);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/course');
                console.log(response.data)
                if (response.data) {
                    setData(response?.data);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, [data]);

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
                    const response = await unverifyCourse(id)
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
                    const response = await verifyCourse(id)
                    console.log(response)
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

    return (
        <div className="relative p-11 overflow-x-auto bg-white">
            <table className="w-full text-sm text-left rtl-text-right text-gray-700 dark-text-gray-400">
                <thead className="text-xs text-gray-500 uppercase bg-gray-800 dark-bg-gray-700 dark-text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((course) => (
                        <tr key={course?._id} className="bg-gray-100 border-b dark-bg-gray-800 dark-border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark-text-white">
                                {course.name}
                            </td>
                            <td className="px-6 py-4">
                                {course.category}
                            </td>
                            <td className="px-6 py-4">
                                {course.price}
                            </td>
                            <td className="px-6 py-4">
                                {course.description}
                              
                            </td>
                            <td className="px-6 py-4">
                                {course?.adminVerified ? (
                                    <button onClick={() => handleUnverify(course?._id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">unverify</button>

                                ) : (
                                    <button onClick={() => handleVerify(course?._id)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">verify</button>

                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CourseView;