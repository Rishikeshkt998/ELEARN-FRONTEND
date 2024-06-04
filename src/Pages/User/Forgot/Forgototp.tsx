import { FC, useState } from "react";
// import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtpForgotPassword } from "../../../Api/user";

const Forgototp:FC = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const email = location.state.email;
    console.log(email);
    const [otp, setOtp] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await verifyOtpForgotPassword (otp,email)

            console.log("Verification response:", response);
            setOtp("");
            if (response) {

                navigate('/changepassword', { state: { email } });
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
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
                            <p>We have sent a code to your email ba**@dipainhouse.com</p>
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
                                <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                    <p>Didn't receive code?</p>{" "}
                                    <a
                                        className="flex flex-row items-center text-blue-600"
                                        href="http://"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Resend
                                    </a>
                                </div>
                                <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                    Verify Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Forgototp
