import { FC } from "react"
import ReactPlayer from 'react-player'
type Props={
    videoUrl:string,
    title:string
}

const CoursePlayer:FC<Props> = ({videoUrl}) => {
  return (
    <div style={{paddingTop:'2%',position:'relative'}}>
        
            <ReactPlayer url={videoUrl} controls={true}/>

        
          
      
    </div>
  )
}

export default CoursePlayer
