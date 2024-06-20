/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { getWhishlist } from '@/Api/user'
// import Footer from '@/Components/common/UserCommon/Footer'
// import NavBar from '@/Components/common/UserCommon/Navbar'
// import CardFavourites from '@/Components/user/CardFavourites'
// import { useEffect, useState } from 'react'

// const Whishlistcontainer = () => {
//     const [whishlist, setWhishlist] = useState<any>()
//     const userId = localStorage.getItem('userId');
//     useEffect(() => {
//         const fetchWhishlist = async () => {
//             try {
//                 const response = await getWhishlist(userId);
//                 console.log(response?.data.favourites);
//                 setWhishlist(response?.data.favourites);
//             } catch (error) {
//                 console.error('Error fetching categories:', error);
//             }
//         };
//         fetchWhishlist();
//     }, []);

//     return (
//         <>
//             <NavBar />
//             <div className="min-h-screen h-full bg-[#E9F8F3B2] text-center">
//                 <h1 className='py-3 pt-11 text-3xl font-bold'><span className='text-[#20B486]'>Whishlist</span></h1>
//                 <div className="grid   md:grid-cols-3 gap-4 justify-items-center py-10">  
//                     {whishlist && whishlist.favourites?.length > 0 ? (
//                       whishlist.favourites?.map((course:any) => (
//                           <CardFavourites course={course}  />
                        
//                       ))
//                   ) : (
//                       <h1 className="font-bold">No Favourites</h1>
//                   )}
//                 </div>
//             </div>
//             <Footer darkMode={false} />
//         </>
//     )
// }

// export default Whishlistcontainer
import { getWhishlist } from '@/Api/user';
import Footer from '@/Components/common/UserCommon/Footer';
import NavBar from '@/Components/common/UserCommon/Navbar';
import CardFavourites from '@/Components/user/CardFavourites';
import { useEffect, useState } from 'react';

const Whishlistcontainer = () => {
    const [whishlist, setWhishlist] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 6; // Adjust this number as needed
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchWhishlist = async () => {
            try {
                const response = await getWhishlist(userId);
                console.log(response?.data.favourites);
                setWhishlist(response?.data.favourites.favourites);
            } catch (error) {
                console.error('Error fetching wishlist:', error);
            }
        };
        fetchWhishlist();
    }, [userId]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = whishlist.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            <NavBar />
            <div className="min-h-screen h-full pb-16 bg-[#E9F8F3B2] text-center">
                <h1 className='py-3 pt-11 text-3xl font-bold'>
                    <span className='text-[#20B486]'>Wishlist</span>
                </h1>
                <div className="grid md:grid-cols-3 gap-4 justify-items-center py-10">
                    {currentItems.length > 0 ? (
                        currentItems.map((course: any) => (
                            <CardFavourites key={course._id} course={course} />
                        ))
                    ) : (
                        <h1 className="font-bold">No Favourites</h1>
                    )}
                </div>
                <div className="flex justify-center mt-4">
                    <ul className="flex space-x-4">
                        {[...Array(Math.ceil(whishlist.length / itemsPerPage)).keys()].map(number => (
                            <li key={number}>
                                <button
                                    onClick={() => paginate(number + 1)}
                                    className={`px-3 py-1 rounded ${number + 1 === currentPage
                                        ? 'bg-indigo-500 text-white'
                                        : 'text-gray-500 hover:bg-gray-300'
                                        }`}
                                >
                                    {number + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer darkMode={false} />
        </>
    );
}

export default Whishlistcontainer;