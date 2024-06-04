/* eslint-disable @typescript-eslint/no-explicit-any */
// import StarRating from "@/Components/user/StarRating";
// // import axios from "axios"
import { FC, useEffect, useState } from "react"
import { format } from 'timeago.js';
import { FaReply } from "react-icons/fa";
import { toast } from "react-toastify";
import { CommentReply, fetchReviews } from "@/Api/trainer";
import StarRating from "@/Components/user/StarRating";



type Props = {
  id: string | undefined
}

const CommentReplies: FC<Props> = ({ id }) => {
  const [review, setReview] = useState([])
  const [replyIndex, setReplyIndex] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetchReviews(id)
        console.log("review", res)
        setReview(res?.data.fetchreviews.reviews)


      } catch (err) {
        console.log(err)
      }

    }
    fetchComments()

  }, [id])
  const RefetchComments = async () => {
    try {
      const res = await fetchReviews(id)
      console.log("review", res)
      setReview(res?.data.fetchreviews.reviews)


    } catch (err) {
      console.log(err)
    }

  }



  const handleToggleReply = (index: number) => {
    setReplyIndex(replyIndex === index ? null : index);
  };

  const handleReplySubmit = async (reviewId: string) => {
    try {
      const response = await CommentReply(reviewId, replyText)
      console.log("reply", response)

      console.log(response)
      toast("reply submitted")
      setReplyIndex(null)
      RefetchComments()
      
      

    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };




  return (
    <>



      <div className="bg-gray-950 p-5 flex justify-center items-center min-h-screen ">
        <div className="md:w-3/5 w-full flex flex-col gap-2 p-5 bg-gray-800 text-white">
          <h1 className="text-lg">Reviews</h1>
          <div className="flex flex-col gap-3 ">
            {review?.map((review: any, index: any) => (
              <div key={review._id} className="flex flex-col gap-4 bg-gray-700 p-4">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 text-center rounded-full bg-red-500">{review?.userId?.name ? review.userId.name.charAt(0) : ''}</div>
                    <span>{review?.userId?.name}</span>
                  </div>
                  <div className="flex p-1 gap-1 text-orange-300">
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <div>{review.comments}</div>
                <div className="flex justify-between">
                  <span>{format(review.createdAt)}</span>
                  {Array.isArray(review.commentreplies) && review.commentreplies.length > 0 && (
                    <span>Reply submitted</span>

                  )}
                  {
                    
                      Array.isArray(review.commentreplies) && review.commentreplies.length === 0 && (
                      <button
                        className="p-1 px-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 rounded-xl bg-opacity-60"
                        onClick={() => handleToggleReply(index)}
                      >
                        <FaReply />
                      </button>
                    )
                  }
                </div>
                {replyIndex === index && (
                  <div>
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="w-full bg-black text-white p-2 rounded-md border border-gray-700"
                      placeholder="Type your reply..."
                    />
                    <button
                      onClick={() => handleReplySubmit(review._id)}
                      className="bg-gray-900 hover:bg-gray-950 text-white px-3 py-2 rounded-md mt-2"
                    >
                      Submit Reply
                    </button>
                  </div>
                )}
              </div>
            ))}


          </div>
        </div>
      </div>
    </>


  )
}

export default CommentReplies
