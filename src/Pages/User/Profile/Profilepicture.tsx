

import React, { ChangeEvent, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { profileImages } from '@/Api/user';



const Profilepicture: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()


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
                URL.revokeObjectURL(output.src); // free memory
            };
            setSelectedFile(file); // Save the selected file in state
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior
        setLoading(true)
        console.log('Handle submit called');
        if (selectedFile) {
            const formData = new FormData();
            formData.append('image', selectedFile);
            console.log('FormData:', formData); // Log formData for debugging
            try {
                const id = localStorage.getItem('userId');
                if (!id) {
                    console.error('User ID not found in localStorage.');
                    return;
                }
                const response = await profileImages(id, formData, {
                    'Content-Type': 'multipart/form-data',
                })
                // axios.put(`http://localhost:5000/api/user/uploadprofilepic/${id}`, formData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // });
                console.log('Response:', response?.data);
                console.log('Image uploaded successfully:', response?.data);
                if (response) {
                    setLoading(false)
                    navigate('/profile')
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                setLoading(false)
            }
        } else {
            console.error('No file selected.');
        }
    };

    return (


        <div className="mx-auto w-full max-w-[550px]">
            <form onSubmit={handleSubmit}>
                <div className="flex ps-4 space-x-6">
                    <div className="shrink-0 ">
                        <img
                            id="preview_img"
                            className="h-96 w-96 object-cover rounded-full"
                            src="https://admin.newforceltd.com/assets/img/user.png"

                            alt="Current profile photo"
                        />
                    </div>
                    <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                            type="file"
                            onChange={loadFile}
                            className="block  text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
                        />
                    </label>
                </div>
                <div className="bg-gray-900 text-center pt-20 pr-5">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Upload photo
                    </button>
                </div>
            </form>
            {loading && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">

                    
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>

                </div>
            )}
        </div>


    );
};

export default Profilepicture