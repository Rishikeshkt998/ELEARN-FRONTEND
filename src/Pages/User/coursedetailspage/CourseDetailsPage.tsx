/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


import { FC, useEffect, useState } from "react"
import NavBar from "../../../Components/common/UserCommon/Navbar";
import Footer from "../../../Components/common/UserCommon/Footer";
import CourseDetails from "./courseDetails";
import { loadStripe } from "@stripe/stripe-js"
import { CourseDetailsPageGetCourse, CourseDetailsPageGetUsers, GetPayment, Payment } from "@/Api/user";

type Props = {
    id: string | undefined
}
interface prerequisite {
    title: string;

}
interface benefits {
    title: string;

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

}
const CourseDetailsPage: FC<Props> = ({ id }) => {
 

    const [courseDetails, setCourseDetails] = useState<Course | null>(null);
    const[user,setUser]=useState([])
    const [stripePromise, setStripePromise] = useState<any>(null)
    const [clientSecret, setClientsecret] = useState("")

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await CourseDetailsPageGetCourse(id)
                console.log(response?.data.Response)
                if (response) {
                    setCourseDetails(response.data.Response);
                } else {
                    console.error('Failed to fetch course details');
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourseDetails();



    }, [id]);
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const id = localStorage.getItem('userId');
                const response = await CourseDetailsPageGetUsers(id);
                console.log("user response",response?.data.user)
                if(response?.data.success){
                    setUser(response.data.user.courseIds)
                }
                
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchUserDetails();



    }, [id]);
    useEffect(() => {
        const getPublishablekey = async () => {
            try {
                const response = await GetPayment()
                console.log(response?.data.publishablekey)
                if (response) {
                    setStripePromise(loadStripe(response.data.publishablekey));
                } else {
                    console.error('Failed to fetch course details');
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        getPublishablekey();
        const userPayment = async () => {
            try {
                if (courseDetails) {
                    const amount = Math.round(courseDetails?.price * 100)
                    console.log(amount)

                    const response = await Payment(amount)
                    console.log(response)
                    if (response) {
                        console.log(response.data.client_secret)
                        setClientsecret(response.data.client_secret)

                    } else {
                        console.error('Failed to fetch client_key');
                    }

                }


            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        userPayment();
    }, [courseDetails]);



    return (

        <div>
            <NavBar />
            {stripePromise&&(
                <CourseDetails user={user}  CourseDetails={courseDetails} stripePromise={stripePromise} clientSecret={clientSecret}/>

            )}
            
            <Footer darkMode={false} />

        </div>
    )
}

export default CourseDetailsPage


