import { FC } from "react"
import ReactPlayer from 'react-player'
type Props = {
    videoUrl: string,
    title: string
}

const EditCoursePlayer: FC<Props> = ({ videoUrl }) => {
    return (
        <div style={{ paddingTop: '41%', position: 'relative' }}>
        
                <ReactPlayer url={videoUrl} controls={true} />

        </div>
    )
}

export default EditCoursePlayer