/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC, useState } from "react"
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"

import { useNavigate } from "react-router-dom"
import { OrderPost } from "@/Api/user"
import { useDispatch } from "react-redux"
import { saveCourse } from "@/store/slice/valueSlice"

type Props = {
    setopen: any,
    CourseDetails: any
}
const CheckOutForm: FC<Props> = ({  CourseDetails }) => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [message, setaMessage] = useState<any>("")
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        })

        if (error) {
            setaMessage(error.message);
            // setIsLoading(false)
            
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            // setIsLoading(true)
            const createOrder = async () => {
                try {
                    const id = localStorage.getItem('userId')
                    console.log("hi it is my id",id)
                    console.log(paymentIntent)
                    dispatch(saveCourse(CourseDetails._id))
                    const response = await OrderPost( id,  CourseDetails._id,  paymentIntent )
                    // axios.post(`http://localhost:5000/api/user/orderpost`, {id:id,courseId:CourseDetails._id,payment_Info:paymentIntent });
                    console.log(response)
                    if (response?.data.orderPost.success) {
                        // setIsLoading(false)
                        navigate(`/coursecontentpage/${CourseDetails?._id}`)
                        

                    } else {
                        console.error('Failed to fetch client_key');
                    }




                } catch (error) {
                    console.error('Error fetching course details:', error);
                }
            };

            createOrder();
        }

    }

    const stripe = useStripe()
    const elements = useElements()
    // useEffect(()=>{

    // })
    return (

        <form id="payment-form" onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px' }}>
                <LinkAuthenticationElement id="link-authentication-element" />
            </div>
            <div style={{ marginBottom: '20px' }}>
                <PaymentElement id="payment-element" />
            </div>
            <button disabled={isLoading || !stripe || !elements} id="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message" style={{ marginTop: '20px', marginBottom: "20px", color: message.includes('error') ? 'red' : 'green' }}>{message}</div>}
            {isLoading && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>

                </div>
            )}
        </form>
    )
}

export default CheckOutForm

