

import  { FC, useState } from 'react';
import { updateProfilePassword } from '../../../Api/user';
import { useNavigate } from 'react-router-dom';


const Changepassword:FC = () => {
    const [oldpassword, setoldpassword] = useState('')
    const [newpassword, setnewpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [loading, setLoading] = useState<boolean>(false);
    const navigate=useNavigate()

    const handleoldpassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setoldpassword(e.target.value);
    };
    const handlenewpassword= (e: React.ChangeEvent<HTMLInputElement>) => {
        setnewpassword(e.target.value);
    };
    const handleconfirmnewpassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setconfirmpassword(e.target.value);
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const userId = localStorage.getItem('userId');
            console.log(userId)
            if(userId!==null){
                const response = await updateProfilePassword(userId, oldpassword, newpassword, confirmpassword)
                if (response) {
                    setLoading(false);
                    navigate('/profile');
                }

                console.log('Password changed successfully:', response?.data);

            }
            
           
        } catch (error) {
            setLoading(false);
            console.error('Error changing password:', error);
        }
    };

    return (
        <>
        
                            <div className="mx-auto w-full max-w-[550px]">
                                <form onSubmit={handleSubmit} method="POST">
                                    <div className="mb-5">
                                        <label htmlFor="oldpassword" className="mb-3 block text-base font-medium text-white">
                                            Old password
                                        </label>
                                        <input
                                            type="password"
                                            name="oldpassword"
                                            id="oldpassword"
                                            value={oldpassword}
                                            onChange={handleoldpassword}
                                            placeholder="oldpassword"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-gray-900 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                    <div className="mb-5">
                    <label htmlFor="newpassword" className="mb-3 block text-base font-medium text-white">
                                            New password
                                        </label>
                                        <input
                                            type="password"
                                            name="newpassword"
                                            id="newpassword"
                                            value={newpassword}
                                            onChange={handlenewpassword}
                                            placeholder="newpassword"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-gray-900 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                    <div className="mb-5">
                    <label htmlFor="confirmpassword" className="mb-3 block text-base font-medium text-white">
                                            Confirm New password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmpassword"
                                            id="confirmpassword"
                                            value={confirmpassword}
                                            onChange={handleconfirmnewpassword}
                                            placeholder="confirmpassword"
                                            className="w-full rounded-md border border-[#e0e0e0] bg-gray-900 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                    </div>
                                    <div>
                                        <button type='submit' className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
            {
                loading && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>
                    </div>
                )
            }
        </>
                      
    );
}

export default Changepassword;