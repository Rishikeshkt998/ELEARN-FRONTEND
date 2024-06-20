/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Link } from "react-router-dom";



interface Props {
    course: any;
}

const CardFavourites: FC<Props> = ({ course }) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
        }).format(price);
    };
    
   
    return (
        <div className="max-w-screen-xl h-full mx-auto p-5 sm:p-10 md:p-16 ">
            <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10 rounded-lg">

                    <div className="rounded bg-white overflow-hidden shadow-lg w-80 h-96 flex flex-col">
                        <Link to={`/coursedetails/${course._id}`} key={course._id}>
                            <div className="relative h-48">
                                <img className="w-full h-full object-cover" src={course.thumbnail} alt="Course thumbnail" />
                                <div className="hover:bg-transparent transition duration-300 flex absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-0"></div>
                            </div>
                            <div className="px-6 py-4 flex-1">
                                <a href="#" className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out overflow-hidden whitespace-nowrap overflow-ellipsis" style={{ maxWidth: '100%' }}>{course.name}</a>
                                <p className="text-gray-500 text-sm">{course.category}</p>
                            </div>
                        </Link>
                        <div className="px-6 py-4 flex justify-between items-center">
                            <span className="font-semibold text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out">{formatPrice(course.price)}</span>
                            
                        </div>
                    </div>
            </div>
            
        </div>
    );
};

export default CardFavourites;