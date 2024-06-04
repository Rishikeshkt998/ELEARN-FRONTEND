

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
interface Category {
    id: number;
    name?: string;
    description?: string;
}

function AddCourse() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [courseName, setcourseName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const navigate=useNavigate()

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/course/category');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const addCourse = async () => {
        try {
            const formData = new FormData();
            formData.append('courseName', courseName);
            formData.append('price', price);
            formData.append('category', category);
            formData.append('description', description);
            if (imageFile) {
                formData.append('image', imageFile);
            }

            const response = await axios.post('http://localhost:5000/api/course/addcourse', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Course added successfully:', response.data);
            setcourseName('');
            setPrice('');
            setCategory('');
            setDescription('');
            setImageFile(null);
            toggleModal();
            fetchCourses();
            if (response.data.success) {

                navigate(`/tutor/trainer/courseview`);
            } else {
                toast.error('some error occured !!')
                
            }
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <div className={`pt-6 h-screen px-4 bg-white ${isModalOpen ? 'backdrop-blur-lg bg-opacity-50' : ''}`} >
                <div className="w-full grid grid-cols-1 xl:grid-cols-1 2xl:grid-cols-3 gap-4">
                    <div className="bg-white shadow border border-gray-400 p-4 sm:p-12 xl:p-12  2xl:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex-shrink-0">
                                Start Creating Your courses
                            </div>
                        </div>
                        <div id="main-chart"></div>
                    </div>
                </div>
                <button
                    className="block bg-violet-500 text-white mt-6 mr-2 py-2 px-4"
                    onClick={toggleModal}
                >
                    Create Your Course
                </button>

                <div
                    id="crud-modal"
                    tabIndex={-1}
                    aria-hidden={!isModalOpen}
                    className={`overflow-y-auto overflow-x-hidden fixed border-gray- top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isModalOpen ? '' : 'hidden'}`}
                >
                    <div className="relative w-full max-w-2xl mx-auto">
                        <div className="relative bg-gray-800 ms-16 rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-200 dark:text-white">
                                    Create New Course
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={toggleModal}
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form className="p-4 md:p-5">
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label htmlFor="courseName" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Name</label>
                                        <input
                                            type="text"
                                            name="courseName"
                                            id="courseName"
                                            value={courseName}
                                            onChange={(e) => setcourseName(e.target.value)}
                                            className="bg-black border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Type product name"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Price</label>
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="bg-black border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="$2999"
                                            required
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Category</label>
                                        <select
                                            id="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            className="bg-black border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option value="" disabled>Select category</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.name}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Course Description</label>
                                        <textarea
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            rows={4}
                                            className="block p-2.5 w-full text-sm text-gray-400 bg-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Write course description here"
                                        ></textarea>
                                    </div>
                                    <div className="col-span-2">
                                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-200 dark:text-white">Image</label>
                                        <input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                                            className="bg-black border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={addCourse}
                                    className="text-white inline-flex items-center bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <svg
                                        className="me-1 -ms-1 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    Add new product
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </>
        
    );
}

export default AddCourse;