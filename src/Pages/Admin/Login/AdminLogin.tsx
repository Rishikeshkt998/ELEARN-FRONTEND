


import { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { setAdminCredentials } from "../../../store/slice/authSlice";
import { useDispatch } from 'react-redux';
import { adminLogin } from "../../../Api/admin";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters long')
            .required('Password is required'),
    });

    const handleSubmit = async (values: { email: string; password: string }) => {
        try {
            const { email, password } = values;

            const res = await adminLogin(email, password);
            console.log(res);

            if (res?.data.success) {
                dispatch(setAdminCredentials(res.data.token));
                navigate('/admin/dashboard');
            } else {
                toast.error('Invalid email or password');
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1525302220185-c387a117886e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)" }}>
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Welcome Back!
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
                </div>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="mt-8 space-y-6" action="#" method="POST">
                            <div className="relative">
                                <label htmlFor="email" className="text-sm font-bold text-gray-700 tracking-wide">
                                    Email
                                </label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                    placeholder="mail@gmail.com"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>

                            <div className="mt-8">
                                <label htmlFor="password" className="text-sm font-bold text-gray-700 tracking-wide">
                                    Password
                                </label>
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                                    placeholder="Enter your password"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500" />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center bg-indigo-500 hover:bg-indigo-600 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-300"
                                >
                                    Sign in
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AdminLogin;