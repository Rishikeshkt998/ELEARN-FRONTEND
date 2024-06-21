
import React, { useState, useEffect } from 'react';
import TrainerProfilenavbar from './TrainerProfilenavbar';
import { useNavigate } from 'react-router-dom';
import { TrainerProfileEdit, TrainerProfileEditGet } from '@/Api/trainer';

const TrainerProfileedit = () => {
    const [trainerData, setTrainerData] = useState({
        name: '',
        phone: '',
        dateOfBirth: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        dateOfBirth: ''
    });
    const navigate = useNavigate();
    const trainerId = localStorage.getItem('trainerId');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await TrainerProfileEditGet(trainerId)
                // axios.get(`http://localhost:5000/api/trainer/trainerprofileedit/${trainerId}`);
                if(response){
                    const { name, phone, dateOfBirth } = response.data.profile;
                    setTrainerData(prevState => ({
                        ...prevState,
                        name,
                        phone,
                        dateOfBirth: dateOfBirth ? formatDate(dateOfBirth) : ''
                    }));

                }
                
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [trainerId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTrainerData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validation
        let formIsValid = true;
        const newErrors = {
            name: '',
            phone: '',
            dateOfBirth: ''
        };

        if (!trainerData.name.trim()) {
            newErrors.name = 'Name is required';
            formIsValid = false;
        }

        if (!trainerData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
            formIsValid = false;
        } else if (!/^\d{10}$/.test(trainerData.phone.trim())) {
            newErrors.phone = 'Invalid phone number';
            formIsValid = false;
        }

        if (!trainerData.dateOfBirth) {
            newErrors.dateOfBirth = 'Date of Birth is required';
            formIsValid = false;
        }

        if (!formIsValid) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await TrainerProfileEdit(trainerId,trainerData)
            // axios.put(`http://localhost:5000/api/trainer/trainerupdateprofile/${trainerId}`, trainerData);
            if (response?.data.success) {
                setLoading(false);
                navigate('/tutor/tutorprofile');
            }
        } catch (error) {
            setLoading(false);
            console.error('Error updating user data:', error);
        }
    };
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    return (
        <>
            <TrainerProfilenavbar />
            {/* <div className="w-full bg-gray-900 md:ms-28 h-screen md:w-9/12 mx-2 md:mx-auto"> */}
            <div className="mx-auto w-full h-screen  max-w-[550px]">
                <div className="flex items-center justify-center p-12">
                    <div className="mx-auto w-full max-w-[550px]">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label htmlFor="name" className="mb-3 block text-base font-medium text-gray-300">Name</label>
                                <input type="text" name="name" id="name" value={trainerData.name} onChange={handleChange} placeholder="Full Name" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                {errors.name && <span className="text-red-500">{errors.name}</span>}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="phone" className="mb-3 block text-base font-medium text-gray-300">Phone</label>
                                <input type="phone" name="phone" id="phone" value={trainerData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                {errors.phone && <span className="text-red-500">{errors.phone}</span>}
                            </div>
                            <div className="mb-5">
                                <label className="text-gray-300 font-semibold block my-3 text-md" htmlFor="dateOfBirth">Date of Birth</label>
                                <input className="shadow appearance-none border bg-gray-100 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="dateOfBirth" id="dateOfBirth" type="date" value={trainerData.dateOfBirth} onChange={handleChange} />
                                {errors.dateOfBirth && <span className="text-red-500">{errors.dateOfBirth}</span>}
                            </div>
                            <div>
                                <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {loading && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>
                </div>
            )}
        </>
    );
};

export default TrainerProfileedit;