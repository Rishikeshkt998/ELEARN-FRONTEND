import { sheduleClasses } from '@/Api/trainer';
// import axios from 'axios';
import React, { useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';

const SheduleClass: React.FC = () => {
    const [meetingDate, setMeetingDate] = useState('');
    const [meetingTime, setMeetingTime] = useState('');
    const [meetingCode, setMeetingCode] = useState('');
    const [description, setDescription] = useState('');
    // const navigate=useNavigate()
    const { id } = useParams();
    const navigate=useNavigate()

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMeetingDate(event.target.value);
    };

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMeetingTime(event.target.value);
    };

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await sheduleClasses(id, meetingDate, meetingTime, meetingCode, description)
        // axios.post(`http://localhost:5000/api/trainer/shedulelive`, {id,meetingDate,meetingTime,meetingCode,description});
        if (response?.data.success) {
            console.log("data",response)
            navigate('/tutor/sheduleclassview');
        }
    };

    return (
        <div className="max-w-2xl mt-16 mx-auto bg-white p-16">
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label htmlFor="meeting_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Meeting Date</label>
                    <input
                        type="date"
                        id="meeting_date"
                        value={meetingDate}
                        onChange={handleDateChange}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="meeting_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Meeting Time</label>
                    <input
                        type="time"
                        id="meeting_time"
                        value={meetingTime}
                        onChange={handleTimeChange}
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="meeting_code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Meeting Code</label>
                    <input
                        type="text"
                        id="meeting_code"
                        value={meetingCode}
                        onChange={(e) => setMeetingCode(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Meeting Code"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Description"
                        required
                    />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    );
};

export default SheduleClass;