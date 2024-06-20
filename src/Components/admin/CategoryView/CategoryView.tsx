
import { useState, useEffect } from 'react';
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
    const [currentPage, setCurrentPage] = useState(1);
    const [categoriesPerPage] = useState(5); // Adjust the number of categories per page here

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await viewCategory();
                console.log(res?.data);
                setData(res?.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
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
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    // Get current categories
    const indexOfLastCategory = currentPage * categoriesPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
    const currentCategories = data.slice(indexOfFirstCategory, indexOfLastCategory);

    // Change page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="relative p-20 overflow-x-auto bg-white">
            <Link to="/admin/addcategory" className="absolute top-0 left-0 mt-4 ml-20 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                New Category
            </Link>
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-500 uppercase bg-gray-800">
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
                    {currentCategories.map((item) => (
                        <tr key={item.id} className="bg-gray-100 border-b">
                            <td className="px-6 py-4 font-medium text-gray-900">
                                {item.name}
                            </td>
                            <td className="px-6 py-4">
                                {item.description}
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => handleDelete(item.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                                    Delete
                                </button>
                                <Link to={`/admin/editcategory/${item.id}`} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2">
                                    Update
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center mt-4">
                {Array.from({ length: Math.ceil(data.length / categoriesPerPage) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CategoryView;