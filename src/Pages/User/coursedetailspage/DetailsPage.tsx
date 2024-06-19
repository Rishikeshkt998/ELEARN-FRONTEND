import { useParams } from "react-router-dom";
import CourseDetailsPage from "./CourseDetailsPage"


const DetailsPage = () => {
const { id } = useParams();
console.log("ids",id)
  return (
    <div>
        <CourseDetailsPage id={id}/>
      
    </div>
  )
}

export default DetailsPage
