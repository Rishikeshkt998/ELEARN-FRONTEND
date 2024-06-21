/* eslint-disable @typescript-eslint/no-explicit-any */



// import  { useState, useEffect } from 'react';
// import { FiDownload } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import { EnrolledCoursesView, GetChapters, generateCertificate } from "@/Api/user";

// interface Course {
//     chapterProgress: any;
//     lessons: any;
//     completedChapters: any;
//     completedLessons: any;
//     courseStatus: any;
//     courseId: any;
//     _id?: string;
//     category: string;
//     price: number;
//     estimatedPrice: number;
//     name: string;
//     instructor?: string;
//     instructorId?: string;
//     instructorName?: string;
//     description: string;
//     level: number;
//     tags?: string;
//     prerequisite: { title: string }[];
//     benefits: { title: string }[];
//     demoUrl?: string;
//     thumbnail?: string;
//     chapters?: string[];
//     approved?: boolean;
//     listed?: boolean;
//     image?: string;
//     adminVerified?: boolean;
//     publish?: boolean;
//     rating?: number;
//     noOfPurchase?: number;
//     progress: number; 
// }

// const EnrolledCourses = () => {
//     const id = localStorage.getItem('userId') as string | null;
//     const [courses, setCourses] = useState<Course[]>([]);

//     useEffect(() => {
//         async function fetchCourses() {
//             try {
//                 const coursesResponse = await EnrolledCoursesView(id);
//                 console.log(coursesResponse)
//                 if (coursesResponse?.data?.EnrolledCourses) {
//                     const enrolledCourses = await Promise.all(coursesResponse.data.EnrolledCourses.map(async (value: any) => {
//                         const courseId = value.courseId._id;
//                         const chaptersResponse = await GetChapters(courseId);
//                         const chapters = chaptersResponse?.data.Response.flatMap((item: any) => item.chapters);
//                         console.log(chapters)
//                         const chaptersCount = chapters.length;
//                         console.log(chaptersCount)
//                         const completedChapters = chapters.filter((chapter: any) => value?.completedChapters?.includes(chapter._id)).length;
//                         console.log(completedChapters)
//                         const progress = calculateProgress(completedChapters, chaptersCount);
//                         return {
//                             ...value,
//                             progress: progress,
//                         };
//                     }));
//                     Promise.all(enrolledCourses).then((coursesWithProgress) => {
//                         setCourses(coursesWithProgress);
//                     });
//                 }
//             } catch (error) {
//                 console.error('Error fetching courses:', error);
//             }
//         }
//         fetchCourses();
//     }, [id]);

//     const downloadCertificate = async (courseId: any) => {
//         try {
//             await generateCertificate(courseId, id, "blob");
//         } catch (error) {
//             console.error("Error generating certificate:", error);
//         }
//     };

//     const calculateProgress = (completed: number, total: number) => {
//         return total > 0 ? Math.round((completed / total) * 100) : 0;
//     };
//     const formatPrice = (price: number) => {
//         return new Intl.NumberFormat('en-IN', {
//             style: 'currency',
//             currency: 'INR',
//             maximumFractionDigits: 2,
//         }).format(price);
//     };

//     return (
//         <div className="max-w-screen-xl h-full m-3 mx-auto p-5 sm:p-10 md:p-16">
//             <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
//                 {courses && courses.map(course => (
//                     <div key={course._id} className="rounded bg-white overflow-hidden shadow-lg w-64"> 
//                         <Link to={`/coursecontentpage/${course?.courseId?._id}`}>
//                             <div className="relative">
//                                 <img className="w-full h-36" src={course?.courseId?.thumbnail} alt="Course thumbnail" />
//                                 <div className="hover:bg-transparent transition duration-300 flex absolute bottom-0 right-0 left-0"></div>
//                             </div>
//                             <div className="px-6 py-4">
//                                 <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out overflow-hidden whitespace-nowrap overflow-ellipsis" style={{ maxWidth: '100%' }}>{course?.courseId?.name}</a>
//                                 <p className="text-gray-500 text-sm">{course?.courseId?.category}</p>
//                             </div>
//                         </Link>
//                             <div className="px-6 py-2">
//                                 <div className="flex justify-between items-center mb-2">
//                                     <span className="text-xs font-semibold inline-block text-indigo-600">{course.progress}% Completed</span>
//                                 </div>
//                                 <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-indigo-200">
//                                     <div style={{ width: `${course.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
//                                 </div>
//                                 <div className="flex justify-between items-center">
//                                     <span className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{formatPrice(course.courseId?.price)}</span>
//                                     {course?.courseStatus && (
//                                         <div className="flex flex-col items-center">
//                                             <button
//                                                 onClick={() => downloadCertificate(course.courseId?._id)}
//                                                 className="bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
//                                             >
//                                                 <FiDownload className="w-5 h-5" />
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
                        
