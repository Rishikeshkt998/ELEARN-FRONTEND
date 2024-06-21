/* eslint-disable @typescript-eslint/no-explicit-any */
// import { GetCategory, GetCourses, GetSearchCourse} from "@/Api/user";
// import { debounce } from "lodash";
// import {  useCallback, useEffect, useState } from "react";
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
// interface Category {
//     _id?: string;
//     name: string;
//     description: string;
//     isHidden?: boolean;
//     nooOfcourses?: number;
//     status: "active" | "frozen";

// }


// const UserCard = () => {
//     const [courses, setCourses] = useState<Course[]>([]);
//     const [searchTerm, setSearchTerm] = useState<string>("");
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [selectedCategory, setSelectedCategory] = useState<string>("");
//     const [priceSort, setPriceSort] = useState<string>("");
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [coursesPerPage] = useState<number>(3);
//     useEffect(() => {
//         async function fetchCoursesvalue() {
//             try {
//                 const response = await GetCourses()
//                 console.log("courses", response?.data)
//                 if (response?.data) {
//                     setCourses(response.data);
//                 }
//             } catch (error) {
//                 console.error('Error fetching courses:', error);
//             }
//         }
//         fetchCoursesvalue();
//     }, []);


//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await GetCategory()
//                 console.log(response?.data)
//                 setCategories(response?.data);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };

//         fetchCategories();
//     }, []);




//     const fetchCourses = async (query:any, category:any, price:any) => {
//         const response = await GetSearchCourse(query, category, price)
//         console.log("response",response)
//         return response;
//     };

//     const fetchCoursesWithDebounce = useCallback(
//         debounce(async (query:any, category:any, price:any) => {
//             try {
//                 const response = await fetchCourses(query, category, price);
//                 setCourses(response?.data.data);
//             } catch (error) {
//                 console.error('Error fetching courses:', error);
//             }
//         }, 500),[]
//     );
   

//     useEffect(() => {
//         fetchCoursesWithDebounce(searchTerm, selectedCategory, priceSort);
        
//     }, [searchTerm, selectedCategory, priceSort]);

//     const handleSearchTermChange = (e:any) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleCategoryTermChange = (e:any) => {
//         setSelectedCategory(e.target.value);
//     };

//     const handlePriceSortChange = (e:any) => {
//         setPriceSort(e.target.value);
//     };
//     const indexOfLastCourse = currentPage * coursesPerPage;
//     const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
//     const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

//     const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    



//     return (
//         <>
//             <div className="grid sm:grid-cols-12 bg-[#E9F8F3B2]  grid-col-12 gap-4   ">
//                 <div className="min-h-[100px] bg-[#E9F8F3B2] sm:col-span-3">
//                     <div className="flex flex-col items-center px-4 sm:px-6 py-4">
//                         <div className="mt-1 relative lg:w-64">
//                             <label htmlFor="topbar-search" className="sr-only">Search</label>
//                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                                 <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
//                                 </svg>
//                             </div>
//                             <input
//                                 type="text"
//                                 name="email"
//                                 id="topbar-search"
//                                 value={searchTerm}
//                                 onChange={handleSearchTermChange}
//                                 className="bg-white border border-gray-700 text-black mb-3 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
//                                 placeholder="Search"
//                             />
//                         </div>

//                         <div className="relative lg:w-64">
//                             <select
//                                 value={selectedCategory}
//                                 onChange={handleCategoryTermChange}
//                                 className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             >
//                                 <option value="">Select a category</option>
//                                 {categories.map((category, index) => (
//                                     <option key={index} value={category?.name}>{category?.name}</option>
//                                 ))}
//                             </select>
//                         </div>


//                         <div className="relative lg:w-64 mt-3">
                            
//                             <select
//                                 id="price-sort"
//                                 value={priceSort}
//                                 onChange={handlePriceSortChange}
//                                 className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                             >
//                                 <option value="">Price</option>
//                                 <option value="asc">Low to High</option>
//                                 <option value="desc">High to Low</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="min-h-[100px]  rounded-lg  bg-gray-200  sm:col-span-9">
//                     <div className='w-full bg-[#E9F8F3B2] pt-11 '>
//                         <div className='md:max-w-[1480px] m-auto max-w-[600px]   px-4 md:px-0'>
                           

//                             <div className='flex flex-col'>
//                                 <div className="max-w-screen-xl   mx-auto p-5 sm:p-10 md:p-16">
//                                     <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
                                       
//                                         {Array.isArray(courses) && courses.map(course => (
//                                             <div key={course._id} className="rounded bg-white overflow-hidden shadow-lg w-64"> {/* Adjust the width as needed */}
//                                                 <div className="relative">
//                                                     <img className="w-full" src={course?.thumbnail} alt="Course thumbnail" />
//                                                     <div className="hover:bg-transparent transition duration-300 flex absolute bottom-0 right-0 left-0"></div>
//                                                 </div>
//                                                 <div className="px-6 py-4">
//                                                     <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out overflow-hidden whitespace-nowrap overflow-ellipsis" style={{ maxWidth: '100%' }}>{course?.name}</a>
//                                                     <p className="text-gray-500 text-sm">{course?.category}</p>
//                                                 </div>
//                                                 <div className="px-6 py-4 flex justify-between items-center">
//                                                     <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">₹{course?.estimatedPrice}Rs</a>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                     <div className="mt-16">
//                                         <nav className="flex justify-center">
//                                             <ul className="flex space-x-4">
//                                                 {[...Array(Math.ceil(courses.length / coursesPerPage)).keys()].map(number => (
//                                                     <li key={number}>
//                                                         <button
//                                                             onClick={() => paginate(number + 1)}
//                                                             className={`${number + 1 === currentPage
//                                                                 ? 'bg-indigo-500 text-white'
//                                                                 : 'text-gray-500 hover:bg-gray-300'
//                                                                 } px-3 py-1 rounded focus:outline-none`}
//                                                         >
//                                                             {number + 1}
//                                                         </button>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         </nav>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </>

