/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC,  useState } from "react";
import { FaCheck } from "react-icons/fa";

interface Lesson {
  _id?: string;
  title: string;
  url: string;
  createdAt?: Date;
}

interface Chapter {
  chapters: Array<{
    title: string;
    description: string;
    lessons: Lesson[];
    order: number;
    createdAt?: Date;
    updatedAt?: Date;
  }>;
}

type Props = {
  id: any;
  chapters:Chapter[];
  setChapters: (chapters: Chapter[])=>void
  videoUrl:any,
  setVideoUrl: (videoUrl: any)=>void
  lessonId:any,
  setLessonId: (lessonId: any)=>void
  lessonCompleted: any
  setLessonCompleted: (lessonCompleted: any) => void
  ChapterCompleted: any
  setChapterCompleted: (ChapterCompleted: any) => void
};

const CourseContentList: FC<Props> = ({ chapters, setVideoUrl,setLessonId,lessonCompleted ,ChapterCompleted}) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set<string>());

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSections(newVisibleSections);
  };

  const handleLessonClick =async (url: string,lessonId:string|undefined) => {
    try {
      console.log("url",url ,lessonId)
      await Promise.all([setVideoUrl(url), setLessonId(lessonId)]);
      
    } catch (error) {
      console.error('Error setting video URL or lesson ID:', error);
    }
  };

  return (
    <div className={`rounded-md bg-blue-50 w-full ${'sticky top-24 left-0 '}`}>
      {chapters.map((chapter: any, index: any) => (
        <div className={`${'border-b border-[#ffffff8e] p-2'}`} key={index}>
          <div className="w-full flex justify-between  items-center">
            <h2 className="text-[18px]  ms-4  p-4 text-black dark:text-white">{chapter.title}</h2>
            <button className="mr-4 cursor-pointer text-blue-50 " onClick={() => toggleSection(chapter.title)}>
              {visibleSections.has(chapter?.title) ? <FaCheck /> : <FaCheck /> }
              {ChapterCompleted.includes(chapter._id) && <FaCheck className="text-black"/>}
              
            </button>
          </div >
          {visibleSections.has(chapter?.title) && (
            
            <>
              <h5 className="text-black ms-9 text-[14px]">{chapter.lessons.length} lessons</h5>
              <div className="m-3">
                <ul className="m-2">
                  {chapter.lessons.map((lesson: Lesson, index: any) => (
                    <li className="flex items-center justify-between bg-slate-500 rounded-md mb-2 p-3 " key={lesson._id} onClick={() => handleLessonClick(lesson.url, lesson._id)}>
                      <span>{lesson.title}</span>
                      {lessonCompleted.includes(lesson._id) && <FaCheck />}
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

export default CourseContentList;
