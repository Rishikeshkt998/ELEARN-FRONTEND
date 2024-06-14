/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetChapters } from "@/Api/user";
import { FC, useEffect, useState } from "react";
import {  FaChevronDown, FaChevronUp } from "react-icons/fa";

interface Lesson {
    _id?: string;
    title: string;
    url: string;
    createdAt?: Date;
}

// interface Chapter {
//     chapters: Array<{
//         title: string;
//         description: string;
//         lessons: Lesson[];
//         order: number;
//         createdAt?: Date;
//         updatedAt?: Date;
//     }>;
// }

type Props = {
    id: any;
    
};

const CourseContentListforUser: FC<Props> = ({id}) => {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set<string>());
    const [chapters,setChapters]=useState([])

    const toggleSection = (section: string) => {
        const newVisibleSections = new Set(visibleSections);
        if (newVisibleSections.has(section)) {
            newVisibleSections.delete(section);
        } else {
            newVisibleSections.add(section);
        }
        setVisibleSections(newVisibleSections);
    };

    const handleLessonClick = async (url: string, lessonId: string | undefined) => {
        try {
            console.log("url", url, lessonId)

        } catch (error) {
            console.error('Error setting video URL or lesson ID:', error);
        }
    };
    useEffect(() => {
        const fetchChapterDetails = async () => {
            try {
                console.log("chaptersss",id)
                const response = await GetChapters(id)
                // axios.get(`http://localhost:5000/api/course/getchapters/${id}`);
                const chapterDetails = response?.data.Response;
                console.log(chapterDetails)
                for (const chapters of chapterDetails) {
                    console.log(chapters.chapters)
                    setChapters(chapters.chapters);
                }
            } catch (error) {
                console.error('Error fetching chapter details:', error);
            }
        };

        fetchChapterDetails();
    }, [id]);

    return (
        <div className={`rounded-md  w-full ${'sticky top-24 left-0 '}`}>
            {chapters.map((chapter: any, index: any) => (
                <div className={`${'border-b border-[#ffffff8e] p-2'}`} key={index}>
                    <div className="w-full flex justify-between  items-center">
                        <h2 className="text-[18px]   p-4 text-black dark:text-white">{chapter?.title}</h2>
                        <button className="mr-4 cursor-pointer text-black " onClick={() => toggleSection(chapter?.title)}>
                            {visibleSections.has(chapter?.title) ? <FaChevronUp />:<FaChevronDown /> }

                        </button>
                    </div >
                    {visibleSections.has(chapter?.title) && (

                        <>
                            <h5 className="text-black ms-5 text-[14px]">{chapter.lessons.length} lessons</h5>
                            <div className="m-3">
                                <ul className="m-2">
                                    {chapter?.lessons.map((lesson: Lesson) => (
                                        <li className="flex items-center justify-between rounded-md mb-2  " key={lesson?._id} onClick={() => handleLessonClick(lesson?.url, lesson?._id)}>
                                            <span>{lesson?.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CourseContentListforUser;
