/* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { FaEdit, FaTrash } from 'react-icons/fa';
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaMessage } from "react-icons/fa6";
// import { BsFillQuestionSquareFill } from "react-icons/bs";
// import Swal from "sweetalert2";
// import {  DeleteCourse, GetCourses, PublishCourse } from "@/Api/trainer";
// interface prerequisite {
//     title: string;

// }
// interface benefits {
//     title: string;

// }
// interface Course {
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
//     prerequisite: prerequisite[];
//     benefits: benefits[]
//     demoUrl?: string,
//     thumbnail?: string;
//     chapters?: string[],
//     approved?: boolean,
//     listed?: boolean,
//     image?: string
//     adminVerified?: boolean,
//     publish?: boolean
//     rating?: number;
//     noOfPurchase?: number

// }

// const Courseview = () => {
//     const [courses, setCourses] = useState<Course[]>([]);
//     const navigate=useNavigate()

//     useEffect(() => {
//         async function fetchCourses() {
//             try {
//                 const id = localStorage.getItem('trainerId');
//                 console.log(id)
//                 const response = await GetCourses(id)
//                 console.log("response tutor course",response?.data)
//                 if (response?.data) {
//                     setCourses(response.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching courses:', error);
//             }
//         }
//         fetchCourses();
//     }, [courses]);
//     const handleDeleteChapter = async (id: any) => {
//         try {

//             const response = await DeleteCourse(id)
//             console.log(response?.data);
//             setCourses(prevData => {
//                 return prevData.filter(item => item._id !== id);
//             });
//         } catch (error) {
//             console.error('Error deleting chapter:', error);
//             toast.error('Error deleting chapter');

//         }
//     }

//     const publish = async (id:any) => {
    
//     const confirmPublish = await Swal.fire({
//         title: 'Are you sure?',
//         text: 'You want to publish your course!',
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, publish it!',
//     });

//     if (confirmPublish.isConfirmed) {
//         const response = await PublishCourse(id)
        
//         const updatedCourse = response?.data;

//         Swal.fire(
//             'Published!',
//             'Your course has been published.',
//             'success'
//         );
//         console.log(updatedCourse);
//     }
//     }
//     const handleEdit = (courseId:any) => {
        
//         navigate(`/tutor/editcourse/${courseId}`);
//     };
//     const handleReviews = (courseId: any) => {
        
//         navigate(`/tutor/reviewreply/${courseId}`);
//     };
//     const handleQuestions = (courseId: any) => {

//         navigate(`/tutor/questions/${courseId}`);
//     };

   

//     return (
        

//         <div className="max-w-screen-xl h-full bg-gray-900 mx-auto p-5 sm:p-10 md:p-16">
//             <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
//                 {courses.map(course => (
//                     <div key={course?._id} className="rounded bg-white overflow-hidden shadow-lg flex flex-col">
//                         <div className="relative">
//                             <img className="w-full max-w-full h-36" src={course?.thumbnail} alt="Course thumbnail"  />
//                             <div className="hover:bg-transparent transition duration-300 flex absolute bottom-0 right-0 left-0">
//                                 <a onClick={() => handleEdit(course?._id)} className="text-blue-500 mx-2 cursor-pointer ">
//                                     <FaEdit className="text-white mx-2 mb-2 cursor-pointer" />
//                                 </a>
//                                 <a onClick={() => handleDeleteChapter(course?._id)} className="text-blue-500 mx-2 cursor-pointer ">
//                                     <FaTrash className="text-white mx-2 mb-2 cursor-pointer" />
//                                 </a>
//                                 <a onClick={() => handleReviews(course?._id)} className="text-blue-500 mx-2 cursor-pointer ">
//                                     <FaMessage className="text-white mx-2 mb-2 cursor-pointer" />
//                                 </a>
//                                 <a onClick={() => handleQuestions(course?._id)} className="text-blue-500 mx-2 cursor-pointer ">
//                                     <BsFillQuestionSquareFill className="text-white mx-2 mb-2 cursor-pointer" />
//                                 </a>
//                             </div>
//                         </div>
//                         <div className="flex-grow px-6 py-4 flex flex-col justify-between">
//                             <div>
//                                 <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out overflow-hidden whitespace-nowrap w-full text-ellipsis mb-2">
//                                     {course.name}
//                                 </a>
//                                 <p className="text-gray-500 text-sm mb-4">{course.category}</p>
//                             </div>
//                             <div className="flex justify-between items-center mt-auto">
//                                 <button className="btn p-2 rounded-lg text-black bg-blue-700 btn-warning">
//                                     <Link to={`/tutor/shedule/${course?._id}`} className="text-white">Schedule</Link>
//                                 </button>
//                                 <button
//                                     onClick={() => publish(course._id)}
//                                     className={`font-bold border-2 px-2 py-2 rounded-md ${course.publish ? "bg-green-500 text-white btn-disabled" : "bg-blue-900 text-white"
//                                         }`}
//                                 >
//                                     {course.publish ? "Published" : "Publish"}
//                                 </button>
//                                 {course.publish && course.approved && (
//                                     <button
//                                         className={`btn text-white ${course.listed ? "btn-warning" : "btn-success"}`}
//                                     >
//                                         {course.listed ? "Unlist" : "List"}
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Courseview;
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaMessage } from "react-icons/fa6";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import Swal from "sweetalert2";
import { DeleteCourse, GetCourses, PublishCourse } from "@/Api/trainer";

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
    benefits: benefits[];
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

const Courseview = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesPerPage] = useState(6); 
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCourses() {
            try {
                const id = localStorage.getItem('trainerId');
                console.log(id);
                const response = await GetCourses(id);
                console.log("response tutor course", response?.data);
                if (response?.data) {
                    setCourses(response.data);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, []);

    const handleDeleteChapter = async (id: any) => {
        try {
            const response = await DeleteCourse(id);
            console.log(response?.data);
            setCourses(prevData => prevData.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting chapter:', error);
            toast.error('Error deleting chapter');
        }
    };

    const publish = async (id: any) => {
        const confirmPublish = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to publish your course!',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, publish it!',
        });

        if (confirmPublish.isConfirmed) {
            const response = await PublishCourse(id);
            const updatedCourse = response?.data;
            Swal.fire('Published!', 'Your course has been published.', 'success');
            console.log(updatedCourse);
        }
    };

    const handleEdit = (courseId: any) => {
        navigate(`/tutor/editcourse/${courseId}`);
    };
    const handleReviews = (courseId: any) => {
        navigate(`/tutor/reviewreply/${courseId}`);
    };
    const handleQuestions = (courseId: any) => {
        navigate(`/tutor/questions/${courseId}`);
    };

    // Pagination logic
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-screen-xl h-full bg-gray-900 mx-auto p-5 sm:p-10 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
                {currentCourses.map(course => (
                    <div key={course?._id} className="rounded bg-white overflow-hidden shadow-lg flex flex-col">
                        <div className="relative">
                            <img className="w-full max-w-full h-36" src={course?.thumbnail} alt="Course thumbnail" />
                            <div className="hover:bg-transparent transition duration-300 flex absolute bottom-0 right-0 left-0">
                                <a onClick={() => handleEdit(course?._id)} className="text-blue-500 mx-2 cursor-pointer ">
                                    <FaEdit className="text-white mx-2 mb-2 cursor-pointer" />
                                </a>
                                <a onClick={() => handleDeleteChapter(course?._id)} className="text-blue-500 mx-2 cursor-pointer ">
                                    <FaTrash className="text-white mx-2 mb-2 cursor-pointer" />
                                </a>
                                <a onClick={() => handleReviews(course?._id)} className="text-blue-500 mx-2 cursor-pointer ">
                                    <FaMessage className="text-white mx-2 mb-2 cursor-pointer" />
                                </a>
                                <a onClick={() => handleQuestions(course?._id)} className="text-blue-500 mx-2 cursor-pointer ">
                                    <BsFillQuestionSquareFill className="text-white mx-2 mb-2 cursor-pointer" />
                                </a>
                            </div>
                        </div>
                        <div className="flex-grow px-6 py-4 flex flex-col justify-between">
                            <div>
                                <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out overflow-hidden whitespace-nowrap w-full text-ellipsis mb-2">
                                    {course.name}
                                </a>
                                <p className="text-gray-500 text-sm mb-4">{course.category}</p>
                            </div>
                            <div className="flex justify-between items-center mt-auto">
                                <button className="btn p-2 rounded-lg text-black bg-blue-700 btn-warning">
                                    <Link to={`/tutor/shedule/${course?._id}`} className="text-white">Schedule</Link>
                                </button>
                                <button
                                    onClick={() => publish(course._id)}
                                    className={`font-bold border-2 px-2 py-2 rounded-md ${course.publish ? "bg-green-500 text-white btn-disabled" : "bg-blue-900 text-white"
                                        }`}
                                >
                                    {course.publish ? "Published" : "Publish"}
                                </button>
                                {course.publish && course.approved && (
                                    <button
                                        className={`btn text-white ${course.listed ? "btn-warning" : "btn-success"}`}
                                    >
                                        {course.listed ? "Unlist" : "List"}
                                    </button>
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

export default Courseview;