// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import { ChangedPasswordForgot } from '@/Api/user';

// const ChangePassword: React.FC = () => {
//     const [newpassword, setPassword] = useState<string>('');
//     const [confirmpassword, setConfirmPassword] = useState<string>('');
//     const navigate=useNavigate()
//     const location = useLocation();
//     const email = location.state.email;

    
//     const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setPassword(e.target.value);
//     };

//     const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setConfirmPassword(e.target.value);
//     };

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         try {
//             const response = await ChangedPasswordForgot(email,newpassword,confirmpassword)
//             console.log(response);
//             setPassword('');
//             setConfirmPassword('');
//             if (response) {
//                 navigate('/login');
//             }
//         } catch (error) {
//             console.error('Error resetting password:', error);
//         }
//     };

//     return (
//         <section className="bg-black dark:bg-gray-900">
//             <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                 <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
//                     <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                         Forgot password
//                     </h2>
//                     <form onSubmit={handleSubmit} className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                        
//                         <div>
//                             <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
//                             <input type="password" value={newpassword} onChange={handlePasswordChange} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
//                         </div>
//                         <div>
//                             <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
//                             <input type="password" value={confirmpassword} onChange={handleConfirmPasswordChange} name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
//                         </div>
//                         <div className="flex items-start">
//                             {/* <div className="flex items-center h-5">
//                                 {/* <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required /> */}
//                             {/* </div>
//                             <div className="ml-3 text-sm">
//                                 <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
//                             </div> */} 
//                         </div>
//                         <button type="submit" className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset password</button>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default ChangePassword



import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChangedPasswordForgot } from '@/Api/user';
import { toast } from 'react-toastify';

const ChangePassword: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const validationSchema = Yup.object({
        newpassword: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('New Password is required'),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('newpassword'), undefined], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const handleSubmit = async (values: { newpassword: string, confirmpassword: string }) => {
        const { newpassword, confirmpassword } = values;

        try {
            const response = await ChangedPasswordForgot(email, newpassword, confirmpassword);
            console.log(response);
            if (response?.data.success) {
                toast("password changed successfully")
                navigate('/login');
            } else if (!response?.data.success) {
                toast.error(response?.data.message)
            }
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    return (
        <section className="bg-black dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                    <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Forgot password
                    </h2>
                    <Formik
                        initialValues={{ newpassword: '', confirmpassword: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ errors, touched }) => (
                            <Form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                                <div>
                                    <label htmlFor="newpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        New Password
                                    </label>
                                    <Field
                                        type="password"
                                        name="newpassword"
                                        id="newpassword"
                                        placeholder="••••••••"
                                        className={`bg-gray-50 border ${errors.newpassword && touched.newpassword ? 'border-red-500' : 'border-gray-300'
                                            } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                    <ErrorMessage name="newpassword" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Confirm Password
                                    </label>
                                    <Field
                                        type="password"
                                        name="confirmpassword"
                                        id="confirmpassword"
                                        placeholder="••••••••"
                                        className={`bg-gray-50 border ${errors.confirmpassword && touched.confirmpassword ? 'border-red-500' : 'border-gray-300'
                                            } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                    />
                                    <ErrorMessage name="confirmpassword" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Reset password
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;