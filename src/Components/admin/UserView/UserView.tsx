
import { useState, useEffect } from 'react';
import { blockUser, getUsers, userUnblock } from '../../../Api/admin';
import Swal from 'sweetalert2';

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    profileimage?: unknown;
    otp?: string;
    isVerified?: boolean;
    isBlocked?: boolean;
}

const UserView = () => {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUsers();
                if (response) {
                    setData(response.data.findeduser);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            
        };
    }, []);

    const handleBlock = async (id: string) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await blockUser(id);
                    if (response?.data.success) {
                        setData(prevData =>
                            prevData.map(item =>
                                item.id === id ? { ...item, isBlocked: true } : item
                            )
                        );
                        Swal.fire({
                            title: "Success!",
                            text: "",
                            icon: "success"
                        });
                    }
                }
            });

        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };

    const handleUnblock = async (id: string) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await userUnblock(id)
                    if (response?.data.success) {
                        setData(prevData =>
                            prevData.map(item =>
                                item.id === id ? { ...item, isBlocked: false } : item
                            )
                        );
                        Swal.fire({
                            title: "Success!",
                            text: "",
                            icon: "success"
                        });
                    }
                }
            });
            await userUnblock(id)
        } catch (error) {
            console.error('Error unblocking user:', error);
        }
    };

    return (
        <div className="relative p-11 overflow-x-auto bg-white">
            <table className="w-full text-sm text-left rtl-text-right text-gray-700 dark-text-gray-400">
                <thead className="text-xs text-gray-500 uppercase bg-gray-800 dark-bg-gray-700 dark-text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((user) => (
                        <tr key={user.id} className="bg-gray-100 border-b dark-bg-gray-800 dark-border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark-text-white">
                                {user.name}
                            </td>
                            <td className="px-6 py-4">
                                {user.email}
                            </td>
                            <td className="px-6 py-4">
                                {user.phone}
                            </td>
                            <td className="px-6 py-4">
                                {user.isBlocked ? (
                                    <button onClick={() => handleUnblock(user.id)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Unblock</button>
                                ) : (
                                    <button onClick={() => handleBlock(user.id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Block</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserView;