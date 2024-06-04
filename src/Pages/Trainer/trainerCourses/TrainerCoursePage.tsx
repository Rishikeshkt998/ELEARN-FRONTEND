


import  { useState, useEffect } from 'react';
import axios from 'axios';
interface Course {
    _id?: string;
    category: string;
    price: number;
    courseName: string;
    instructor?: string;
    instructorId?: string;
    instructorName?: string;
    description: string;
    tags?: string;
    thumbnail?: string;
    chapters?: string[],
    approved?: boolean,
    listed?: boolean,
    image?: string
    adminVerified?: boolean,
    publish?: boolean
    rating?: number;
    noOfPurchase?: number

}


const TrainerCoursePage = () => {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/course/course');
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    return (
        <div className="p-12">
            <section className="pb-10 lg:pb-20 bg-[#F3F4F6]">
                <div className="container">
                    <div className="flex flex-wrap -mx-4">
                        {courses.map((course, index) => (
                            <div key={index} className="w-full md:w-1/2 xl:w-1/3 px-4">
                                <div className="bg-white rounded-lg overflow-hidden mb-10">
                                    <img
                                        src={course.image}
                                        alt="image"
                                        className="w-full"
                                    />
                                    <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                                        <h3>
                                            <a
                                                href="javascript:void(0)"
                                                className="font-semibold text-dark text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] mb-4 block hover:text-primary"
                                            >
                                                {course.courseName}
                                            </a>
                                        </h3>
                                        <p className="text-base text-body-color leading-relaxed mb-7">
                                            {course.description}
                                        </p>
                                        <a
                                            href="javascript:void(0)"
                                            className="inline-block py-2 px-7 border border-[#E5E7EB] rounded-full text-base text-body-color font-medium hover:border-primary hover:bg-primary hover:text-white transition"
                                        >
                                            View Details
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TrainerCoursePage;


