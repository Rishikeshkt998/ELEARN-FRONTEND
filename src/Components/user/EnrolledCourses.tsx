/* eslint-disable @typescript-eslint/no-explicit-any */



import  { useState, useEffect } from 'react';
import { FiDownload } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { EnrolledCoursesView, GetChapters, generateCertificate } from "@/Api/user";

interface Course {
    chapterProgress: any;
    lessons: any;
    completedChapters: any;
    completedLessons: any;
    courseStatus: any;
    courseId: any;
    _id?: string;
    category: string;
    price: number;
    estimatedPrice: number;
    name: string;
    instructor?: string;
    instructorId?: string;
    instructorName?: string;
    description: string;
    level: number;
    tags?: string;
    prerequisite: { title: string }[];
    benefits: { title: string }[];
    demoUrl?: string;
    thumbnail?: string;
    chapters?: string[];
    approved?: boolean;
    listed?: boolean;
    image?: string;
    adminVerified?: boolean;
    publish?: boolean;
    rating?: number;
    noOfPurchase?: number;
    progress: number; // Progress property added
}

const EnrolledCourses = () => {
    const id = localStorage.getItem('userId') as string | null;
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const coursesResponse = await EnrolledCoursesView(id);
                console.log(coursesResponse)
                if (coursesResponse?.data?.EnrolledCourses) {
                    const enrolledCourses = coursesResponse.data.EnrolledCourses.map(async (value: any) => {
                        const courseId = value.courseId._id;
                        const chaptersResponse = await GetChapters(courseId);
                        const chapters = chaptersResponse?.data.Response.flatMap((item: any) => item.chapters);
                        console.log(chapters)
                        const chaptersCount = chapters.length;
                        console.log(chaptersCount)
                        const completedChapters = chapters.filter((chapter: any) => value?.completedChapters?.includes(chapter._id)).length;
                        console.log(completedChapters)
                        const progress = calculateProgress(completedChapters, chaptersCount);
                        return {
                            ...value,
                            progress: progress,
                        };
                    });
                    Promise.all(enrolledCourses).then((coursesWithProgress) => {
                        setCourses(coursesWithProgress);
                    });
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, [id]);

    const downloadCertificate = async (courseId: any) => {
        try {
            await generateCertificate(courseId, id, "blob");
        } catch (error) {
            console.error("Error generating certificate:", error);
        }
    };

    const calculateProgress = (completed: number, total: number) => {
        return total > 0 ? Math.round((completed / total) * 100) : 0;
    };

    return (
        <div className="max-w-screen-xl h-full m-3 mx-auto p-5 sm:p-10 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-16 rounded-lg">
                {courses && courses.map(course => (
                    <div className="rounded bg-white overflow-hidden shadow-lg w-72 h-96 flex flex-col" key={course.courseId?._id}>
                        <div className="relative h-48">
                            <Link to={`/coursedetails/${course?.courseId?._id}`} key={course?.courseId?._id}>
                                <img className="w-full h-full object-cover" src={course?.courseId?.thumbnail} alt="Course thumbnail" />
                                <div className="hover:bg-transparent transition duration-300 flex absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-0"></div>
                            </Link>
                        </div>
                        <div className="px-6 py-4 flex-1 flex flex-col">
                            <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out whitespace-nowrap overflow-hidden text-ellipsis">{course.courseId?.name}</a>
                            <p className="text-gray-500 text-sm">{course?.courseId?.category}</p>
                            <div className="flex-1 flex flex-col justify-end">
                                <div className="w-full px-3 mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-xs font-semibold inline-block text-indigo-600">{course.progress}%</span>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                                        <div style={{ width: `${course.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{course.courseId?.estimatedPrice}</span>
                                    {course?.courseStatus && (
                                        <div className="flex flex-col items-center">
                                            <button
                                                onClick={() => downloadCertificate(course.courseId?._id)}
                                                className="bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
                                            >
                                                <FiDownload className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnrolledCourses;

