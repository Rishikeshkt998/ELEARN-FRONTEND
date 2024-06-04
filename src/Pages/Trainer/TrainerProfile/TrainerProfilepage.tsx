

import { useEffect, useState } from "react";
import { tutorprofile } from "../../../Api/trainer";
import TrainerProfilenavbar from "./TrainerProfilenavbar";
interface User {
    id: string
    name: string;
    email: string;
    password: string;
    phone?: string;
    dateOfBirth?: string;
    image?: string,
    isBlocked?: boolean,
    isVerified?: boolean,
    creationTime?: Date,
}
const TrainerProfile: React.FC = () => {
    const [trainerDetails, setTrainerDetails] = useState<User | null>(null);

    useEffect(() => {
        const fetchTrainerDetails = async () => {
            try {
                const trainerId = localStorage.getItem('trainerId')
                console.log(trainerId)
                if (trainerId !== null) {
                    const response = await tutorprofile(trainerId)
                    console.log(response?.data.trainerprofile)
                    setTrainerDetails(response?.data.trainerprofile);

                }



            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchTrainerDetails();
    }, []);
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return ''; 
        const date = new Date(dateString);
        // Example format: "Month Day, Year"
        return `${date.toLocaleString('en-US', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    };

    return (
        <>
            <TrainerProfilenavbar />

            <div className="relative flex h-auto flex-col justify-center overflow-hidden bg-gray-400 ">
                {trainerDetails && (
                <div className="bg-gray-100  h-screen shadow-sm p-16  rounded-sm">
                        <div className="flex p-12 justify-center">
                            <img src={trainerDetails.image} alt="Profile" className="rounded-full w-36 h-36 object-cover" />
                        </div>
                    
                    <div className="flex items-center pb-3 space-x-2 font-semibold text-gray-900 leading-8">
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
                                    <div className="px-4 py-2 font-semibold"> Name</div>
                                    <div className="px-4 py-2">{trainerDetails.name}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Date of Birth</div>
                                    <div className="px-4 py-2">{formatDate(trainerDetails.dateOfBirth)}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                                    <div className="px-4 py-2">{trainerDetails.phone}</div>
                                </div>

                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Email.</div>
                                    <div className="px-4 py-2">
                                        <a className="text-black" href="mailto:jane@example.com">{trainerDetails.email}</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                   

                </div>
                )}
            </div>
            

        </>
    );
}

export default TrainerProfile;