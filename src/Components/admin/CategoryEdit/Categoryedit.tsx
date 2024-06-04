
import React, { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { editCategory, updateCategory } from '../../../Api/admin';

const Categoryedit: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                if (id !== undefined) {
                    const response = await editCategory(id);
                    const { name, description } = response?.data.category || {};
                    setName(name || '');
                    setDescription(description || '');
                }
            } catch (error) {
                console.error('Error fetching category details:', error);
            }
        };

        fetchCategoryDetails();
    }, [id]);

    const validateForm = () => {
        const errors: { [key: string]: string } = {};

        if (!name.trim()) {
            errors.name = 'Name is required';
        } else if (name.trim().length < 3) {
            errors.name = 'Name must be at least 3 characters long';
        } else if (name.trim().length > 50) {
            errors.name = 'Name must be less than 50 characters long';
        } else if (!/^[a-zA-Z0-9\s]+$/.test(name.trim())) {
            errors.name = 'Name can only contain letters, numbers, and spaces';
        }

        if (!description.trim()) {
            errors.description = 'Description is required';
        } else if (description.trim().length < 5) {
            errors.description = 'Description must be at least 5 characters long';
        } else if (description.trim().length > 200) {
            errors.description = 'Description must be less than 200 characters long';
        } else if (!/^[a-zA-Z0-9\s]+$/.test(description.trim())) {
            errors.description = 'Description can only contain letters, numbers, and spaces';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleBlur = (field: string) => {
        setTouched((prevTouched) => ({ ...prevTouched, [field]: true }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                if (id !== undefined) {
                    const response = await updateCategory(id, name, description);
                    console.log('Response:', response?.data);
                    setName('');
                    setDescription('');
                    if (response?.status === 200) {
                        navigate('/admin/categoryview');
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px]">
                <form onSubmit={handleSubmit}>
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
                            onBlur={() => handleBlur('name')}
                            className={`w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-[#e0e0e0]'} bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                        />
                        {touched.name && errors.name && (
                            <p className="text-red-500">{errors.name}</p>
                        )}
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
                            onBlur={() => handleBlur('description')}
                            className={`w-full resize-none rounded-md border ${errors.description ? 'border-red-500' : 'border-[#e0e0e0]'} bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md`}
                        ></textarea>
                        {touched.description && errors.description && (
                            <p className="text-red-500">{errors.description}</p>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Categoryedit;