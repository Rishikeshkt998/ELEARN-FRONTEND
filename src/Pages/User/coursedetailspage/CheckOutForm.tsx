/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC, useState } from "react"
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"

// import { useNavigate } from "react-router-dom"
import { OrderPost } from "@/Api/user"
import { useDispatch } from "react-redux"
import { SaveUser, saveCourse } from "@/store/slice/valueSlice"

type Props = {
    setopen: any,
    CourseDetails: any
    isModelOpen:any
    setIsModalOpen:(isModelOpen: any)=>void
}
const CheckOutForm: FC<Props> = ({  CourseDetails ,setopen,setIsModalOpen}) => {
    const dispatch=useDispatch()
    // const navigate=useNavigate()
    const [message, setaMessage] = useState<any>("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        })
        // setIsLoading(true)

        if (error) {
            setaMessage(error.message);
            
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setIsLoading(true)
            const createOrder = async () => {
                try {
                    const id = localStorage.getItem('userId')
                    console.log("hi it is my id",id)
                    console.log(paymentIntent)
                    dispatch(saveCourse(CourseDetails._id))
                    const response = await OrderPost( id,  CourseDetails._id,  paymentIntent )
                    console.log("order response",response)
                    if (response?.data.orderPost.success) {
                        dispatch(SaveUser(response?.data.orderPost.updateUser))
                        // navigate(`/coursecontentpage/${CourseDetails?._id}`)
                        // navigate(`/paymentsucess`)
                        setopen(false)
                        setIsLoading(false);
                        setIsModalOpen(true);

                        
                        

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

    const handleCancel = () => {
        setopen(false);
    };
    // useEffect(()=>{

    // })
    
    return (
        <div>
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
            <button
                className="ms-3"
                type="button"
                onClick={handleCancel}
                style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Cancel
            </button>
            {message && <div id="payment-message" style={{ marginTop: '20px', marginBottom: "20px", color: message.includes('error') ? 'red' : 'green' }}>{message}</div>}
            {isLoading && (
                <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>

                </div>
            )}
            
        </form>
        
        </div>
    )

}

export default CheckOutForm

