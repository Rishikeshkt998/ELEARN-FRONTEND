/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import CoursePlayer from "./CoursePlayer";

type Props={
    active:number;
    setActive:(active:number)=>void
    courseData:any;
    handleCourseCreate:any;
}
const CoursePreview:FC<Props> = ({
    courseData,
    handleCourseCreate,
    setActive,
    active
}) => {
    const discountPercentage = ((courseData?.estimatedPrice - courseData?.price) /courseData?.estimatedPrice)*100
    const discountPercentageprice=discountPercentage.toFixed(0)
    const prevButton=()=>{
        setActive(active-1)
    }
    const createCourse=()=>{
        handleCourseCreate()
    }
  return (
    <div className="w-[90%] m-auto py-5 mb-5">
        <div className="w-full relative">
            <div className="w-full mt-10">
                <CoursePlayer videoUrl={courseData?.demoUrl}title={courseData?.title} />
            </div>
        </div>
        <div className="flex items-center">
            <h1 className="pl-3 text-[25px]">
                {courseData?.price===0?"Free":courseData?.price+"$"}
            </h1>
              <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
                  {courseData?.estimatedPrice}$
              </h5>
              <h4 className="pl-5 pt-4 text-[22px] ">
                  {discountPercentageprice}%0ff
              </h4>

        </div>
        
          <p className="pb-1">*Sourse code included</p>
          <p className="pb-1">*Full lifetime access</p>
          <p className="pb-1">*Certificate of completeion </p>
          <p className="pb-1 800px:pb-1">*Premium support</p>
          <br/>
          <div className="flex justify-between">
              <div
                  className="w-44 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8"
                  onClick={() => prevButton()}
              >
                  Prev
              </div>
              <div
                  className=" w-44 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8"
                  onClick={() => createCourse()}
              >
                  Next
              </div>
          </div>

      
    </div>
  )
}

export default CoursePreview