//                     </div>
//                 ))}
//             </div>
            
//         </div>
//     );
// };

// export default EnrolledCourses;

import  { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import {  useNavigate } from 'react-router-dom';
import { EnrolledCoursesView, GetChapters, generateCertificate } from "@/Api/user";

interface Course {
    chapterProgress: any;
    lessons: any;
    completedChapters: any;
    completedLessons: any;
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
    prerequisite: { title: string }[];
    benefits: { title: string }[];
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
    progress: number;
}

const EnrolledCourses = () => {
    const id = localStorage.getItem('userId') as string | null;
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(3)
    const navigate=useNavigate()

    useEffect(() => {
        async function fetchCourses() {
            try {
                const coursesResponse = await EnrolledCoursesView(id);
                console.log(coursesResponse)
                if (coursesResponse?.data?.EnrolledCourses) {
                    const enrolledCourses = await Promise.all(coursesResponse.data.EnrolledCourses.map(async (value: any) => {
                        const courseId = value.courseId._id;
                        const chaptersResponse = await GetChapters(courseId);
                        const chapters = chaptersResponse?.data.Response.flatMap((item: any) => item.chapters);
                        console.log(chapters)
                        const chaptersCount = chapters.length;
                        console.log(chaptersCount)
                        const completedChapters = chapters.filter((chapter: any) => value?.completedChapters?.includes(chapter._id)).length;
                        console.log(completedChapters)
                        const progress = calculateProgress(completedChapters, chaptersCount);
                        return {
                            ...value,
                            progress: progress,
                        };
                    }));
                    Promise.all(enrolledCourses).then((coursesWithProgress) => {
                        setCourses(coursesWithProgress);
                    });
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, [id]);

    const downloadCertificate = async (courseId: any) => {
        try {
            await generateCertificate(courseId, id, "blob");
        } catch (error) {
            console.error("Error generating certificate:", error);
        }
    };

    const calculateProgress = (completed: number, total: number) => {
        return total > 0 ? Math.round((completed / total) * 100) : 0;
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
        }).format(price);
    };
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const handleCourseClick = (courseId: string) => {
        localStorage.setItem('courseId', courseId);
        navigate(`/coursecontentpage/${courseId}`)
        
    };

    return (
        <div className="max-w-screen-xl h-full m-3 mx-auto p-5 sm:p-10 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
                {currentCourses.map(course => (
                    <div key={course._id} className="rounded bg-white overflow-hidden shadow-lg w-64">
                        <a onClick={() => handleCourseClick(course?.courseId?._id)}>
                            <div className="relative">
                                <img className="w-full h-36" src={course?.courseId?.thumbnail} alt="Course thumbnail" />
                                <div className="hover:bg-transparent transition duration-300 flex absolute bottom-0 right-0 left-0"></div>
                            </div>
                            <div className="px-6 py-4">
                                <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out overflow-hidden whitespace-nowrap overflow-ellipsis" style={{ maxWidth: '100%' }}>{course?.courseId?.name}</a>
                                <p className="text-gray-500 text-sm">{course?.courseId?.category}</p>
                            </div>
                        </a>
                        <div className="px-6 py-2">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-semibold inline-block text-indigo-600">{course.progress}% Completed</span>
                            </div>
                            <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-indigo-200">
                                <div style={{ width: `${course.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{formatPrice(course.courseId?.price)}</span>
                                {course?.courseStatus && (
                                    <div className="flex flex-col items-center">
                                        <button
                                            onClick={() => downloadCertificate(course.courseId?._id)}
                                            className="bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
                                        >
                                            <FiDownload className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(courses.length / coursesPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EnrolledCourses;
