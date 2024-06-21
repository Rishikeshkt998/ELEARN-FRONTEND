/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddToWhishlist, EnrolledCoursesView, GetCourses, getWhishlist } from "@/Api/user";
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
    const userId = localStorage.getItem('userId') as string | null;
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [coursesPerPage] = useState<number>(3); 
    const [whishlist, setWhishlist]=useState<any[]>([])
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
        }).format(price);
    };

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await GetCourses()
                if (response?.data) {
                    setCourses(response?.data);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, []);
    useEffect(() => {
        async function fetchEnrolled() {
            try {
                const coursesResponse = await EnrolledCoursesView(userId);
                console.log("enrolled",coursesResponse?.data?.EnrolledCourses)
                const enrolledData = coursesResponse?.data?.EnrolledCourses;
                if (enrolledData) {
                    const ids = enrolledData.map((course: any) => course.courseId._id);
                    setEnrolledCourses(ids);
                }
                
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchEnrolled();
    }, [userId]);
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const filteredCourses = currentCourses.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const handleAddToWishlist = async (courseId: any) => {
        try {
            const response = await AddToWhishlist(courseId, userId);
            console.log("whishlist values",response)
        } catch (error) {
            console.error('Error adding to wishlist:', error);
            alert('An error occurred while adding to wishlist.');
        }
    };
    useEffect(() => {
        const fetchWhishlist = async () => {
            try {
                const response = await getWhishlist(userId);
                console.log(response?.data.favourites.favourites);
                const data=response?.data.favourites.favourites
                if (data) {
                    const ids = data.map((item: any) => item._id)
                    setWhishlist(ids)
                }
                console.log("whishlist",whishlist)
                
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchWhishlist();
    }, [whishlist,userId]);

    return (
        <div className="max-w-screen-xl h-full mx-auto p-5 sm:p-10 md:p-16 ">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10 rounded-lg">
                {filteredCourses.map(course => (
                    
                        <div className="rounded bg-white overflow-hidden shadow-lg w-80 h-96 flex flex-col">
                            <Link to={`/coursedetails/${course._id}`} key={course._id}>
                            <div className="relative h-48">
                                <img className="w-full h-full object-cover" src={course.thumbnail} alt="Course thumbnail" />
                                <div className="hover:bg-transparent transition duration-300 flex absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-0"></div>
                            </div>
                            <div className="px-6 py-4 flex-1">
                                <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out overflow-hidden whitespace-nowrap overflow-ellipsis" style={{ maxWidth: '100%' }}>{course.name}</a>
                                <p className="text-gray-500 text-sm">{course.category}</p>
                            </div>
                            </Link>
                            
                        <div className="px-6 py-4 flex justify-between items-center">
                            <span className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{formatPrice(course.price)}</span>
                            
                            {enrolledCourses.includes(course._id) ? (
                                
                                <span className="text-green-700 bg-green-100 border border-green-500 font-bold rounded px-3 py-1">Enrolled</span>
                            ) : (
                                
                                    <button
                                        onClick={() => handleAddToWishlist(course._id)}
                                        className={`transition duration-500 ease-in-out ${(whishlist.includes(course._id)) ? 'text-red-500' : 'text-black'} p-2`}
                                    >
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 2C5.44772 2 5 2.44772 5 3V21C5 21.7015 5.74743 22.1465 6.36498 21.8413L12 19.118L17.635 21.8413C18.2526 22.1465 19 21.7015 19 21V3C19 2.44772 18.5523 2 18 2H6Z" />
                                        </svg>
                                    </button>
                            )}
                        </div>
                        </div>
                    
                ))}
            </div>
            <div className="mt-16">
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


