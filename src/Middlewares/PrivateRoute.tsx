 /* eslint-disable @typescript-eslint/no-explicit-any */
// // /* eslint-disable @typescript-eslint/no-explicit-any */


// import { CourseDetailsPageGetUsers } from "@/Api/user";
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import {  useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";


// const PrivateRoute: React.FC<any> = ({ children }) => {
//     const [userCourseIds, setUserCourseIds] = useState<string[]>([]);
//     const [loading, setLoading] = useState(true);
//     const courseData = useSelector((state: any) => state.value.courseData);
//     const userData = useSelector((state: any) => state.value.userData);
//     const userId = userData?._id;
//     const navigate=useNavigate()

//     useEffect(() => {
//         const fetchUserCourseIds = async () => {
//             try {
//                 const response = await CourseDetailsPageGetUsers(userId);
//                 console.log("User course details response:", response?.data.user);
//                 if (response?.data.success) {
//                     setUserCourseIds(response.data.user.courseIds);
//                 }
//             } catch (error) {
//                 console.error('Error fetching user course details:', error);
//             } finally {
//                 setLoading(false); 
//             }
//         };
//         fetchUserCourseIds();
//     }, [userId]);

//     if (loading) {
//         return null; 
//     }

//     const isLoggedIn = userCourseIds.some(courseId => Array.isArray(courseData) && courseData.includes(courseId));

//     if (!isLoggedIn) {
//         navigate(-1)
//         toast("user is not enrolled this course")
//     }
//     return <>{children}</>;
// };
// export default PrivateRoute;

import { CourseDetailsPageGetUsers } from "@/Api/user";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute: React.FC<any> = ({ children }) => {
    const [userCourseIds, setUserCourseIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const courseData = useSelector((state: any) => state.value.courseData);
    const userData = useSelector((state: any) => state.value.userData);
    const userId = userData?._id;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserCourseIds = async () => {
            try {
                const response = await CourseDetailsPageGetUsers(userId);
                console.log("User course details response:", response?.data.user);
                if (response?.data.success) {
                    setUserCourseIds(response.data.user.courseIds);
                }
            } catch (error) {
                console.error('Error fetching user course details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserCourseIds();
    }, [userId]);

    useEffect(() => {
        if (!loading) {
            const isLoggedIn = userCourseIds.some(courseId => Array.isArray(courseData) && courseData.includes(courseId));
            if (!isLoggedIn) {
                toast("User is not enrolled in this course");
                navigate(-1); 
            }
        }
    }, [loading, userCourseIds, courseData, navigate]);

    if (loading) {
        return null; 
    }

    return <>{children}</>;
};

export default PrivateRoute;
