/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetCategory, GetCourses, GetSearchCourse} from "@/Api/user";
import { debounce } from "lodash";
import {  useCallback, useEffect, useState } from "react";
// import {  useNavigate } from "react-router-dom";
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
interface Category {
    _id?: string;
    name: string;
    description: string;
    isHidden?: boolean;
    nooOfcourses?: number;
    status: "active" | "frozen";

}


const UserCard = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [priceSort, setPriceSort] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [coursesPerPage] = useState<number>(6);
    useEffect(() => {
        async function fetchCoursesvalue() {
            try {
                const response = await GetCourses()
                console.log("courses", response?.data)
                if (response?.data) {
                    setCourses(response.data);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCoursesvalue();
    }, []);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await GetCategory()
                console.log(response?.data)
                setCategories(response?.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);




    const fetchCourses = async (query:any, category:any, price:any) => {
        const response = await GetSearchCourse(query, category, price)
        return response;
    };

    const fetchCoursesWithDebounce = useCallback(
        debounce(async (query:any, category:any, price:any) => {
            try {
                const response = await fetchCourses(query, category, price);
                setCourses(response?.data.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }, 500),[]
    );
   

    useEffect(() => {
        fetchCoursesWithDebounce(searchTerm, selectedCategory, priceSort);
        
    }, [searchTerm, selectedCategory, priceSort]);

    const handleSearchTermChange = (e:any) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryTermChange = (e:any) => {
        setSelectedCategory(e.target.value);
    };

    const handlePriceSortChange = (e:any) => {
        setPriceSort(e.target.value);
    };
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    



    return (
        <>
            <div className="grid sm:grid-cols-12 bg-[#E9F8F3B2]  grid-col-12 gap-4   ">
                <div className="min-h-[100px] bg-[#E9F8F3B2] sm:col-span-3">
                    <div className="flex flex-col items-center px-4 sm:px-6 py-4">
                        <div className="mt-1 relative lg:w-64">
                            <label htmlFor="topbar-search" className="sr-only">Search</label>
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                name="email"
                                id="topbar-search"
                                value={searchTerm}
                                onChange={handleSearchTermChange}
                                className="bg-white border border-gray-700 text-black mb-3 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                                placeholder="Search"
                            />
                        </div>

                        <div className="relative lg:w-64">
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryTermChange}
                                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select a category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category?.name}>{category?.name}</option>
                                ))}
                            </select>
                        </div>


                        <div className="relative lg:w-64 mt-3">
                            
                            <select
                                id="price-sort"
                                value={priceSort}
                                onChange={handlePriceSortChange}
                                className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Price</option>
                                <option value="asc">Low to High</option>
                                <option value="desc">High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="min-h-[100px]  rounded-lg  bg-gray-200  sm:col-span-9">
                    <div className='w-full bg-[#E9F8F3B2] pt-11 '>
                        <div className='md:max-w-[1480px] m-auto max-w-[600px]   px-4 md:px-0'>
                           

                            <div className='flex flex-col'>
                                <div className="max-w-screen-xl   mx-auto p-5 sm:p-10 md:p-16">
                                    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
                                       
                                        {Array.isArray(courses) && courses.map(course => (
                                            <div key={course._id} className="rounded bg-white overflow-hidden shadow-lg w-64"> {/* Adjust the width as needed */}
                                                <div className="relative">
                                                    <img className="w-full" src={course?.thumbnail} alt="Course thumbnail" />
                                                    <div className="hover:bg-transparent transition duration-300 flex absolute bottom-0 right-0 left-0"></div>
                                                </div>
                                                <div className="px-6 py-4">
                                                    <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out overflow-hidden whitespace-nowrap overflow-ellipsis" style={{ maxWidth: '100%' }}>{course?.name}</a>
                                                    <p className="text-gray-500 text-sm">{course?.category}</p>
                                                </div>
                                                <div className="px-6 py-4 flex justify-between items-center">
                                                    <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">₹{course?.estimatedPrice}Rs</a>
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
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
};

export default UserCard;
