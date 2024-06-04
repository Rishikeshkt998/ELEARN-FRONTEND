// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import axios from 'axios';
// import { useState } from 'react';
// import { UploadS3Bucket } from '../../../Services/S3bucket';


// function AddLesson({ chapterId, lessonLoad, setLessonLoad }: any) {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [title, setTitle] = useState('');

   
    

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files && event.target.files[0]; // Assuming only one file is selected
//         if (!file) return;

//         try {
//             const { response, url } = await UploadS3Bucket(file);
//             // Handle successful upload
//             console.log("File uploaded successfully:", response);
//             console.log("URL of the uploaded file:", url);
//             setLessonLoad(!lessonLoad);
//             // You can do further processing or update UI with the uploaded file URL
//         } catch (error) {
//             // Handle upload error
//             console.error("Error uploading file:", error);
//             // You can show an error message to the user
//         }
//     };
//     const addLesson = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('title', title);

//             const response = await axios.post('http://localhost:5000/api/course/addlesson', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             console.log('Lesson added successfully:', response.data);
//             toggleModal();
//         } catch (error) {
//             console.error('Error adding lesson:', error);
//         }
//     };

//     const toggleModal = () => {
//         setIsModalOpen(!isModalOpen);
//     };

//     return (
//         <>
//             <div className="pt-6 h-screen px-4 bg-white">
//                 <button
//                     className="block bg-violet-500 text-white mt-6 mr-2 py-2 px-4"
//                     onClick={toggleModal}
//                 >
//                     Add Lesson
//                 </button>

//                 <div
//                     id="crud-modal"
//                     tabIndex={-1}
//                     aria-hidden={!isModalOpen}
//                     className={`overflow-y-auto overflow-x-hidden fixed border-gray- top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${isModalOpen ? '' : 'hidden'}`}
//                 >
//                     <div className="relative w-full max-w-2xl mx-auto">
//                         {/* Your modal content */}
//                         <form className="p-4 md:p-5">
//                             <div className="grid gap-4 mb-4 grid-cols-1">
//                                 <div className="col-span-1">
//                                     <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
//                                     <input
//                                         type="text"
//                                         name="title"
//                                         id="title"
//                                         value={title}
//                                         onChange={(e) => setTitle(e.target.value)}
//                                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                                         placeholder="Type lesson title"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="col-span-1">
//                                     <label htmlFor="videofile" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Video File</label>
//                                     <input
//                                         type="file"
//                                         accept="video/*"
//                                         name="videofile"
//                                         id="videofile"
//                                         onChange={handleFileUpload}
//                                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
//                                         required
//                                     />
//                                 </div>
//                             </div>
//                             <button
//                                 type="button"
//                                 onClick={addLesson}
//                                 className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                             >
//                                 <svg
//                                     className="me-1 -ms-1 w-5 h-5"
//                                     fill="currentColor"
//                                     viewBox="0 0 20 20"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         fillRule="evenodd"
//                                         d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
//                                         clipRule="evenodd"
//                                     ></path>
//                                 </svg>
//                                 Add new lesson
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </>

//     );
// }

// export default AddLesson;