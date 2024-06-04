import { FC, useEffect} from "react"

/* eslint-disable @typescript-eslint/no-explicit-any */
type Prop = {
    initialValue: any
    editReviews: any
    setEditReviews: (editRating: any) => void
}

const TextArea: FC<Prop> = ({ initialValue, editReviews, setEditReviews }) => {

    useEffect(() => {
        setEditReviews(initialValue);
    }, [initialValue, setEditReviews]);
    return (
        <div>
            <textarea
                name=""
                value={editReviews}
                onChange={(e) =>

                    setEditReviews(e.target.value)
                }



                id=""
                cols={40}
                rows={5}
                placeholder="write your content"
                className="outline-none bg-gray-100 800px:ml-3 border border-[#ffffff57]  w-full 800px:w-full p-2 rounded text-[18px] font-Poppins"
            />

        </div>
    )
}

export default TextArea
