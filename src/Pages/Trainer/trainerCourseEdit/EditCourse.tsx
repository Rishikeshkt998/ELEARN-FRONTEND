/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import EditCourseInformation from "./EditCourseInformation";
import EditCourseData from "./EditCourseData";
import EditCourseContent from "./EditCourseContent";
import EditCoursePreview from "./EditCoursePreview";
// import axios from "axios";
// import { UploadS3Bucket } from "../../../Services/S3bucket";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EditCourseOption from "./EditCourseOption";
import { useParams } from "react-router-dom";
import { DeleteFileFromS3Bucket } from "../../../Services/S3delete";
import { GetChapters, GetCourse,  TrainerCourseEdit } from "@/Api/trainer";


const EditCourse: React.FC = () => {
    const { courseId } = useParams();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [active, setActive] = useState<number>(0);
    const [olderData, setOlderData] = useState([]);
    const [newData, setnewData] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        thumbnail: "",
        category: "",
        demoUrl: "",
    });
    const navigate = useNavigate()
    const [benefits, setBenefits] = useState<{ title: string }[]>([{ title: "" }]);
    const [prerequisite, setPrerequisite] = useState<{ title: string }[]>([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState([
        {
            //    videoUrl: "",
            title: "",
            description: "",
            videoSection: "United Section",
            lessons: [
                {
                    title: "",
                    url: ""
                }
            ],
            suggestion: "",
        }
    ]);
    console.log(courseContentData)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [courseData, setCourseData] = useState<Record<string, any>>({});
    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                console.log("courseId",courseId)
                const response = await GetCourse(courseId)
                const courseDetails = response?.data.Response;
                console.log(courseDetails)

                setCourseInfo({
                    name: courseDetails.name,
                    description: courseDetails.description,
                    price: courseDetails.price,
                    estimatedPrice: courseDetails.estimatedPrice,
                    tags: courseDetails.tags,
                    level: courseDetails.level,
                    thumbnail: courseDetails.thumbnail,
                    category: courseDetails.category,
                    demoUrl: courseDetails.demoUrl,
                });
                setBenefits(courseDetails.benefits);
                setPrerequisite(courseDetails.prerequisite);
                // setCourseContentData(courseDetails.chapter);
            } catch (error) {
                console.error('Error fetching course details:', error);
                toast.error('Error fetching course details');
            }
        };

        fetchCourseDetails();
    }, [courseId]);
    useEffect(() => {
        const fetchChapterDetails = async () => {
            try {
                console.log(courseId)
                console.log("courseId for chapters",courseId)
                const response = await GetChapters(courseId)
                console.log(response?.data.Response)
                const chapterDetails = response?.data.Response;
                console.log("chapter",chapterDetails?.chapters)
                for (const chapters of response&&response.data.Response){
                    console.log("chapter value",chapters)
                    setCourseContentData(chapters.chapters);
                    console.log("courseContentData",courseContentData)
                    for (const lesson of chapters.chapters) {
                         for (const url of lesson.lessons) {
                             setOlderData(url.url)
                             console.log(olderData)
                        }
                    }
                    console.log("hi",newData)

                    
                    

                }
                
               
    
            } catch (error) {
                console.error('Error fetching chapter details:', error);
                toast.error('Error fetching chapter details');
            }
        };

        fetchChapterDetails();
    }, [courseId]);
    const handleSubmit = async () => {

        const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }))
        const formattedPrerequisites = prerequisite.map((prerequisite) => ({ title: prerequisite.title }))

        const formattedCourseContentData = courseContentData.map((courseContent) => ({
            title: courseContent.title,
            decription: courseContent.description,
            videoSection: courseContent.videoSection,
            lessons: courseContent.lessons.map((lesson) => ({
                title: lesson.title,
                url: lesson.url

            })),
            suggestion: courseContent.suggestion
        }))
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl.toString(),
            category: courseInfo.category,
            benefits: formattedBenefits,
            prerequisite: formattedPrerequisites,
            courseContentData: formattedCourseContentData

        }
        setCourseData(data)

    }
    console.log(courseData)
    const handleCourseCreate = async () => {
        setLoading(true)
        try {
            
            const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
            const formattedPrerequisites = prerequisite.map((prerequisite) => ({ title: prerequisite.title }));

            const formattedCourseContentData = courseContentData.map((courseContent) => ({
                title: courseContent.title,
                description: courseContent.description,
                videoSection: courseContent.videoSection,
                lessons: courseContent.lessons.map((lesson) => ({
                    title: lesson.title,
                    url: lesson.url
                })),
                suggestion: courseContent.suggestion
            }));

            const data = {
                name: courseInfo.name,
                description: courseInfo.description,
                price: courseInfo.price,
                estimatedPrice: courseInfo.estimatedPrice,
                tags: courseInfo.tags,
                thumbnail: courseInfo.thumbnail,
                level: courseInfo.level,
                demoUrl: courseInfo.demoUrl,
                category: courseInfo.category,
                benefits: formattedBenefits,
                prerequisite: formattedPrerequisites,
                courseContentData: formattedCourseContentData
            };
            console.log("hi",newData)
            if(!formSubmitted){
                for (const item of newData) {
                    DeleteFileFromS3Bucket(item)
                    console.log("deleted")
                }
            }

            const response = await TrainerCourseEdit(data, courseId, {
                'Content-Type': 'application/json',
            })
            

            console.log('Success:', response?.data);
            if (response?.data.success) {
                setLoading(false)
                setFormSubmitted(true)
                navigate("/tutor/courseview")
            } else {
                toast('course data not added')
                setLoading(false)
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };



    return (
        <div className="w-full flex min-h-screen bg-gray-900 text-white">
            <div className="w-[80%]">
                {active === 0 && <EditCourseInformation courseInfo={courseInfo} setCourseInfo={setCourseInfo} loading={loading} setLoading={setLoading} active={active} setActive={setActive} />}
                {active === 1 && <EditCourseData benefits={benefits} setBenefits={setBenefits} prerequisite={prerequisite} setPrerequisite={setPrerequisite} active={active} setActive={setActive} />}
                {active === 2 && <EditCourseContent courseContentData={courseContentData} setCourseContentData={setCourseContentData} olderData={olderData} setOlderData={setOlderData} newData={newData} setnewData={setnewData} handleSubmit={handleSubmit} active={active} setActive={setActive} />}
                {active === 3 && <EditCoursePreview courseData={courseData} handleCourseCreate={handleCourseCreate} active={active} setActive={setActive} />}
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z[10] top-18 right-0">
                <EditCourseOption active={active} setActive={setActive} />
            </div>
            {loading && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-90 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>

                </div>
            )}
        </div>
    );
};

export default EditCourse