//     );
// };

// export default UserCard;
import { AddToWhishlist, EnrolledCoursesView, GetCategory, GetCourses, GetSearchCourse, getWhishlist } from "@/Api/user";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    const [whishlist, setWhishlist] = useState<any[]>([])
    const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
    const userId = localStorage.getItem('userId') as string | null;

    useEffect(() => {
        async function fetchCoursesvalue() {
            try {
                const response = await GetCourses();
                console.log("courses", response?.data);
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
                const response = await GetCategory();
                console.log(response?.data);
                setCategories(response?.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const fetchCourses = async (query: any, category: any, price: any) => {
        console.log("category,price,query",query,category,price)
        const response = await GetSearchCourse(query, category, price);
        console.log("response", response);
        return response;
    };

    const fetchCoursesWithDebounce = useCallback(
        debounce(async (query: any, category: any, price: any) => {
            try {
                const response = await fetchCourses(query, category, price);
                setCourses(response?.data.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }, 500), []
    );
    const resetFilter = () => {
        setSelectedCategory("");
        setPriceSort("");
        setSearchTerm("")
    };

    useEffect(() => {
        fetchCoursesWithDebounce(searchTerm, selectedCategory, priceSort);
    }, [searchTerm, selectedCategory, priceSort]);

    const handleSearchTermChange = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryTermChange = (e: any) => {
        setSelectedCategory(e.target.value);
    };

    const handlePriceSortChange = (e: any) => {
        setPriceSort(e.target.value);
    };

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
        }).format(price);
    };
    useEffect(() => {
        async function fetchEnrolled() {
            try {
                const coursesResponse = await EnrolledCoursesView(userId);
                console.log("enrolled", coursesResponse?.data?.EnrolledCourses)
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
    const handleAddToWishlist = async (courseId: any) => {
        try {
            const response = await AddToWhishlist(courseId, userId);
            console.log("whishlist values", response)
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
                const data = response?.data.favourites.favourites
                if (data) {
                    const ids = data.map((item: any) => item._id)
                    setWhishlist(ids)
                }
                console.log("whishlist", whishlist)

            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchWhishlist();
    }, [whishlist, userId]);

    return (
        <>
            <div className="grid sm:grid-cols-12 bg-[#E9F8F3B2] grid-col-12 gap-4">
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

                        <div className="relative lg:w-64 ">
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryTermChange}
                                className="bg-white border border-gray-700 text-black  sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-5 p-1.5"
                            >
                                <option value="">Select a category</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category?.name}>{category?.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative lg:w-64   mt-3">
                            <select
                                id="price-sort"
                                value={priceSort}
                                onChange={handlePriceSortChange}
                                className="bg-white border border-gray-700 text-black mb-3 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-5 p-1.5"
                            >
                                <option value="">Price</option>
                                <option value="asc">Low to High</option>
                                <option value="desc">High to Low</option>
                            </select>
                        </div>
                        <div className="relative lg:w-64">
                            <button
                                onClick={resetFilter}
                                className="inline-flex items-center px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md w-full pl-5 "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                Reset
                            </button>
                            </div>
                    </div>
                </div>
                <div className="min-h-[100px] rounded-lg bg-gray-200 sm:col-span-9">
                    <div className='w-full bg-[#E9F8F3B2] pt-11'>
                        <div className='md:max-w-[1480px] m-auto max-w-[600px] px-4 md:px-0'>
                            <div className='flex flex-col'>
                                <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
                                    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
                                        {Array.isArray(currentCourses) && currentCourses.map(course => (
                                            
                                            <div key={course._id} className="rounded bg-white overflow-hidden shadow-lg w-64"> {/* Adjust the width as needed */}
                                                <Link to={`/coursedetails/${course._id}`}  >
                                                <div className="relative">
                                                    <img className="w-full h-36" src={course?.thumbnail} alt="Course thumbnail" />
                                                    <div className="hover:bg-transparent transition duration-300 flex absolute bottom-0 right-0 left-0"></div>
                                                </div>
                                                <div className="px-6 py-4">
                                                    <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out overflow-hidden whitespace-nowrap overflow-ellipsis" style={{ maxWidth: '100%' }}>{course?.name}</a>
                                                    <p className="text-gray-500 text-sm">{course?.category}</p>
                                                </div>
                                                </Link>
                                                <div className="px-6 py-4 flex justify-between items-center">
                                                        <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{formatPrice(course?.price)}</a>
                                                        {enrolledCourses.includes(course._id) ? (
                                                            // <span className="text-green-500 font-bold">Enrolled</span>
                                                            <span className="text-green-700 bg-green-100 border border-green-500 font-bold rounded px-3 py-1">Enrolled</span>
                                                        ) : (
                                                            // <button
                                                            //     onClick={() => handleAddToWishlist(course._id)}
                                                            //     className={`transition duration-500 ease-in-out ${(whishlist.includes(course._id)) ? 'text-red-500' : 'text-black'} p-2`}
                                                            // >
                                                            //     <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            //         <path d="M6 2C5.44772 2 5 2.44772 5 3V21C5 21.7015 5.74743 22.1465 6.36498 21.8413L12 19.118L17.635 21.8413C18.2526 22.1465 19 21.7015 19 21V3C19 2.44772 18.5523 2 18 2H6Z" />
                                                            //     </svg>
                                                            // </button>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCard;
