
import CourseContentMedia from "./CourseContentMedia"
import NavBar from "../common/UserCommon/Navbar"
import Footer from "../common/UserCommon/Footer"
import { useEffect, useState } from "react"
import CourseContentList from "@/Pages/User/coursedetailspage/CourseContentList"
import { GetChapters, GetCourse } from "@/Api/user"

type Props={
    id:string|undefined
}
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
interface prerequisite {
  title: string;

}
interface benefits {
  title: string;

}
interface Course {
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
  prerequisite: prerequisite[];
  benefits: benefits[]
  demoUrl?: string,
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
const CourseContent = ({id}:Props) => {
  const [courseDetails, setCourseDetails] = useState<Course | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [activeVideo,setActiveVideo]=useState(0)
  const [lessonId, setLessonId] = useState("")
  const [lessonCompleted, setLessonCompleted] = useState([])
  const [ChapterCompleted, setChapterCompleted] = useState("")
  const [questions, setQuestions] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await GetCourse(id)
        console.log("course",response?.data.Response)
        if (response) {
          setCourseDetails(response.data.Response);
          setQuestions(response.data.Response.questions)
        } else {
          console.error('Failed to fetch course details');
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();



  }, [id]);
  

  useEffect(() => {
    const fetchChapterDetails = async () => {
      try {
        console.log(id)
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
    <>
    <NavBar/>
      <div className="grid sm:grid-cols-12 bg-gray-200  grid-col-1 gap-4   ">
        <div className="min-h-[100px] mt-4 rounded-lg  bg-gray-200 shade sm:col-span-8">
          <CourseContentMedia CourseDetails={courseDetails} setCourseDetails={setCourseDetails} setQuestions={setQuestions} id={id} questions={questions} lessonId={lessonId} lessonCompleted={lessonCompleted} setLessonCompleted={setLessonCompleted} setLessonId={setLessonId} chapters={chapters} videoUrl={videoUrl} setVideoUrl={setVideoUrl} setChapters={setChapters} activeVideo={activeVideo} setActiveVideo={setActiveVideo} ChapterCompleted={ChapterCompleted} setChapterCompleted={setChapterCompleted}/>
        </div>
        <div className="min-h-[100px] rounded-lg m-3 bg-gray-200 sm:col-span-4">
          <CourseContentList id={id} lessonId={lessonId} setLessonId={setLessonId} chapters={chapters} setChapters={setChapters} videoUrl={videoUrl} setVideoUrl={setVideoUrl} lessonCompleted={lessonCompleted} setLessonCompleted={setLessonCompleted} ChapterCompleted={ChapterCompleted} setChapterCompleted={setChapterCompleted} />
        </div>


    </div>
    <Footer darkMode={false}/>
    </>
  )
}

export default CourseContent
