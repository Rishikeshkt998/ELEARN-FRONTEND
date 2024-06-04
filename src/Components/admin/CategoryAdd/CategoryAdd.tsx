
import React, { useState } from 'react';
import { addCategory } from '../../../Api/admin';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CategoryAdd = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate=useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim() || !description.trim()) {
            setError('Please provide both category name and description.');
            return;
        }
        if (name.length < 3 || description.length < 10) {
            setError('Category name should be minimum 3 characters and description should be minimum 10 characters.');
            return;
        }

        if (name.length > 50 || description.length > 100) {
            setError('Category name should be maximum 50 characters and description should be maximum 100 characters.');
            return;
        }
        const namePattern = /^[a-zA-Z0-9\s]+$/;
        if (!namePattern.test(name)) {
            setError('Category name should contain only letters and numbers.');
            return;
        }

        try {
            const response = await addCategory(name, description);

            console.log('Response:', response);

            setName('');
            setDescription('');
            setError('');
            if (response?.data.success) {
                

                navigate('/admin/categoryview')
            } else if (!response?.data.success) {
                toast.error(response?.data.message)
            }

            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleNameFocus = () => {
        setError('');
    };

    const handleDescriptionFocus = () => {
        setError('');
    };

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
                <form onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="mb-5">
                        <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                            Category
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Category"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={handleNameFocus} // Clear error when focused
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="message" className="mb-3 block text-base font-medium text-[#07074D]">
                            Description
                        </label>
                        <textarea
                            rows={4}
                            name="message"
                            id="message"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onFocus={handleDescriptionFocus} // Clear error when focused
                            className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryAdd;