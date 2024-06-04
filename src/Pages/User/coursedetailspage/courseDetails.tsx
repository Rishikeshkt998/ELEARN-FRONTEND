/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


import { FC,  useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5"
import ReactPlayer from "react-player"
import { Elements } from "@stripe/react-stripe-js"
import CheckOutForm from "./CheckOutForm";
import StarRating from "@/Components/user/StarRating";

import { Link } from "react-router-dom";



type Props = {
    CourseDetails: any,
    clientSecret: string,
    stripePromise: any,
    user:any;

}


const CourseDetails: FC<Props> = ({ CourseDetails, clientSecret, stripePromise,user }) => {
    const [open, setopen] = useState(false)
    const handleOrder = () => {
        setopen(true)

    }
    const discountPercentage = ((CourseDetails?.estimatedPrice - CourseDetails?.price) / CourseDetails?.estimatedPrice) * 100
    const discountPercentagePrice = discountPercentage.toFixed(0)
    
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
                                <StarRating rating={4} />
                                <h5 className="text-black dark:text-white "> reviews</h5>
                            </div>
                            <h5 className="text-black dark:text-white">5 students</h5>
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
                            {/* <CourseContentList id={CourseDetails?._id} /> */}
                        </div>
                        <br />
                        <br />
                        <div className="w-full">
                            <h1 className="text-[20px] font-Poppins font-[600] text-black dark:text-white">
                                Course Details
                            </h1>
                            <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
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
                                {CourseDetails?.price === 0 ? "Free" : CourseDetails?.price + "$"}
                            </h1 >
                            <h5 className="pt-3 text-[20px] mt-2 line-through opacity-80 text-black">
                                {CourseDetails?.estimatedPrice}$
                            </h5>
                            <h4 className="pt-5 text-[22px]  text-black">
                                {discountPercentagePrice}%off
                            </h4>

                        </div >
                        <div className="flex item-center">
                            {user?.includes(CourseDetails?._id) ? (
                                <div  className="!w-[180px] my-3 font-Poppins p-3 rounded-lg cursor-pointer !bg-[crimson]">
                                    <Link to={`/coursecontentpage/${CourseDetails._id}`} className="text-white">
                                        Enter to course
                                    </Link>

                                </div>

                            ) : (
                                <div onClick={handleOrder} className="!w-[180px] my-3 font-Poppins text-[20px] rounded-lg p-3  cursor-pointer !bg-[crimson]">
                                    Buy now   {CourseDetails?.price}$
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
                                                    <CheckOutForm setopen={setopen} CourseDetails={CourseDetails} />
                                                </Elements>
                                            )
                                        }

                                    </div>


                                </div>
                            </div>

                        )
                    }
                </>
            </div>


        </>
    )
}

export default CourseDetails