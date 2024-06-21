/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC, useEffect, useState } from "react"
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from "react-icons/ai"
import ReactPlayer from "react-player"
import { toast } from "react-toastify"
import ConfettiExplosion from "react-confetti-explosion";
import StarRating from "./StarRating"
import { format } from "timeago.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSmile } from "@fortawesome/free-solid-svg-icons"
import {  ChaptersCompletedTime, EditReviewSubmit, GetChapterView, GetChapters, GetCourse, GetLessonsView, PostompletedChapter, PostompletedLesson, QuestionAnswer, ReviewSubmit, fetchEnrolled } from "@/Api/user"
import { BsPencil } from "react-icons/bs"
import StarRatings from "./StarRatings"
import TextArea from "./TextArea"

type Props = {
    CourseDetails: any,
    setCourseDetails: (CourseDetails: any) => any,
    chapters: any,
    setChapters: (chapters: any) => void,
    id: string | undefined,
    activeVideo: number,
    setActiveVideo: (activeVideo: number) => void
    videoUrl: any,
    setVideoUrl: (videoUrl: any) => void
    lessonId: any,
    setLessonId: (lessonId: any) => void
    lessonCompleted: any
    setLessonCompleted: (lessonCompleted: any) => void
    ChapterCompleted: any
    setChapterCompleted: (ChapterCompleted: any) => void,
    questions: any,
    setQuestions: (questions: any) => void



}

interface Question {
    _id?: string
    question: string,
    options: string[];
    correctOption: number;
    courseId: string

}

