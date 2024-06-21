/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


import { FC,  useEffect,  useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5"
import ReactPlayer from "react-player"
import { Elements } from "@stripe/react-stripe-js"
import CheckOutForm from "./CheckOutForm";
import StarRating from "@/Components/user/StarRating";

import { useNavigate } from "react-router-dom";
import CourseContentListforUser from "./CourseContentListforDetails";



type Props = {
    CourseDetails: any,
    clientSecret: string,
    stripePromise: any,
    user:any;

}


const CourseDetails: FC<Props> = ({ CourseDetails, clientSecret, stripePromise,user }) => {
    const [open, setopen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [review,setReviews]=useState<any[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPaymentFailedModal, setIsPaymentFailedModal] = useState(false);
    
    const navigate=useNavigate()
    const id=CourseDetails?._id
    useEffect(() => {
        if (CourseDetails?.reviews) {
            setReviews(CourseDetails.reviews);
        }
    }, [CourseDetails]);
    const handleOrder = () => {
        setopen(true)

    }
    const discountPercentage = ((CourseDetails?.estimatedPrice - CourseDetails?.price) / CourseDetails?.estimatedPrice) * 100
    const discountPercentagePrice = discountPercentage.toFixed(0)

    const handleClick = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);

            navigate(`/coursecontentpage/${CourseDetails?._id}`);
        }, 2000);
    };
    const calculateAvg = (arr: any[]): number => {
        if (!Array.isArray(arr) || arr.length === 0) {
            return 0;
        }
        const total = arr.reduce((total: number, item: any) => total + item.rating, 0);
        const avg = total / arr.length;
        console.log("average",avg)
        return avg;
    };
    const avgRating = calculateAvg(review);
    const numberOfReviews = review.length;
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
        }).format(price);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate(`/coursecontentpage/${CourseDetails?._id}`);
    };
    const handleCloseErrorModal = () => {
        setIsPaymentFailedModal(false);
    };
    
    return (
        <>

            <div>
                <div className="max-w-[1320px] md:py-[80] py-5 border bg-gray-200  flex mx-auto sm:flex-row flex-col">
                    <div>

                    </div>
                    <div className="basis-[55%] pb-5 m-5">
                        <h1 className="text-[25px] font-poppins font-[600] text-black dark:text-white">
                            {CourseDetails?.name}
                        </h1>
                        <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center">
                                <StarRating rating={avgRating} />
                                <h5 className="text-black dark:text-white "> ({numberOfReviews} reviews)</h5>
                            </div>
                            <h5 className="text-black dark:text-white">{numberOfReviews} students</h5>
                        </div>
                        <br />
                        <h5 className="text-[20px] font-poppins font-[600] text-black dark:text-white">
                            What you will learn from this course
                        </h5>
                        {
                            CourseDetails?.
                                benefits?.map((item: any, index: number) => (
                                    <div className="w-full flex 800px:items-center py-2" key={index}>
                                        <div className="w-[15px] mr-1">
                                            <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white" />
                                        </div>
                                        <p className="pl-2 text-black dark:text-white">{item.title}</p>
                                    </div>
                                ))
                        }
                        <br />
                        <br />
                        <h1 className="text-[20px] font-poppins font-[600] text-black dark:text-white">
                            What are the prerequisites
                        </h1>
                        {
                            CourseDetails?.
                                prerequisite?.map((item: any, index: number) => (
                                    <div className="w-full flex 800px:items-center py-2" key={index}>
                                        <div className="w-[15px] mr-1">
                                            <IoCheckmarkDoneOutline size={20} className="text-black dark:text-white" />
                                        </div>
                                        <p className="pl-2 text-black dark:text-white">{item.title}</p>
                                    </div>
                                ))
                        }

                        <br />
                        <br />
                        <div>
                            <h1 className="text-[20px] font-Poppins font-[600] text-black dark:text-white ">
                                Course Overview
                            </h1>
                            <CourseContentListforUser id={id} />
                        </div>
                        <br />
                        <br />
                        <div className="w-full">
                            <h1 className="text-[20px] font-Poppins font-[600] text-black dark:text-white">
                                Course Details
                            </h1>
                            <p className="text-[16px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                                {CourseDetails?.description}
                            </p>
                        </div>
                        <br />
                        <br />


                    </div>
                    <div className="basis-[45%] px-5 m-5">
                        <div className="stick top-[100px] left-0 z-50 w-full">
                            <ReactPlayer url={CourseDetails?.demoUrl} controls={true}
                                width="100%"
                                height="100%" />
                        </div>
                        <div className="flex item-center">
                            <h1 className="pt-5 text-[28px] text-black">
                                {CourseDetails?.price=== 0 ? "Free" : formatPrice(CourseDetails?.price)}
                            </h1 >
                            <h5 className="pt-3 text-[20px] mt-2 line-through opacity-80 text-black">
                                {formatPrice(CourseDetails?.estimatedPrice)}
                            </h5>
                            <h4 className="pt-5 text-[22px]  text-black">
                                {discountPercentagePrice}%off
                            </h4>

                        </div >
                        <div className="flex item-center">
                            {user?.includes(CourseDetails?._id) ? (
                                <div  className="!w-[180px] my-3 font-Poppins p-3 rounded-lg cursor-pointer !bg-[crimson]">
                                    <button  className="text-white " onClick={handleClick} >
                                        Enter to course
                                    </button>

                                </div>

                            ) : (
                                <div onClick={handleOrder} className="!w-[180px] my-3 font-Poppins text-[16px] rounded-lg p-3  cursor-pointer !bg-[crimson]">
                                    Buy now  {formatPrice(CourseDetails?.price)}
                                </div>

                            )}

                        </div >
                        <br/>
                        <p className="pb-1">*Sourse code included</p>
                        <p className="pb-1">*Full lifetime access</p>
                        <p className="pb-1">*Certificate of completeion </p>
                        <p className="pb-1 800px:pb-1">*Premium support</p>
                        <div className="flex item-center">


                        </div>

                    </div>

                </div>
                {isLoading && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>

                    </div>
                )}
                <>
                    {
                        open && (
                            <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
                                <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow-p3">
                                    <div className="w-full flex justify-end">
                                        <IoCloseOutline size={40} className="text-black cursor-pointer" onClick={() => setopen(false)} />
                                    </div>
                                    <div className="w-full">
                                        {
                                            stripePromise && clientSecret && (
                                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                                    <CheckOutForm setopen={setopen} CourseDetails={CourseDetails} isModelOpen={isModalOpen} setIsModalOpen={setIsModalOpen} isPaymentFailedModal={isPaymentFailedModal} setIsPaymentFailedModal={setIsPaymentFailedModal} />
                                                </Elements>
                                            )
                                        }

                                    </div>


                                </div>
                            </div>

                        )
                    }
                    {/* {
                        isModalOpen && (
                            <div className="fixed inset-0 flex items-center p-32 justify-center z-50">
                                <div className="fixed inset-0 bg-black opacity-50"></div>
                                <div className="bg-white p-5 rounded shadow-lg z-10">
                                    <div className="flex flex-col items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-16 w-16 text-green-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
                                        <p className="text-gray-700 mb-4">Thank you for your purchase.</p>
                                        <button
                                            onClick={handleCloseModal}
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    } */}
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                            <div className="fixed inset-0 bg-black opacity-50"></div>
                            <div className="bg-white p-10 rounded shadow-lg z-10 max-w-3xl mx-auto">
                                <div className="flex flex-col items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-20 w-20 text-green-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
                                    <p className="text-gray-700 mb-4">Thank you for your purchase.</p>
                                    <button
                                        onClick={handleCloseModal}
                                        className="bg-blue-500 text-white px-6 py-3 rounded text-xl"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {isPaymentFailedModal && (
                        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
                                <div className="flex items-center justify-center rounded-full bg-red-500 text-white text-4xl h-24 w-24 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-semibold text-red-600 mb-4">Payment Failed</h2>
                                <p className="text-gray-700">Unfortunately, your payment could not be processed at this time. Please try again later.</p>
                                <button
                                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                    onClick={handleCloseErrorModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </>
            </div>


        </>
    )
}

export default CourseDetails