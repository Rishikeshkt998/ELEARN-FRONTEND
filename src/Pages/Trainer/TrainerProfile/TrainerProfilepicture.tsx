/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useEffect, useState } from 'react';
import TrainerProfilenavbar from './TrainerProfilenavbar';
import { useNavigate } from 'react-router-dom';
import { tutorprofile, tutorprofileImages } from '@/Api/trainer';
import { toast } from 'react-toastify';

const TrainerProfilePicture: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [trainerDetails, setTrainerDetails] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate=useNavigate()

    const loadFile = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        const file = input.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                toast.error('Invalid file format. Please select an image file.');
                return;
            }
            const output = document.getElementById('preview_img') as HTMLImageElement;
            output.src = URL.createObjectURL(file);
            output.onload = () => {
                URL.revokeObjectURL(output.src); 
            };
            setSelectedFile(file); 
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        setLoading(true)
        console.log('Handle submit called');
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);
            console.log('FormData:', formData); 
            try {
                const id = localStorage.getItem('trainerId');
                if (!id) {
                    console.error('User ID not found in localStorage.');
                    return;
                }
                const response = await tutorprofileImages(id, formData, {
                    'Content-Type': 'multipart/form-data',
                })
                console.log('Response:', response?.data);
                if(response?.data.success){
                    setLoading(false)
                    navigate('/tutor/tutorprofile')
                } 
                console.log('Image uploaded successfully:', response?.data);
            } catch (error) {
                setLoading(false)
                console.error('Error uploading image:', error);
            }
        } else {
            console.error('No file selected.');
        }
    };
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

    return (
        <>
        <TrainerProfilenavbar/>
            <div className="w-full h-screen md:w-9/12 sm:w-full mx-2 ">
                <div className="my-4"></div>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center space-x-6">
                        <div className="shrink-0 mt-10 ps-72">
                            
                            <label className="block">
                                <img
                                    id="preview_img"
                                    className="h-80 w-80 object-cover rounded-full"
                                    src={trainerDetails?.image}
                                    alt="Current profile photo"
                                />
                                <span className="sr-only">Choose profile photo</span>
                                <input
                                    type="file"
                                    onChange={loadFile}
                                    
                                    className="w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100  hidden"
                       
                                />
                            </label>
                        </div>
                       
                    </div>
                    <div className="bg-gray-900 ms-24">
                        <button
                            type="submit"
                            className="bg-blue-500 ms-72 mt-11 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Upload File
                        </button>
                    </div>
                </form>
            </div>
            {loading && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>

                </div>
            )}
        </>


                    

    );
};

export default TrainerProfilePicture