const CourseContentMedia: FC<Props> = ({ CourseDetails, setCourseDetails, questions, setQuestions, id, chapters, activeVideo, setActiveVideo, setVideoUrl, videoUrl, setLessonId, lessonId, setLessonCompleted, setChapterCompleted, lessonCompleted, ChapterCompleted }) => {
    const [activeBar, setActiveBar] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const usersId = localStorage.getItem('userId');
    const [activeLessonIndex, setActiveLessonIndex] = useState(0);
    const [reviews, setReviews] = useState("")
    const [editReviews, setEditReviews] = useState("")
    const [rating, setRating] = useState(1)
    const [editRating, setEditRating] = useState(1)
    const [currentSlide, setCurrentSlide] = useState(0);
    const [answer, setAnswer] = useState<string>();
    const [questionId, setQuestionId] = useState<string>();
    const [correct, setCorrect] = useState<boolean>(false);
    const [completedQuestion, setCompletedQuestion] = useState<string[]>();
    const [wrongcompletedQuestion, setwrongCompletedQuestion] = useState<string[]>();
    const [expandedReviewIndex, setExpandedReviewIndex] = useState<number | null>(null);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleEditReviewSubmit = async () => {
        try {
            const reviewResponse = await EditReviewSubmit(editReviews, editRating, id, usersId)
            console.log("response", reviewResponse)
            toast.success("review edited successfully")
            RefetchCourseDetails();
            setEditReviews("")
            setEditRating(1)
            setIsModalOpen(false)


        } catch (error) {
            console.log(error)
        }

    }

    const toggleReplies = (index: number) => {
        setExpandedReviewIndex(expandedIndex => (expandedIndex === index ? null : index));
    };
    const selectAnswer = (answer: string, questionId: string) => {
        setAnswer(answer);
        setQuestionId(questionId);
    };
    const submitAnswer = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await QuestionAnswer(questionId, answer, id, usersId)
        console.log("questionanswer", response)
        if (response?.data.status === true) {

            setCorrect(response?.data?.status);
            toast.success("Answer submitted successfully");

        } else if (response?.data.status === false) {
            setCorrect(false);
            toast.error("Wrong answer");
        }

    };
    const handlePrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleNext = () => {
        if (currentSlide < questions.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };


    const fetchEnroll = async (

    ) => {
        try {
            const response = await fetchEnrolled(id, usersId)
            const enrolledCourses = response?.data.EnrolledCourses;
            const attendedQuestions = enrolledCourses.map((course: any) => course.attendedQuestions);
            const flattenedAttendedQuestions = attendedQuestions.flat();
            setCompletedQuestion(flattenedAttendedQuestions);
            const wrongQuestions = enrolledCourses.map((course: any) => course.attendedWrongQuestions);
            const flattenedAttendedwrongQuestions = wrongQuestions.flat();
            setwrongCompletedQuestion(flattenedAttendedwrongQuestions);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchEnroll()

    }, [id, usersId, completedQuestion,wrongcompletedQuestion]);
    const checkCompletedQuestions = (questionId: string) => {
        const completed=completedQuestion?.includes(questionId);
        console.log("completed",completed)
        if(completed){
            return true 
        }else{
            return false
        }
    };
    const checkCompletedWrongQuestions = (questionId: string) => {
        console.log("questions",questionId)
        return  wrongcompletedQuestion?.includes(questionId)
    };

    const currentChapter = chapters[activeVideo];
    if (currentChapter && currentChapter.lessons.length > 0) {
        setVideoUrl(currentChapter.lessons[activeLessonIndex].url)

    }
    if (currentChapter && currentChapter.lessons.length > 0) {
        const lessonId = currentChapter.lessons[activeLessonIndex]?._id;
        setVideoUrl(currentChapter.lessons[activeLessonIndex].url)
        setLessonId(lessonId)
    }


    const handlePrevLesson = () => {
        if (activeLessonIndex > 0) {
            setActiveLessonIndex(activeLessonIndex - 1);
        } else if (activeVideo > 0) {
            setActiveVideo(activeVideo - 1);
            setActiveLessonIndex(chapters[activeVideo - 1].lessons.length - 1);
        }
    }

    const handleNextLesson = () => {
        if (activeLessonIndex < currentChapter.lessons.length - 1) {
            setActiveLessonIndex(activeLessonIndex + 1);
        } else if (activeVideo < chapters.length - 1) {
            setActiveVideo(activeVideo + 1);
            setActiveLessonIndex(0);
        }
    }
    const handleLessonEnded = async () => {
        try {
            const response = await PostompletedLesson(lessonId, id, usersId)
            if (response) {
                console.log("Lesson completion recorded:", response);
                const completedLessonsResponse = await GetLessonsView(id, usersId)
                console.log(completedLessonsResponse)
                if (completedLessonsResponse) {
                    const completedLessons = completedLessonsResponse.data.lessoncompletionView;
                    const isLessonCompleted = completedLessons.includes(lessonId);
                    if (isLessonCompleted) {
                        console.log(isLessonCompleted)

                    }
                    const chapterLessonIds = chapters[activeVideo]?.lessons.map((lesson: any) => lesson?._id);
                    const allLessonsCompleted = chapterLessonIds.every((lessonId: any) => completedLessons.includes(lessonId));
                    if (allLessonsCompleted) {
                        const chapterId = chapters[activeVideo]?._id;
                        const chapterResponse = await PostompletedChapter(chapterId, id, usersId)
                        if (chapterResponse) {
                            const completedChapterResponse = await GetChapterView(id, usersId)
                            console.log(completedChapterResponse)
                            if (completedChapterResponse) {
                                const completedChapters = completedChapterResponse.data.chaptercompletionView;
                                console.log("completed chapters", completedChapters)
                                

                                const isChapterCompleted = completedChapters.every(chapterId);
                                // const isChapterCompleted = completedChapters.every((chapter: any) => chapter === chapterId);
                                console.log("chapter completed",isChapterCompleted)
                                if (isChapterCompleted) {
                                    console.log(isChapterCompleted)
                                    // const result = await ChaptersCompletedTime(id, usersId);
                                    // console.log("course status update",result)

                                }
                            }
                            console.log("Chapter completion recorded:", chapterResponse);
                        }

                    }
                }
            }
        } catch (error) {
            console.error("Error recording completion:", error);
        }
    };

    useEffect(() => {
        const handleCheckEnded = async () => {
            try {
                const completedLessonsResponse = await GetLessonsView(id, usersId)
                if (completedLessonsResponse) {
                    const completedLessons = completedLessonsResponse.data.lessoncompletionView;
                    const completedLessonIds = [];
                    for (const lessonId of completedLessons) {
                        completedLessonIds.push(lessonId);
                    }
                    setLessonCompleted(completedLessonIds);
                    const chapterLessonIds = chapters[activeVideo]?.lessons.map((lesson: any) => lesson?._id);
                    if (chapterLessonIds && chapterLessonIds.length > 0) {
                        const allLessonsCompleted = chapterLessonIds.every((lessonId: any) => completedLessons.includes(lessonId));
                        if (allLessonsCompleted) {
                            const completedChapterResponse = await GetChapterView(id, usersId)
                            if (completedChapterResponse) {
                                // const chapterId = chapters[activeVideo]._id;
                                const completedChapters = completedChapterResponse.data.chaptercompletionView;
                                const completedChapterIds = [];
                                for (const chapterId of completedChapters) {
                                    completedChapterIds.push(chapterId);
                                }
                                setChapterCompleted(completedChapterIds)
                                RefetchCourseDetails();
                                
                                const chaptersResponse = await GetChapters(CourseDetails._id);
                                console.log("chapter response", chaptersResponse)
                                const chapters = chaptersResponse?.data.Response.flatMap((item: any) => item.chapters);
                                const completedChaptersfortime = chapters.every((chapter: any) => ChapterCompleted.includes(chapter._id));
                                console.log("chapter completed", completedChaptersfortime)
                                console.log("chapter completedvalue", chapters.length === ChapterCompleted.length)
                                if (completedChaptersfortime && chapters.length === ChapterCompleted.length) {
                                    console.log(completedChaptersfortime)
                                    const result = await ChaptersCompletedTime(id, usersId);
                                    console.log("course status update", result)

                                }
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Error recording completion:", error);
            }
        };

        handleCheckEnded();

    }, [lessonId, activeVideo, id, chapters, setLessonCompleted, setChapterCompleted, lessonCompleted, ChapterCompleted, usersId, CourseDetails?._id]);

    const initiateVideoCall = (meetingcode: string) => {

        const url = `/videocall/${meetingcode}`;
        window.open(url, "_blank");



    }


    const handleReviewSubmit = async () => {
        if (reviews.length === 0) {
            toast.error("Review cant be empty")
        } else {

            const reviewResponse = await ReviewSubmit(reviews, rating, id, usersId)
            console.log(reviewResponse)
            toast.success("review added successfully")
            RefetchCourseDetails();
            setReviews("")
            setRating(1)


        }
    }
    const RefetchCourseDetails = async () => {
        try {
            const response = await GetCourse(id)
            console.log("course", response?.data.Response)
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

    const isReviewExists = CourseDetails?.reviews.find((item: any) => item.userId?._id === usersId)
    const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const shuffleArray = (array: Question[]) => {
            return array
                .map((value) => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value);
        };

     

        setShuffledQuestions(shuffleArray(questions));
    }, [questions]);

    return (
        <>


            <div className="w-[95%] 800px:w[86%] py-4 m-auto">
                <ReactPlayer
                    url={videoUrl}
                    controls={true}
                    width="99%"
                    height="90%"
                    onEnded={handleLessonEnded}

                />
                <div className="!w-[unset] flex items-center justify-between my-3">
                    <div className="!bg-[crimson] rounded p-2 !min-h-[40px] !py-[unset] cursor-pointer opacity-[.8] flex items-center" onClick={handlePrevLesson}>

                        <AiOutlineArrowLeft className="mr-2 text-white" />
                        <span className="text-white">prev Lesson</span>

                    </div>
                    <div className="!bg-[crimson] rounded p-2 !min-h-[40px] !py-[unset] cursor-pointer opacity-[.8] flex items-center" onClick={handleNextLesson}>
                        <span className="text-white">next Lesson</span>
                        <AiOutlineArrowRight className="ml-2 text-white" />
                    </div>
                </div>
                <h1 className="pt-2 text-[25px] font-[600]">{CourseDetails?.name}</h1>
                <br />
                <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
                    {["overview", "Classes", "Resourses", "Quizz", "Reviews"].map((text, index) => (
                        <h5 key={index} className={`800px;text-[20px] cursor-pointer ${activeBar === index && "text-red-500"
                            }`} onClick={() => setActiveBar(index)}>
                            {text}

                        </h5>
                    ))}
                </div>
                {
                    activeBar === 0 && (
                        <p className="text-[18px] p-2 text-sm whitespace-pre-line mb-3">
                            {CourseDetails?.description}
                        </p>
                    )
                }
                {
                    activeBar === 1 && (
                        <div className=" mt-11 mb-11">
                            {CourseDetails.meeting ? (
                                <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="relative">
                                        <div className="text-center px-6 py-4">
                                            <div className="py-4">
                                                <h3 className="text-xl font-semibold text-gray-800">Upcoming Meeting</h3>
                                                <div key={CourseDetails?._id}>
                                                    <p className="text-sm font-medium text-gray-600">Meeting Date: {CourseDetails.meeting.meetingDate}</p>
                                                    <p className="text-sm font-medium text-gray-600">Meeting Time: {CourseDetails.meeting.meetingTime}</p>
                                                    <p className="text-sm font-medium text-gray-600 hidden">Meeting Code:{CourseDetails.meeting.meetingCode} </p>
                                                    <p className="text-sm font-medium text-gray-600">Description:{CourseDetails.meeting.description} </p>
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => initiateVideoCall(CourseDetails.meeting.meetingCode)} >Start Video Call</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                    <div className="flex items-center justify-center p-16">
                                        <span className="text-center">No meetings available</span>
                                    </div>
                            )}

                        </div>
                    )

                }
                {
                    activeBar === 2 && (
                        <div className="flex items-center justify-center p-20">
                            <span className="text-center">VideoLinks</span>
                        </div>
                    )

                }
                {
                    activeBar === 3 && (
                        <>
                            <div className="px-4 md:px-10 py-10 overflow-hidden">
                                {correct && (
                                    <ConfettiExplosion
                                        style={{ position: "fixed", top: "50%", left: "50%" }}
                                        force={0.8}
                                        duration={5000}
                                        particleCount={250}
                                        width={1600}
                                        zIndex={1000}
                                        onComplete={() => setCorrect(false)}
                                    />
                                )}
                                {shuffledQuestions.length === 0 ? (
                                    <div className="flex items-center justify-center p-16">
                                        <span className="text-center">No questions available</span>
                                    </div>
                                ) : (
                                <div className="swiper-wrapper">
                                    {shuffledQuestions.map((question: Question, index: number) => (
                                        <div key={index} className={`shadow-md px-4 md:px-10 py-5 ${index === currentSlide ? '' : 'hidden'}`}>
                                            <form onSubmit={submitAnswer}>
                                                <h1 className="text-lg font-bold mb-4">Quiz</h1>
                                                <div className="mb-4">
                                                    <h2 className="text-lg font-semibold mb-2">{question?.question} ?</h2>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {question.options.map((option: string, optionIndex: number) => (
                                                        <div key={optionIndex} className="bg-gray-300 flex items-center rounded-md py-2 px-2">
                                                            {!checkCompletedWrongQuestions(question?._id as string) &&!checkCompletedQuestions(question?._id as string) && (
                                                                <input
                                                                    onChange={(e) =>
                                                                        selectAnswer(
                                                                            e.target.value as string,
                                                                            question?._id as string
                                                                        )
                                                                    }
                                                                    type="radio"
                                                                    className="mr-2"
                                                                    name={`question${question?._id}`}
                                                                    value={optionIndex + 1}
                                                                />
                                                            )}
                                                            <p>{option}</p>
                                                        </div>
                                                    ))}
                                                    {/* {feedback && (
                                                        <div className={`mt-4 text-lg ${correct ? 'text-green-600' : 'text-red-600'}`}>
                                                            {feedback}
                                                        </div>
                                                    )} */}
                                                </div>
                                                <div className="mt-8 flex justify-between">
                                                    {index > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={handlePrev}
                                                            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                                                        >
                                                            Previous
                                                        </button>
                                                    )}
                                                    <div>
                                                        {/* {checkCompletedWrongQuestions(question._id as string) && (
                                                            <span className="bg-green-100 text-red-800 text-xs font-medium me-2 px-10 py-3 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                                                                Not Answered <FontAwesomeIcon icon={faSmile} />
                                                            </span>
                                                        ) }                     
                                                      {checkCompletedQuestions(question._id as string) ? (
                                                            <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-10 py-3 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                                                                Answered <FontAwesomeIcon icon={faSmile} />
                                                            </span>
                                                        ) : ( */}
                                                        {checkCompletedQuestions(question?._id as string) || checkCompletedWrongQuestions(question?._id as string) ? (
                                                            <span className={`bg-${checkCompletedQuestions(question._id as string) ? 'green' : 'red'}-100 text-${checkCompletedQuestions(question?._id as string) ? 'green' : 'red'}-800 text-xs font-medium me-2 px-10 py-3 rounded dark:bg-gray-700 dark:text-${checkCompletedQuestions(question._id as string) ? 'green' : 'red'}-400 border border-${checkCompletedQuestions(question._id as string) ? 'green' : 'red'}-400`}>
                                                                {checkCompletedQuestions(question?._id as string) ? 'Correct Answer' : 'wrong Answer'} <FontAwesomeIcon icon={faSmile} />
                                                            </span>
                                                        ) :(
                                                            <button
                                                                className={`px-4 py-2 mr-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${checkCompletedQuestions(question._id as string)
                                                                    ? "btn-disabled"
                                                                    : ""
                                                                    }`}
                                                            >
                                                                Submit
                                                            </button>
                                                        )}
                                                        {index < questions.length - 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={handleNext}
                                                                className={`px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700 ${checkCompletedQuestions(question._id as string)
                                                                    ? ""
                                                                    : "btn-disabled"
                                                                    }`}
                                                            >
                                                                Next
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    ))}
                                    
                                </div>
                                )}
                            </div>
                        </>
                    )
                }
                {
                    activeBar === 4 && (
                        <div className="w-full">
                            <>
                                {!isReviewExists && (
                                    <>

                                        <div className="flex w-full">

                                        </div>
                                        <image href="" width={50} height={50} className="w-[50px] h-[50px] rounded-full object-cover" />
                                        <div className="w-full pt-3">
                                            <h5 className="pl-3 text-[18px] font-[500] ">Give a Rating<span className="text-red-500">*</span></h5>
                                            <div className="flex w-full ml-2 pb-3">
                                                {[1, 2, 3, 4, 5].map((i) =>
                                                    rating >= i ? (
                                                        <AiFillStar key={i} className="mr-1 cursor-pointer" color="rgb(246,186,0)" size={25} onClick={() => setRating(i)} />
                                                    ) : (<AiOutlineStar key={i} className="mr-1 cursor-pointer" color="rgb(246,186,0)" size={25} onClick={() => setRating(i)} />))}
                                            </div>
                                        </div>

                                        <textarea
                                            name=""
                                            value={reviews}
                                            onChange={(e) => setReviews(e.target.value)}
                                            id=""
                                            cols={40}
                                            rows={5}
                                            placeholder="write your content"
                                            className="outline-none bg-gray-100 800px:ml-3 border border-[#ffffff57]  w-full 800px:w-full p-2 rounded text-[18px] font-Poppins"
                                        />
                                        <div className="w-full fex justify-end cursor-pointer">
                                            <div className="!w-[120px] !h-[40px] bg-[crimson] text-white text-center p-2 rounded-xl text-[18px] mt-5 800px:mr-0 mr-2" onClick={handleReviewSubmit}>
                                                Submit
                                            </div>

                                        </div>
                                    </>
                                )


                                }


                            </>
                            <br />
                            <div className="w-full  bg-[#ffffff3b] ">
                                <div className="w-full">
                                    {(CourseDetails.reviews && [...CourseDetails.reviews].reverse()).map((item: any, index: number) => (

                                        <div className="w-full my-5">
                                            <div className="w-full flex p-5">

                                                <div>
                                                    <img src={item?.userId?.profileimage} width={30} height={30} className="w-[30px] h-[30px] mt-1 rounded-full object-cover" />
                                                </div>
                                                <div>
                                                    <h1 className="text-[18px] ms-7">
                                                        {item?.userId?.name}
                                                    </h1>


                                                    <div className="ms-7">
                                                        <StarRating rating={item?.rating} />
                                                    </div>
                                                    <div className="flex">

                                                        <p className="text-black ms-8 mt-2">{item?.comments}</p>


                                                    </div>
                                                    <small className="text-black ms-8">
                                                        {format(item?.createdAt)}

                                                    </small>
                                                    <div className="ms-6">
                                                        <button className="ps-2 text-xs" onClick={() => toggleReplies(index)}>comments</button>
                                                        {expandedReviewIndex === index && item.commentreplies && (
                                                            <div>
                                                                {item.commentreplies.map((reply: any, replyIndex: any) => (
                                                                    <div className="w-full ms-2 bg-[#ffffff3b]" key={replyIndex}>
                                                                        <small>Tutor</small>
                                                                        <p className="text-black ms-2">{reply}</p>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                        )}

                                                    </div>


                                                </div>
                                                <BsPencil
                                                    className="cursor-pointer ms-12 mt-2 text-sm dark:text-white text-gray-700" onClick={handleOpenModal}
                                                />
                                            </div>
                                            {isModalOpen && (
                                                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                                                    <div className="bg-white p-8">

                                                        <div className="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
                                                            style={{ background: 'rgba(0,0,0,.7)' }}>
                                                            <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                                                                <div className="modal-content py-4 text-left px-6">
                                                                    <div className="flex justify-between items-center pb-3">
                                                                        <p className="text-2xl font-bold">Edit Review</p>
                                                                        <div className="modal-close cursor-pointer z-50" onClick={handleCloseModal}>
                                                                            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                                                viewBox="0 0 18 18">
                                                                                <path
                                                                                    d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
                                                                                </path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div className="my-5">
                                                                        <image href="" width={50} height={50} className="w-[50px] h-[50px] rounded-full object-cover" />
                                                                        <div className="w-full pt-3">
                                                                            <h5 className="pl-3 text-[18px] font-[500] ">Give a Rating<span className="text-red-500">*</span></h5>
                                                                            <div className="flex w-full ml-2 pb-3">
                                                                                <StarRatings initialValue={item?.rating} editRating={editRating} setEditRating={setEditRating} />
                                                                            </div>
                                                                        </div>
                                                                        <TextArea initialValue={item?.comments} editReviews={editReviews} setEditReviews={setEditReviews} />
                                                                    </div>
                                                                    <div className="flex justify-end pt-2">
                                                                        <button className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400" onClick={handleEditReviewSubmit}>Confirm</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            )}


                                        </div>


                                    ))}

                                </div>

                                <br />


                            </div>


                        </div>



                    )

                }


            </div>

        </>
    )
}

export default CourseContentMedia
