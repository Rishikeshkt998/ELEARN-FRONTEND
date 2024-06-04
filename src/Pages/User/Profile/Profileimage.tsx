/* eslint-disable @typescript-eslint/no-explicit-any */



import { FC} from 'react'


type Props={
    userDetails:any;


}
const Profileimage: FC <Props> = ({userDetails}) => {
    
    return (
        <div className="image overflow-hidden">
            <img className="h-auto w-full mx-auto"
                src={userDetails?.profileimage}
                alt="profile-pic" />
        </div>
    )
}

export default Profileimage
