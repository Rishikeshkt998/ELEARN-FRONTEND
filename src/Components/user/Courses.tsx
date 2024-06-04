/* eslint-disable @typescript-eslint/no-unused-vars */


import { FC, useEffect, useState } from 'react'
import CourseCard from "../../Pages/User/coursecards/CourseCard";
import axios from 'axios';
import { GetCategory } from '@/Api/user';
interface Category {
    _id?: string;
    name: string;
    description: string;
    isHidden?: boolean;
    nooOfcourses?: number;
    status: "active" | "frozen";

}
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


const Courses: FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/user/search?searchTerm=${searchTerm}`);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchData();
    }, [searchTerm]);

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
    
    return (
        <div className='w-full bg-[#E9F8F3B2] py-32'>
            <div className='md:max-w-[1480px] m-auto max-w-[600px]  px-4 md:px-0'>
                <div className='py-4 text-center'>
                    <h1 className='py-3 text-3xl font-bold'>Most Popular <span className='text-[#20B486]'>Courses</span></h1>
                    <p className='text-[#6D737A]'>Various versions have evolved over the years, sometimes by accident.</p>
                </div>
                <label htmlFor="topbar-search" className="sr-only">
                    Search
                </label>
                <div className="mt-1 relative lg:ms-16 lg:w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <input
                        type="text"
                        name="email"
                        id="topbar-search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="bg-white border border-gray-700 text-black mb-3 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                        placeholder="Search"
                    />
                </div>
                
                
                
                <div className='flex flex-col'>
                        
                    <CourseCard searchTerm={searchTerm} selectedCategory={selectedCategory} />
                </div>
            </div>

        </div>
    )
}

export default Courses
