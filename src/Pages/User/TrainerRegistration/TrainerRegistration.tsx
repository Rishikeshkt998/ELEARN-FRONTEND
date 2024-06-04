
import React, { useState } from 'react';
import { trainerSignup } from '../../../Api/trainer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const TrainerRegistration: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmpassword: '',
        dateOfBirth: ''
    });
    const navigate=useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

       
        if (!formData.name.trim()) {
            toast.error('Name is required');
            return;
        }

        if (!formData.email.trim()) {
            toast.error('Email is required');
            return;
        }

        if (!validateEmail(formData.email.trim())) {
            toast.error('Invalid email address');
            return;
        }

        if (!formData.phone.trim()) {
            toast.error('Phone number is required');
            return;
        }

        if (!validatePhone(formData.phone.trim())) {
            toast.error('Invalid phone number');
            return;
        }

        if (!formData.dateOfBirth.trim()) {
            toast.error('Date of birth is required');
            return;
        }

        if (!formData.password.trim()) {
            toast.error('Password is required');
            return;
        }

        if (formData.password.trim().length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        if (formData.password !== formData.confirmpassword) {
            toast.error('Passwords do not match');
            return;
        }

        
        try {
            const response = await trainerSignup(formData.name, formData.email, formData.phone, formData.password, formData.confirmpassword, formData.dateOfBirth);
            console.log('Response:', response.data);
       
            setFormData({
                name: '',
                email: '',
                phone: '',
                password: '',
                confirmpassword: '',
                dateOfBirth: ''
            });
            Swal.fire({
                title: 'Success!',
                text: 'Registration successful,otp has been send to your email',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    const email=formData.email
                    navigate('/trainerotp',{ state: { email} });
                }
            });
            toast.success('Registration successful');
        } catch (error) {
            console.error('Error:', error);
            Swal.fire(
                'Error!',
                'An error occurred. Please try again later.',
                'error'
            );
            toast.error('An error occurred. Please try again later.');
        }
    };

    const validateEmail = (email: string): boolean => {
        
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone: string): boolean => {
       
        const re = /^\d{10}$/;
        return re.test(phone);
    };

    return (
        <div className="p-11 bg-indigo-100 flex justify-center items-center">
            <div className="lg:w-1/2 md:w-full w-2/3">
                <form className="bg-white p-10 rounded-lg shadow-lg min-w-full" onSubmit={handleSubmit}>
                    <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">Registration form for Tutor</h1>
                    <div>
                        <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="name">Name</label>
                        <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="name" id="name" placeholder="username" onChange={handleChange} value={formData.name} />
                    </div>
                    <div>
                        <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="email">Email</label>
                        <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="email" name="email" id="email" placeholder="Enter your email" onChange={handleChange} value={formData.email} />
                    </div>
                    <div>
                        <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="phone">Phone</label>
                        <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="text" name="phone" id="phone" placeholder="Enter your phone" onChange={handleChange} value={formData.phone} />
                    </div>
                    <div className="mb-4 my-3">
                        <label className=" text-gray-800 font-semibold block my-3 text-md" htmlFor="Date">
                            Date of birth
                        </label>
                        <input
                            className="shadow appearance-none border bg-gray-100 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="dateOfBirth" id="dateOfBirth" type="date" placeholder="Date of birth" required onChange={handleChange} value={formData.dateOfBirth} />
                    </div>
                    <div>
                        <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="password">Password</label>
                        <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="password" name="password" id="password" placeholder="password" onChange={handleChange} value={formData.password} />
                    </div>
                    <div>
                        <label className="text-gray-800 font-semibold block my-3 text-md" htmlFor="confirmpassword">Confirm password</label>
                        <input className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none" type="password" name="confirmpassword" id="confirmpassword" placeholder="confirm password" onChange={handleChange} value={formData.confirmpassword} />
                    </div>
                    <button type="submit" className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans">Register</button>
                </form>
            </div>
        </div>
    );
};

export default TrainerRegistration;