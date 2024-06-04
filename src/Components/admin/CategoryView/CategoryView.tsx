import { useState, useEffect } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { deleteCategory, viewCategory } from '../../../Api/admin';
import Swal from 'sweetalert2';

interface Category {
    id: number;
    name?: string;
    description?: string;
}


function CategoryView() {
    const [data, setData] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res =await viewCategory ()
                console.log(res?.data)
               
                console.log(data)
                setData(res?.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {

        };
    }, []);
    const handleDelete = async (id: number) => {
        try {
            const confirmDelete = await Swal.fire({
                title: 'Are you sure?',
                text: 'You will not be able to recover this category!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            });

            if (confirmDelete.isConfirmed) {
                
                await deleteCategory(id);
                setData(prevData => prevData.filter(item => item.id !== id));
                Swal.fire(
                    'Deleted!',
                    'Category has been deleted.',
                    'success'
                );
            }
            // await deleteCategory(id)
            // setData(prevData => prevData.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="relative p-20 overflow-x-auto  bg-white ">
            {/* <button className="absolute top-0 right-0 mt-4 mr-20 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">New Category</button> */}
            <Link to="/admin/addcategory" className="absolute top-0 left-0 mt-4 ml-20 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">New Category</Link>
            <table className="w-full   text-sm text-left rtl-text-right text-gray-700 dark-text-gray-400">
                <thead className="text-xs text-gray-500 uppercase bg-gray-800 dark-bg-gray-700 dark-text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Category name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data && data?.map((item) => (
                        <tr key={item.id} className="bg-gray-100 border-b dark-bg-gray-800 dark-border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark-text-white">
                                {item.name}
                            </td>
                            <td className="px-6 py-4">
                                {item.description}
                            </td>
                            <td className="px-6 py-4">

                               

                                <button onClick={() => handleDelete(item.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                                <Link to={`/admin/editcategory/${item.id}`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2">Update</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CategoryView