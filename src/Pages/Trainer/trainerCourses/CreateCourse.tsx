/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { UploadS3Bucket } from "../../../Services/S3bucket";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TrainerCourseAdd } from "@/Api/trainer";
import axios from "axios";

// import { Skeleton } from "@/components/ui/skeleton"
// import Skeleton from "@/Components/common/skeleton";

const CreateCourse: React.FC = () => {
    const [active, setActive] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        level: "",
        thumbnail: "",
        category:"",
        demoUrl:"",
    });
    const navigate=useNavigate()
    const [benefits, setBenefits] = useState<{ title: string }[]>([{ title: "" }]);
    const [prerequisite, setPrerequisite] = useState<{ title: string }[]>([{ title: "" }]);
    const [courseContentData, setCourseContentData] = useState([
        {
        //    videoUrl: "",
            title: "",
            description:"",
            videoSection:"United Section",
            lessons: [
                {
                    title: "",
                    url: ""
                }
            ],
            suggestion:"",
        }
    ]);
    console.log(courseContentData)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [courseData, setCourseData] = useState<Record<string, any>>({});

    const handleSubmit=async ()=>{
        setLoading(false);
        
        const formattedBenefits=benefits.map((benefit)=>({title:benefit.title}))
        const formattedPrerequisites = prerequisite.map((prerequisite) => ({ title: prerequisite.title }))
        
        const formattedCourseContentData=courseContentData.map((courseContent)=>({
            // videoUrl:courseContent.videoUrl,
            title:courseContent.title,
            decription:courseContent.description,
            videoSection:courseContent.videoSection,
            lessons:courseContent.lessons.map((lesson)=>({
                title:lesson.title,
                url:lesson.url

            })),
            suggestion:courseContent.suggestion
        }))
        const data={
            name:courseInfo.name,
            description:courseInfo.description,
            price:courseInfo.price,
            estimatedPrice:courseInfo.estimatedPrice,
            tags:courseInfo.tags,
            thumbnail:courseInfo.thumbnail,
            level:courseInfo.level,
            demoUrl: courseInfo.demoUrl.toString(),
            category:courseInfo.category,
            benefits:formattedBenefits,
            prerequisite:formattedPrerequisites,
            courseContentData:formattedCourseContentData

        }
        setCourseData(data)
        setLoading(false);

    }
    console.log(courseData)
   

    const handleCourseCreate = async () => {
        setLoading(true);
        try {
            let uploadedDemoUrl = '';
            try {
                if (courseInfo.demoUrl) {
                    const uploadedDemo = await UploadS3Bucket(courseInfo.demoUrl);
                    uploadedDemoUrl = uploadedDemo.url;
                    console.log("Uploaded demoUrl:", uploadedDemoUrl);
                } else {
                    console.error('Error: demoUrl is empty');
                }
            } catch (error) {
                console.error('Error uploading demoUrl to S3:', error);
            }
            const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
            const formattedPrerequisites = prerequisite.map((prerequisite) => ({ title: prerequisite.title }));
            
            // Use Promise.all to wait for all promises to resolve
            const trainerId = localStorage.getItem('trainerId');
            const formattedCourseContentData = await Promise.all(courseContentData.map(async (courseContent) => {
                try {
                    const updatedLinks = await Promise.all(courseContent.lessons.map(async (lesson) => {
                        try {
                            if (lesson.url) {
                                // Upload link URL to S3 and get the generated URL
                                const uploadedLink = await UploadS3Bucket(lesson.url);
                                console.log(uploadedLink.url)
                                return { title: lesson.title, url: uploadedLink.url };
                            } else {
                                console.error('Error: link.url is empty');
                                return { title: lesson.title, url: 'error' };
                            }
                        } catch (error) {
                            console.error('Error uploading link to S3:', error);
                            return { title: lesson.title, url: 'error' };
                        }
                    }));
                    return {
                        ...courseContent,
                        lessons:updatedLinks,
                    };
                } catch (error) {
                    console.error('Error processing course content:', error);
                    return null;
                }
            }));
            const data = {
                name: courseInfo.name,
                description: courseInfo.description,
                price: courseInfo.price,
                estimatedPrice: courseInfo.estimatedPrice,
                tags: courseInfo.tags,
                thumbnail: courseInfo.thumbnail,
                level: courseInfo.level,
                demoUrl: uploadedDemoUrl,
                category: courseInfo.category,
                benefits: formattedBenefits,
                prerequisite: formattedPrerequisites,
                courseContentData: formattedCourseContentData,
                instructorId:trainerId
            };
            console.log("mydata"+data)

            
            const response = await TrainerCourseAdd(data, {
                'Content-Type': 'application/json',
            })
            // const response =await axios.post('http://localhost:5000/api/course/addcourse', data, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });

            console.log('Success:', response?.data);
            if(response?.data.success){
                setLoading(false);
                navigate("/tutor/courseview")
            }else{
                toast('course data not added')
            }

        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex min-h-screen bg-gray-900 text-white">
            <div className="w-[80%]">
                {active === 0 && <CourseInformation courseInfo={courseInfo} setCourseInfo={setCourseInfo} loading={loading} setLoading={setLoading} active={active} setActive={setActive} />}
                {active === 1 && <CourseData benefits={benefits} setBenefits={setBenefits} prerequisite={prerequisite} setPrerequisite={setPrerequisite} active={active} setActive={setActive} />}
                {active === 2 && <CourseContent courseContentData={courseContentData} setCourseContentData={setCourseContentData} handleSubmit={handleSubmit} active={active} setActive={setActive} />}
                {active === 3 && <CoursePreview courseData={courseData} handleCourseCreate={handleCourseCreate} active={active} setActive={setActive} />}
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed z[10] top-18 right-0">
                <CourseOptions active={active} setActive={setActive} />
            </div>
            {loading && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>
                        
                </div>
            )}
        </div>
    );
};

export default CreateCourse;