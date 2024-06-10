/* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeEmail, profile } from '../../../Api/user';

const ProfileChangeEmail: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError('');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Email validation
        if (!email.trim()) {
            setError('Email is required');
            return;
        } else if (!isValidEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            const id = localStorage.getItem('userId');
            if (id !== null) {
                const response = await changeEmail(id, email);
                console.log(response);
                if (response) {
                    navigate('/profleotp', { state: { email } });
                }
            }
        } catch (error) {
            console.error('Error changing email:', error);
        }
    };

    // Function to validate email format
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const [userDetails, setUserDetails] = useState<any| null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                console.log(userId)
                if (userId !== null) {
                    const response = await profile(userId)
                    console.log(response?.data.profile)
                    setUserDetails(response?.data.profile);
                    setEmail(userDetails?.email)

                }



            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="mx-auto w-full pt-12 max-w-[550px]">
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="mb-3 block text-base font-medium text-white"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="example@domain.com"
                        className="w-full rounded-md border border-[#e0e0e0] bg-gray-900 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                </div>
                <div>
                    <button
                        className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProfileChangeEmail;