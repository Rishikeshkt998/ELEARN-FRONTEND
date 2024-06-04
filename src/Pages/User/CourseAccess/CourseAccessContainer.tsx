import CourseContent from "@/Components/user/CourseContent"
import { useParams } from "react-router-dom";


const CourseAccessContainer = () => {
const { id } = useParams();
console.log(id)
  return (
    <div>
        <CourseContent id={id}/>
      
    </div>
  )
}

export default CourseAccessContainer
