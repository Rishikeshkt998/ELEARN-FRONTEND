/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWhishlist } from '@/Api/user'
import Footer from '@/Components/common/UserCommon/Footer'
import NavBar from '@/Components/common/UserCommon/Navbar'
import CardFavourites from '@/Components/user/CardFavourites'
import { useEffect, useState } from 'react'

const Whishlistcontainer = () => {
    const [whishlist, setWhishlist] = useState<any>()
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        const fetchWhishlist = async () => {
            try {
                const response = await getWhishlist(userId);
                console.log(response?.data.favourites);
                setWhishlist(response?.data.favourites);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchWhishlist();
    }, []);

    return (
        <>
            <NavBar />
            <div className="min-h-screen h-full bg-white text-center">
                <h1 className='text-4xl pt-12'>WhishList</h1>
                <div className="grid   md:grid-cols-3 gap-4 justify-items-center py-10">  
                    {whishlist && whishlist.favourites?.length > 0 ? (
                      whishlist.favourites?.map((course:any) => (
                          <CardFavourites course={course}  />
                        
                      ))
                  ) : (
                      <h1 className="font-bold">No Favourites</h1>
                  )}
                </div>
            </div>
            <Footer darkMode={false} />
        </>
    )
}

export default Whishlistcontainer