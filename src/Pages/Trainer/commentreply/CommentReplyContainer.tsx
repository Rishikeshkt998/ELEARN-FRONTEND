import CommentReplies from "@/Components/Trainer/commentReplies/CommentReplies"
import { useParams } from "react-router-dom"


const CommentReplyContainer = () => {
  const { id } = useParams()
  return (
    
    <div>
        <CommentReplies id={id}/>
      
    </div>
  )
}

export default CommentReplyContainer
