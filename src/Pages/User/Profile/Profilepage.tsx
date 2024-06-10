/* eslint-disable @typescript-eslint/no-explicit-any */


import { useState, useEffect} from 'react';
import { profile } from '../../../Api/user';
// import { useSelector } from 'react-redux';
// import { ProfileStateContext } from './Profilecontainer';




interface User {
  id: string
  name: string;
  email: string;
  password: string;
  phone?: string;
  profileimage?: string;
  otp?: string;
  isVerified?: boolean;
  isBlocked?: boolean;
}

const Profilepage = () => {
  // const user = useSelector((state: any) => state.value.userData);
  // const userId = user?._id
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(userId)
        if (userId !== null) {
          const response = await profile(userId)
          console.log(response?.data.profile)
          setUserDetails(response?.data.profile);

        }



      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <>
      <div className="mx-auto w-full bg-gray-900 max-w-[550px]">
        <div className=" flex h-auto flex-col justify-center overflow-hidden  ">
          {userDetails && (
            <div className="  h-screen shadow-sm  rounded-sm">
              <div className="flex p-12 justify-center">
                <img src={userDetails.profileimage} alt="Profile" className="rounded-full w-36 h-36 object-cover" />
              </div>

              <div className="flex items-center pb-3 space-x-2 font-semibold text-gray-200 leading-8">
                <span className="text-green-500">
                  <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">

                  <div className="grid grid-cols-2">
                    <div className="px-4 text-gray-200 py-2 font-semibold"> Name</div>
                    <div className="px-4 text-gray-200 py-2">{userDetails.name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 text-gray-200 ps-20 py-2 font-semibold">Phone</div>
                    <div className="px-4 text-gray-200 py-2">{userDetails.phone}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 text-gray-200 py-2  font-semibold">Email</div>
                    <div className="px-4  text-gray-200 py-2">{userDetails.email}</div>
                  </div>

                 

                </div>
              </div>

              


            </div>
          )}
        </div>
      </div>


    </>





  )
}

export default Profilepage






