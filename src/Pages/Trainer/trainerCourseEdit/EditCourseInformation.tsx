
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadS3Bucket } from "@/Services/S3bucket";
import { FC, useState } from "react";
import ReactPlayer from "react-player";
import * as Yup from 'yup'

type Props = {
    courseInfo: any;
    setCourseInfo: (courseInfo: any) => void,
    active: number;
    setActive: (active: number) => void;
    loading: boolean;
    setLoading: (loading: boolean) => void
 
}

const EditCourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive ,setLoading }) => {
    const [dragging, setDragging] = useState(false)
    const [errors, setErrors] = useState<any>({});
    const validationSchema = Yup.object({
        name: Yup.string().required("Course Title is required"),
        description: Yup.string().required("Description is required").min(8, "Description must be at least 8 characters"),
        price: Yup.number()
            .typeError("Price must be a number").min(2, "Price must be at least 2 digits")
            .required("Price is required"),
        estimatedPrice: Yup.number()
            .typeError("Price must be a number").min(2, "Estimated price must be at least 2 digits")
            .required("Estimated price is required"),
        tags: Yup.string().required("Tags is required"),
        category: Yup.string().required("category is required"),
        level: Yup.string().required("Course level is required").typeError("Level must be a number"),
        thumbnail: Yup.mixed().required("Thumbnail is required"),
        demoUrl: Yup.mixed().required("Demo Url is required"),
    });

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        // setActive(active + 1)
        try {
            await validationSchema.validate(courseInfo, { abortEarly: false });
            setActive(active + 1);
        } catch (error: any) {

            const newError: { [key: string]: string } = {};

            error.inner.forEach((err: any) => {
                newError[err.path] = err.message;
            });
            setErrors(newError);
        }

    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleFileChange = (e: any) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setCourseInfo({ ...courseInfo, thumbnail: reader.result })
                }
            }
            reader.readAsDataURL(file)
        }

    }
    const handleDragOver = (e: any) => {
        e.preventDefault()
        setDragging(true)
    }
    const handleDragLeave = (e: any) => {
        e.preventDefault()
        setDragging(false)
    }
    const handleDrop = (e: any) => {
        e.preventDefault()
        setDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setCourseInfo({ ...courseInfo, thumbnail: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }
    const handleDemoUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                setLoading(true);
                const url = await UploadS3Bucket(file);
                console.log(url)
                setCourseInfo({ ...courseInfo, demoUrl: url.url });
                setLoading(false);
            } catch (error) {
                console.error("Error uploading demo URL:", error);
                setLoading(false);
            }
        }
    };
    return (
        <div className="w-[80%] m-auto mt-24">
            <form onSubmit={handleSubmit} className="text-white">
                <div>
                    <label htmlFor="name" className="block">
                        Course Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={courseInfo.name}
                        onChange={(e) => setCourseInfo({ ...courseInfo, name: e.target.value })}
                        placeholder="mernstack lms platform"
                        className="bg-gray-800 text-white border border-gray-600  px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.name && <span className="error text-red-500">{errors.name}</span>}
                </div>
                <br />
                <div className="mb-5">
                    <label className="block"> Course Description</label>
                    <textarea className="bg-gray-800 text-white border border-gray-600  px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300" name="" id="" cols={30} rows={5} value={courseInfo.description} onChange={(e: any) => setCourseInfo({ ...courseInfo, description: e.target.value })} placeholder="write something else"></textarea>
                    {errors.description && <span className="error text-red-500">{errors.description}</span>}
                </div>
                <br />
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label htmlFor="price" className="block">
                            Price
                        </label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            required
                            value={courseInfo.price}
                            onChange={(e) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                            placeholder="29"
                            className="bg-gray-800 text-white border border-gray-600   w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                        {errors.price && <span className="error text-red-500">{errors.price}</span>}

                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="estimatedPrice" className="block">
                            estimatedPrice
                        </label>
                        <input
                            type="text"
                            id="estimatedPrice"
                            name="estimatedPrice"
                            required
                            value={courseInfo.estimatedPrice}
                            onChange={(e) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
                            placeholder="79"
                            className="bg-gray-800 text-white border border-gray-600   w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                        {errors.estimatedPrice && <span className="error text-red-500">{errors.estimatedPrice}</span>}

                    </div>

                </div>
                <br />
                <div>
                    <label htmlFor="tags" className="block">
                        Tags
                    </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        required
                        value={courseInfo.tags}
                        onChange={(e) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
                        placeholder="Mern,Tailwind Css,Lms"
                        className="bg-gray-800 text-white border border-gray-600  px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.tags && <span className="error text-red-500">{errors.tags}</span>}
                </div>
                <br />
                <div>
                    <label htmlFor="demoUrl" className="block">
                        demoUrl
                    </label>
                    <div className="sm:w-96">
                       
                        <ReactPlayer width={590} url={courseInfo.demoUrl} controls />
                        

                    </div>
                    <input
                        type="file"
                        id="demoUrl"
                        name="demoUrl"
                        onChange={handleDemoUrlChange}
                        
                        // value={courseInfo.demoUrl}
                        // onChange={(e) => setCourseInfo({ ...courseInfo, demoUrl: e.target.value })}
                        placeholder="demoUrl"
                        className="bg-gray-800 text-white border border-gray-600  px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                    {errors.demoUrl && <span className="error text-red-500">{errors.demoUrl}</span>}
                </div>
                <br />
                <div className="w-full flex justify-between">
                    <div className="w-[45%]">
                        <label htmlFor="level" className="block">
                            level
                        </label>
                        <input
                            type="text"
                            id="level"
                            name="level"
                            required
                            
                            value={courseInfo.level}
                            onChange={(e) => setCourseInfo({ ...courseInfo, level: e.target.value })}
                            placeholder="29"
                            className="bg-gray-800 text-white border border-gray-600   w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                        {errors.level && <span className="error text-red-500">{errors.level}</span>}

                    </div>
                    <div className="w-[50%]">
                        <label htmlFor="estimatedPrice" className="block">
                            category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            required
                            value={courseInfo.category}
                            onChange={(e) => setCourseInfo({ ...courseInfo, category: e.target.value })}
                            placeholder="79"
                            className="bg-gray-800 text-white border border-gray-600   w-full focus:outline-none focus:ring focus:border-blue-300"
                        />
                        {errors.category && <span className="error text-red-500">{errors.category}</span>}

                    </div>


                </div>
                <br />
                <div className="w-full">
                    <input
                        type="file"
                        id="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        
                    />
                    <label
                        htmlFor="file"
                        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {courseInfo.thumbnail ? (
                            <img src={courseInfo.thumbnail} alt="" className="max-h-full w-full object-cover" />
                        ) : (
                            <span className="text-white">
                                Drag and Drop your thumbnail here or click to browse
                            </span>
                        )}
                    </label>
                </div>
                <br />
                <div className="w-full  flex items-center justify-end">
                    <input
                        type="submit"
                        value="next"
                        className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-[#fff] rounded mt-8 cursor-pointer" />
                </div>
                <br />
                <br />

            </form>

        </div>
    )
}

export default EditCourseInformation