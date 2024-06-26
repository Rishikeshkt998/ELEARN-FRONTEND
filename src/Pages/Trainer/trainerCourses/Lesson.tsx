import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";

// import { useState } from "react";
// import { ConfirmDialog } from "@hilla/react-components/ConfirmDialog.js";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Lesson({ lesson, lessonLoad, setLessonLoad }: any) {
    // const [dialogOpened, setDialogOpened] = useState(false);
    useEffect(() => {
        initFlowbite();
        setLessonLoad(!lessonLoad)
    }, []);
    

    return (
        <div className="bg-gray-200 mt-2 py-2 px-3 rounded-md flex justify-between items-center">
            <h1
                data-modal-target={`lesson-play${lesson._id}`}
                data-modal-toggle={`lesson-play${lesson._id}`}
            >
                <FontAwesomeIcon className="mr-2" icon={faPlay} />
                {lesson.title}
            </h1>
            <FontAwesomeIcon
                // onClick={() => setDialogOpened(true)}
                icon={faTrashAlt}
            />
            <div
                id={`lesson-play${lesson._id}`}
                tabIndex={-1}
                aria-hidden="true"
                className="hidden overflow-y-auto overflow-x-hidden  fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {lesson.title}
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide={`lesson-play${lesson._id}`}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-4 md:p-5 space-y-4">
                            <video className="w-screen rounded-md" controls>
                                <source src={lesson.videoUrl} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
           
        </div>
    );
}

export default Lesson;