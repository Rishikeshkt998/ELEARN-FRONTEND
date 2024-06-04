/* eslint-disable @typescript-eslint/no-unused-vars */
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddQuestion from "./AddQuestion";
import { GetQuestions } from "@/Api/trainer";
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { MdDelete } from "react-icons/md";

interface Question {
    _id?: string
    question: string,
    options: string[];
    correctOption: number;
    courseId: string

}

const Questions: React.FC = () => {
    const { id } = useParams();

    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res =await GetQuestions(id)
                // await axios.get(`http://localhost:5000/api/course/getquestion/${id}`)
                console.log(res?.data.questions)
                setQuestions(res?.data.questions)
                // setReview(res.data.fetchreviews.reviews)


            } catch (err) {
                console.log(err)
            }

        }
        fetchComments()

    }, [id]);

    // const delete_question = (questionId: string) => {
    //     instructorAPI.deleteQuestion(courseId as string, questionId).then((res) => {
    //         setQuestions((prevState) =>
    //             prevState.filter(question => question._id !== questionId)
    //         );
    //     });
    // }

    return (
        <div className="w-full p-4 ">
            <div className="w-full p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 h-screen">
                <div className="grid grid-cols-1 gap-4 mb-4">
                    <div data-modal-target="crud-modal" data-modal-toggle="crud-modal" className="flex items-center justify-center rounded bg-blue-400 h-28 dark:bg-gray-800">
                        <FontAwesomeIcon className="text-2xl text-white" icon={faPlusCircle} />
                        <p className="font-bold ml-2 text-white">Add Question</p>
                    </div>
                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right bg-gray-50 text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Question</th>
                                {/* <th scope="col" className="px-6 py-3">Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((ques: Question) => (
                                <tr >
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {ques.question}
                                    </th>
                                    <td className="px-6 py-4">
                                        {/* <button className="btn btn-primary">
                                            <MdDelete size={20} />
                                        </button> */}
                                    </td> *
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                </div>
            </div>
            <AddQuestion setQuestion={setQuestions} courseId={id as string} />
        </div>
    );
};

export default Questions;