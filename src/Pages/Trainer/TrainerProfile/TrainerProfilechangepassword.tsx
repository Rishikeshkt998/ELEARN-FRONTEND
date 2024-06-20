import { FC, useState } from 'react';
import { updateTrainerProfilePassword } from '../../../Api/trainer';
import TrainerProfilenavbar from './TrainerProfilenavbar';


import { useNavigate } from 'react-router-dom';
const TrainerProfilechangepassword: FC = () => {
    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate=useNavigate()

    const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, oldPassword: '' }));
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, newPassword: '' }));
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Password validation
        const errors: { [key: string]: string } = {};
        if (!oldpassword.trim()) {
            errors.oldPassword = 'Old password is required';
        }
        if (!newpassword.trim()) {
            errors.newPassword = 'New password is required';
        } else if (newpassword.length < 8) {
            errors.newPassword = 'Password must be at least 8 characters long';
        } else if (!/\d/.test(newpassword)) {
            errors.newPassword = 'Password must contain at least one digit';
        } else if (!/[A-Z]/.test(newpassword)) {
            errors.newPassword = 'Password must contain at least one uppercase letter';
        } else if (!/[a-z]/.test(newpassword)) {
            errors.newPassword = 'Password must contain at least one lowercase letter';
        } else if (!/\W/.test(newpassword)) {
            errors.newPassword = 'Password must contain at least one special character';
        }
        if (newpassword !== confirmpassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // Submit the form
        try {
            const trainerId = localStorage.getItem('trainerId');
            if (trainerId) {
                const response = await updateTrainerProfilePassword(trainerId, oldpassword, newpassword, confirmpassword);
                console.log('Password changed successfully:', response?.data);
                if (response?.data.success) {
                    navigate('/tutor/tutorprofile')
                }
            }
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    return (
        <>
            <TrainerProfilenavbar />
            {/* <div className="w-full bg-gray-900 md:ms-28 h-screen md:w-9/12 mx-2 md:mx-auto"> */}
            <div className="mx-auto w-full h-screen  max-w-[550px]">
                <div className="flex items-center justify-center p-12">
                    <div className="mx-auto w-full max-w-[550px]">
                        <form onSubmit={handleSubmit} method="POST">
                            <div className="mb-5">
                                <label htmlFor="oldpassword" className="mb-3 block text-base font-medium text-gray-300">
                                    Old password
                                </label>
                                <input
                                    type="password"
                                    name="oldpassword"
                                    id="oldpassword"
                                    value={oldpassword}
                                    onChange={handleOldPasswordChange}
                                    placeholder="Old Password"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {errors.oldPassword && <p className="text-red-500">{errors.oldPassword}</p>}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="newpassword" className="mb-3 block text-base font-medium text-gray-300">
                                    New password
                                </label>
                                <input
                                    type="password"
                                    name="newpassword"
                                    id="newpassword"
                                    value={newpassword}
                                    onChange={handleNewPasswordChange}
                                    placeholder="New Password"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {errors.newPassword && <p className="text-red-500">{errors.newPassword}</p>}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="confirmpassword" className="mb-3 block text-base font-medium text-gray-300">
                                    Confirm New password
                                </label>
                                <input
                                    type="password"
                                    name="confirmpassword"
                                    id="confirmpassword"
                                    value={confirmpassword}
                                    onChange={handleConfirmPasswordChange}
                                    placeholder="Confirm New Password"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
                            </div>
                            <div>
                                <button type='submit' className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TrainerProfilechangepassword;