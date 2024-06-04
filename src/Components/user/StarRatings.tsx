/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect} from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
type Prop={
    initialValue:any
    editRating:any 
    setEditRating: (editRating: any)=>void
}
const StarRatings:FC<Prop> = ({ initialValue,editRating,setEditRating }) => {
    useEffect(() => {
        setEditRating(initialValue);
    }, [initialValue, setEditRating]);

    return (
        <div className="flex w-full ml-2 pb-3">
            {[1, 2, 3, 4, 5].map((i) =>
                editRating >= i ? (
                    <AiFillStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setEditRating(i)}
                    />
                ) : (
                    <AiOutlineStar
                        key={i}
                        className="mr-1 cursor-pointer"
                        color="rgb(246,186,0)"
                        size={25}
                        onClick={() => setEditRating(i)}
                    />
                )
            )}
        </div>
    );
};

export default StarRatings;