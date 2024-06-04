import { useParams } from "react-router-dom";
import CourseDetailsPage from "./CourseDetailsPage"


const DetailsPage = () => {
const { id } = useParams();
console.log(id)
  return (
    <div>
        <CourseDetailsPage id={id}/>
      
    </div>
  )
}

export default DetailsPage
