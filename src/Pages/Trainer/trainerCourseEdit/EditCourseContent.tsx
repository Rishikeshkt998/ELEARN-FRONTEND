/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { UploadS3Bucket } from "../../../Services/S3bucket";

type Props = {
    active: number;
    setActive: (active: number) => void;
    courseContentData: any[];
    setCourseContentData: (courseContentData: any) => void;
    handleSubmit: any;
    olderData: any;
    setOlderData: (olderdata: any) => void
    newData: any;
    setnewData: (newData: any) => void
};


const EditCourseContent: React.FC<Props> = ({
    active,
    setActive,
    courseContentData,
    setCourseContentData,
    handleSubmit: handleCourseSubmit,

}) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean[]>(
        Array(courseContentData.length).fill(false)
    );

    const [activeSection, setActiveSection] = useState(1);

    const [error, setError] = useState("");
    const handleCollapseToggle = (index: number) => {
        const updatedCollapsed = [...isCollapsed];
        updatedCollapsed[index] = !updatedCollapsed[index];
        setIsCollapsed(updatedCollapsed);
    };

    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].lessons.splice(linkIndex, 1);
        setCourseContentData(updatedData);
    };

    const handleAddlink = (index: number) => {
        const updatedData = [...courseContentData];
        updatedData[index].lessons.push({ title: "", url: "" });
        setCourseContentData(updatedData);
    };

    const newContentHandler = (item: any) => {
        setError("");
        if (
            !item.title ||
            !item.description ||
            !item.lessons[0].title ||
            !item.lessons[0].url
        ) {
            setError("Please fill all the fields");
            toast.error("Please fill all the fields");
        } else {
            let newVideoSection = "";

            if (courseContentData.length > 0) {
                const lastVideoSection =
                    courseContentData[courseContentData.length - 1].videoSection;

                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }
            const newContent = {
                title: "",
                description: "",
                videoSection: newVideoSection,
                lessons: [{ title: "", url: "" }],
            };

            setCourseContentData([...courseContentData, newContent]);
        }
    };

    const addNewSection = () => {
        setError("");
        const { title, description, lessons } =
            courseContentData[courseContentData.length - 1];
        if (
            !title ||
            !description ||
            !lessons[0].title ||
            !lessons[0].url
        ) {
            setError("Please fill all the fields");
            toast.error("Please fill all the fields");
        } else {
            setActiveSection(activeSection + 1);
            const newContent = {
                title: "",
                description: "",
                videoSection: `Untitled Section ${activeSection}`,
                lessons: [{ title: "", url: "" }],
            };
            setCourseContentData([...courseContentData, newContent]);
        }
    };

    const prevButton = () => {
        setActive(active - 1);
    };
    

    const handleOptions = (e: any) => {
        e.preventDefault();
        if (
            courseContentData[courseContentData.length - 1].title === "" ||
            courseContentData[courseContentData.length - 1].description === "" ||
            courseContentData[courseContentData.length - 1].lessons[0].title === "" ||
            courseContentData[courseContentData.length - 1].lessons[0].url === ""
        ) {
            setError("Section can't be empty!");
        }
       
        else {
            setActive(active + 1);
            handleCourseSubmit();
        }
    };
    const handleChangeFile = async (file: File, index: number, lessonIndex: number) => {
        try {
            if (!file.type.startsWith("video/")) {
                toast.error("Please select a video file");
                return;
            }

            const uploadedUrl = await UploadS3Bucket(file);
            const updatedData = [...courseContentData];
            console.log(updatedData)
            updatedData[index].lessons[lessonIndex].url = uploadedUrl.url;
            setCourseContentData(updatedData);

        } catch (error) {
            console.error("Error uploading file to S3:", error);
        }
    };
    

    return (
        <div className="w-[80%] m-auto mt-5 p-3 mb-20">
            {error && (
                <div className="font-bold text-red-500">
                    <h1>{error}</h1>
                </div>
            )}
            <form onSubmit={handleOptions}>
                {courseContentData?.map((item: any, index: number) => (
                    <div key={index}>
                        <div
                            className={` w-full  bg-gray-800 p-4 ${index === 0 ? "mt-10" : "mb-0"
                                }`}
                        >
                            <div className="flex w-full items-center">
                                <input
                                    type="text"
                                    className={`text-[20px] text-gray-400 ${item.videoSection === "Untitled Section"
                                        ? "w-[170px]"
                                        : "w-min"
                                        } font-Poppins cursor-ponter bg-transparent outline-none `}
                                    value={item.videoSection}
                                    onChange={(e) => {
                                        const updatedData = [...courseContentData];
                                        updatedData[index].videoSection = e.target.value;
                                        setCourseContentData(updatedData);
                                    }}
                                />
                                <BsPencil className="cursor-pointer dark:text-white text-gray-400" />
                            </div>
                            <br />
                            <div className="flex w-full items-center justify-between my-0">
                                {isCollapsed[index] ? (
                                    <p className="font-Poppins dark:text-white text-black">
                                        {index + 1}.{item.title}
                                    </p>
                                ) : (
                                    <div></div>
                                )}
                                {/* Arrow button for collapsed video content */}
                                <div className="flex items-center">
                                    <AiOutlineDelete
                                        className={`dark:text-white text-[20px] mr-2 text-gray-400 ${index > 0 ? "cursor-pointer" : "cursor-no-drop"
                                            }`}
                                        onClick={() => {
                                            if (index > 0) {
                                                const updatedData = [...courseContentData];
                                                updatedData.splice(index, 1);
                                                setCourseContentData(updatedData);
                                            }
                                        }}
                                    />
                                    <MdOutlineKeyboardArrowDown
                                        fontSize="large"
                                        className="dark:text-white text-black"
                                        style={{
                                            transform: isCollapsed[index]
                                                ? "rotate(180deg)"
                                                : "rotate(0deg",
                                        }}
                                        onClick={() => handleCollapseToggle(index)}
                                    />
                                </div>
                            </div>
                            {!isCollapsed[index] && (
                                <>
                                    <div className="my-3 flex flex-col">
                                        <label htmlFor="" className="text-gray-400 font-bold">
                                            Chapter title
                                        </label>
                                        <input
                                            type="text"
                                            className="border border-gray-400 rounded-md bg-transparent p-2"
                                            placeholder="Project Plan..."
                                            value={item.title}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index].title = e.target.value;
                                                setCourseContentData(updatedData);
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="mb-3 flex flex-col">
                                        <label htmlFor="" className="text-gray-400 font-bold">
                                            chapter Description
                                        </label>
                                        <textarea
                                            rows={8}
                                            cols={30}
                                            className="border border-gray-400 rounded-md bg-transparent p-2"
                                            placeholder="Video Url..."
                                            value={item.description}
                                            onChange={(e) => {
                                                const updatedData = [...courseContentData];
                                                updatedData[index].description = e.target.value;
                                                setCourseContentData(updatedData);
                                            }}
                                        />
                                        <br />
                                    </div>
                                    {item?.lessons.map((lessons:any,lessonIndex: number) => (
                                        <div key={lessonIndex} className="mb-3 block">
                                            <h1 className="hidden">{lessons.title}</h1>
                                            <div className="w-full flex items-center justify-between mb-2">
                                                <label htmlFor="" className="text-gray-400 font-bold">
                                                    Lessons {lessonIndex + 1}
                                                </label>
                                                <AiOutlineDelete
                                                    className={`${lessonIndex === 0
                                                        ? "cursor-no-drop"
                                                        : "cursor-pointer"
                                                        } text-black dark:text-white text-[20px]`}
                                                    onClick={() =>
                                                        lessonIndex === 0
                                                            ? null
                                                            : handleRemoveLink(index, lessonIndex)
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <input
                                                    type="text"
                                                    className="border border-gray-400 rounded-md bg-transparent p-2"
                                                    placeholder="Lesson title"
                                                    value={courseContentData[index]?.lessons[lessonIndex]?.title}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].lessons[lessonIndex].title =
                                                            e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}
                                                />
                                                <div className="sm:w-96">
                                                    {courseContentData[index]?.lessons[lessonIndex]?.url && (
                                                        <ReactPlayer width={557} url={courseContentData[index].lessons[lessonIndex].url} controls />
                                                    )}

                                                </div>
                                               
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    className="border border-gray-400 rounded-md bg-transparent p-2"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            handleChangeFile(file, index, lessonIndex);
                                                        }
                                                    }}
                                                />
                                                
                                        
                                                
                                            </div>
                                        </div>
                                    ))}
                                    <br /> 
                                    <div className="inline-block mb-4">
                                        <p
                                            className="flex items-center text-[18px] dark:text-white text-gray-400 cursor-pointer"
                                            onClick={() => handleAddlink(index)}
                                        >
                                            <BsLink45Deg className="mr-2 text-gray-400" /> Add Lesson
                                        </p>
                                    </div>
                                </>
                            )}
                            <br />
                            {index === courseContentData.length - 1 && (
                                <div>
                                    <p
                                        className="flex items-center text-[18px] dark:text-white text-gray-400 cursor-pointer"
                                        onClick={() => newContentHandler(item)}
                                    >
                                        <AiOutlinePlusCircle className="mr-2 text-gray-400" /> Add Chapter
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                <br />
                <div
                    className="flex items-center text-[20px] dark:text-whote text-gray-400 cursor-pointer"
                    onClick={() => addNewSection()}
                >
                    <AiOutlinePlusCircle className="mr-2 text-gray-400" /> Add new Section
                </div>
                <br />
                <div className="w-full flex items-center justify-between">
                    <div
                        className="w-56 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                        onClick={() => prevButton()}
                    >
                        Prev
                    </div>
                    <div className="w-56 flex items-center justify-end">
                        <input
                            type="submit"
                            value="Next"
                            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                        />
                        <br />
                        <br />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditCourseContent;