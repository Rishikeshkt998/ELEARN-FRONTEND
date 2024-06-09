/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';



// const ProfileEditpage = () => {
//     const [userData, setUserData] = useState({
//         name: '',
//         email: '',
//         phone: '',
//         password: '',
//         profilepicture: '' as string | File,
//     });
//     const navigate = useNavigate()
//     const userId = localStorage.getItem('userId');
//     console.log(userId);
//     useEffect(() => {
//         const fetchUserDetails = async () => {
//             try {


//                 const response = await axios.get(`http://localhost:5000/api/user/profileedit/${userId}`);
//                 console.log(response.data.profile);
//                 setUserData(response.data.profile);
//             } catch (error) {
//                 console.error('Error fetching user details:', error);
//             }
//         };

//         fetchUserDetails();
//     }, [userId]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setUserData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             const userId = localStorage.getItem('userId');
//             const response = await axios.put(`http://localhost:5000/api/user/updateprofile/${userId}`, userData);
//             console.log('User data updated:', response.data);
//             if (response) {
//                 navigate('/profile')
//             }

//         } catch (error) {
//             console.error('Error updating user data:', error);
//         }
//     };




//     return (


//         <div className="mx-auto w-full max-w-[550px]">
//             <form onSubmit={handleSubmit} action="https://formbold.com/s/FORM_ID" method="POST">
//                 <div className="mb-5">
//                     <label
//                         htmlFor="name"
//                         className="mb-3 block text-base font-medium text-[#07074D]"
//                     >
//                         Name
//                     </label>
//                     <input
//                         type="text"
//                         name="name"
//                         id="name"
//                         value={userData.name}
//                         onChange={handleChange}
//                         placeholder="Full Name"
//                         className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                     />
//                 </div>
//                 <div className="mb-5">
//                     <label
//                         htmlFor="phone"
//                         className="mb-3 block text-base font-medium text-[#07074D]"
//                     >
//                         Phone
//                     </label>
//                     <input
//                         type="phone"
//                         name="phone"
//                         id="phone"
//                         value={userData.phone}
//                         onChange={handleChange}
//                         placeholder="example@domain.com"
//                         className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
//                     />
//                 </div>

//                 <div>
//                     <button
//                         className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
//                     >
//                         Submit
//                     </button>
//                 </div>
//             </form>
//         </div>


//     )
// }

// export default ProfileEditpage
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { profile } from '@/Api/user';
const ProfileEditpage = () => {
    const user = useSelector((state:any) => state.value.userData);
    const userId=user?._id
    console.log("values", userId)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        profilepicture: '' as string | File,
    });
    const [errors, setErrors] = useState({
        name: '',
        phone: ''
    });
    const navigate = useNavigate();
   

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await profile(userId)
                setUserData(response?.data.profile);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let formIsValid = true;

        // Name validation
        if (!userData.name.trim()) {
            setErrors(prevErrors => ({
                ...prevErrors,
                name: 'Name is required'
            }));
            formIsValid = false;
        }

        // Phone validation
        if (!userData.phone.trim()) {
            setErrors(prevErrors => ({
                ...prevErrors,
                phone: 'Phone is required'
            }));
            formIsValid = false;
        } else if (!/^\d{10}$/.test(userData.phone)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                phone: 'Please enter a valid 10-digit phone number'
            }));
            formIsValid = false;
        }

        if (formIsValid) {
            try {
                // const userId = localStorage.getItem('userId');
                console.log('user', userId)
                const response = await axios.put(`http://localhost:5000/api/user/updateprofile/${userId}`, userData);
                console.log('User data updated:', response.data);
                if (response) {
                    navigate('/profile');
                }
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        }
    };

    return (
        <div className="mx-auto w-full max-w-[550px]">
            <form onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="name" className="mb-3 block text-base font-medium text-white">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={userData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full rounded-md border border-[#e0e0e0] bg-gray-900 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor="phone" className="mb-3 block text-base font-medium text-white">
                        Phone
                    </label>
                    <input
                        type="phone"
                        name="phone"
                        id="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        placeholder="1234567890"
                        className="w-full rounded-md border border-[#e0e0e0] bg-gray-900 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                </div>
                <div>
                    <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProfileEditpage;


