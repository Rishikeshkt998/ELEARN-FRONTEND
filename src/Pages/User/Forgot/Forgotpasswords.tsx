// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { forgotPassword } from '../../../Api/user';


// const ForgotPasswords: React.FC = () => {
//     const [email, setEmail] = useState<string>('');
//     const navigate = useNavigate();

//     const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
//         setEmail(e.target.value);
//     };

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         try {
//             const response = await forgotPassword(email)
//             console.log(response);
//             if (response) {
//                 const email = response.data.email; 
//                 navigate('/forgotpasswordotp', { state: { email } });
//             }
//         } catch (error) {
//             console.error('Error resetting password:', error);
//         }
//     };

//     return (
//         <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black py-12">
//                 <div className="max-w-lg mx-auto  my-10 bg-white p-11 rounded-xl shadow shadow-slate-300">
//                     <h1 className="text-4xl font-medium ">Forgot password</h1>
//                     <p className="text-slate-500 pt-3">Fill up the form to reset the password</p>

//                     <form onSubmit={handleSubmit} className="my-10 ">
//                         <div className="flex flex-col space-y-5">
//                             <label htmlFor="email">
//                                 <p className="font-medium text-slate-700 pb-2">Email address</p>
//                             <input id="email" name="email" type="email" value={email} onChange={handleEmailChange} className="w-96  py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address" />
//                             </label>

//                             <button type="submit" className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
//                                 </svg>

//                                 <span>Reset password</span>
//                             </button>
//                         </div>
//                     </form>
//                 </div>

//         </div>
        
//     );
// }

// export default ForgotPasswords;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { forgotPassword } from '../../../Api/user';
import { toast } from 'react-toastify';

const ForgotPasswords: React.FC = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
    });

    const handleSubmit = async (values: { email: string }) => {
        const { email } = values;

        try {
            const response = await forgotPassword(email);
            console.log(response?.data);
            if (response?.data.success) {
                navigate('/forgotpasswordotp', { state: { email } });
            } else if (!response?.data.success) {
                toast.error(response?.data.message)
            }

            // if (response) {
            //     navigate('/forgotpasswordotp', { state: { email } });
            // }
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black py-12">
            <div className="max-w-lg mx-auto my-10 bg-white p-11 rounded-xl shadow shadow-slate-300">
                <h1 className="text-4xl font-medium">Forgot password</h1>
                <p className="text-slate-500 pt-3">Fill up the form to reset the password</p>

                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="my-10">
                            <div className="flex flex-col space-y-5">
                                <label htmlFor="email">
                                    <p className="font-medium text-slate-700 pb-2">Email address</p>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        className={`w-full py-3 border ${errors.email && touched.email ? 'border-red-500' : 'border-slate-200'
                                            } rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow`}
                                        placeholder="Enter email address"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </label>

                                <button
                                    type="submit"
                                    className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                                        />
                                    </svg>
                                    <span>Reset password</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ForgotPasswords;