import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import TrainerProfilenavbar from './TrainerProfilenavbar';
import { useNavigate } from 'react-router-dom';

const TrainerProfilePicture: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const navigate=useNavigate()

    const loadFile = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        const file = input.files?.[0];
        if (file) {
            const output = document.getElementById('preview_img') as HTMLImageElement;
            output.src = URL.createObjectURL(file);
            output.onload = () => {
                URL.revokeObjectURL(output.src); // free memory
            };
            setSelectedFile(file); // Save the selected file in state
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior
        console.log('Handle submit called');
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);
            console.log('FormData:', formData); // Log formData for debugging
            try {
                const id = localStorage.getItem('trainerId');
                if (!id) {
                    console.error('User ID not found in localStorage.');
                    return;
                }
                const response = await axios.put(`http://localhost:5000/api/trainer/traineruploadprofilepic/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Response:', response.data);
                if(response.data.success){
                    navigate('/tutor/tutorprofile')
                } // Log response for debugging
                // Handle response here if needed
                console.log('Image uploaded successfully:', response.data);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            console.error('No file selected.');
        }
    };

    return (
        <>
        <TrainerProfilenavbar/>
            <div className="w-full h-screen md:w-9/12 mx-2 ">
                <div className="my-4"></div>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center space-x-6">
                        <div className="shrink-0 mt-10 ps-44">
                            <img
                                id="preview_img"
                                className="h-80 w-80 object-cover rounded-full"
                                src="https://admin.newforceltd.com/assets/img/user.png"
                                alt="Current profile photo"
                            />
                        </div>
                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                            <input
                                type="file"
                                onChange={loadFile}
                                className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
                            />
                        </label>
                    </div>
                    <div className="bg-gray-50 pr-10">
                        <button
                            type="submit"
                            className="bg-blue-500 ms-72 mt-11 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Upload File
                        </button>
                    </div>
                </form>
            </div>
        </>


                    

    );
};

export default TrainerProfilePicture