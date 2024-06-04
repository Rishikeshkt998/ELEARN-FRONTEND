
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { otpResend, verifyOtp } from "../../../Api/user";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../store/slice/authSlice";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

const Otp: FC = () => {
    const navigate = useNavigate()
    const [otp, setOtp] = useState<string>("");
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(30)

    const dispatch = useDispatch()
    const location = useLocation();
    const email = location.state.email;
    console.log(email)

    useEffect(() => {
        const intervel = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1)
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(intervel)
                } else {
                    setSeconds(59)
                    setMinutes(minutes - 1)
                }
            }
        }, 1000)

        return () => {
            clearInterval(intervel)
        }
    }, [seconds])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!otp.trim()) {
            toast.error('Please enter OTP');
            return;
        }

        if (!/^\d{4}$/.test(otp)) {
            toast.error('OTP must be exactly 4 digits long');
            return;
        }

        try {
            const response = await verifyOtp(otp)

            console.log("Verification response:", response?.data);
            setOtp("");
            dispatch(setCredentials(response?.data.token))
            toast.success('Successfully logged in...')
            if (response?.data.success) {
                navigate('/login');
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
        }
    };

    const handleResendOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setMinutes(0)
        setSeconds(30)
        console.log(email)
        const res = await otpResend(email)
       
        if (res?.data.success) {
            toast.success('new otp sent..')
        } else if (!res?.data.success) {
            toast.error('something went wrong');
        }
    };

    return (
        <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-black py-12">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>Enter Your otp here</p>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col space-y-5">
                                <input
                                    className="w-full h-16 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                    type="text"
                                    value={otp}
                                    onChange={handleInputChange}
                                    placeholder="Enter OTP"
                                    maxLength={4}
                                    required
                                />
                                <button  className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                    Verify Account
                                </button>
                                <div className='text-red-500'>
                                    <p>Time Remaining : {' '}
                                        {minutes < 10 ? `0${minutes}` : minutes}:
                                        {seconds < 10 ? `0${seconds}` : seconds}
                                    </p>
                                    {seconds === 0 && minutes === 0 && <button className='text-blue-200 ml-4 cursor-pointer' onClick={handleResendOtp} >Resend OTP</button>}

                                </div>
                      
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Otp;