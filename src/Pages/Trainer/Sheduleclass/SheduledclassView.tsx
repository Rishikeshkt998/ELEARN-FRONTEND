/* eslint-disable @typescript-eslint/no-explicit-any */
import { SheduledView } from "@/Api/trainer";
// import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
interface prerequisite {
    title: string;

}
interface benefits {
    title: string;

}
interface Meeting {
    meetingDate?: string,
    meetingTime?: string,
    meetingCode?: string,
    description?: string
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
    meeting?:Meeting

}

const SheduledclassView = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    
    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await SheduledView()
                if (response?.data) {
                    setCourses(response?.data);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }
        fetchCourses();
    }, []);
    const initiateVideoCall=(meetingcode:string)=>{
        const url = `/tutor/videocalltrainer/${meetingcode}`;
        window.open(url, "_blank");
        

    }
  return (
      
   
      <div className="h-screen pt-11 bg-gray-900">
          {courses.length > 0 ? (
              courses.map((course: any) => (
                  <div key={course._id} className="max-w-md mx-auto mb-11 bg-white shadow-lg rounded-lg overflow-hidden">
                      <div className="relative text-center px-6 py-4">
                          <div className="py-4">
                              <h3 className="text-xl font-semibold text-gray-800">Upcoming Meeting</h3>
                              <div>
                                  <p className="text-sm font-medium text-gray-600">Meeting Date: {course.meeting.meetingDate}</p>
                                  <p className="text-sm font-medium text-gray-600">Meeting Time: {course.meeting.meetingTime}</p>
                                  <p className="text-sm font-medium text-gray-600">Description: {course.meeting.description}</p>
                        
                                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => initiateVideoCall(course.meeting.meetingCode)}>Start Video Call</button>
                              </div>
                          </div>
                      </div>
                  </div>
              ))
          ) : (
              <div className="text-center text-white mt-5">
                  <span>No meetings available</span>
              </div>
          )}
      </div>
          
      
  )
}

export default SheduledclassView
