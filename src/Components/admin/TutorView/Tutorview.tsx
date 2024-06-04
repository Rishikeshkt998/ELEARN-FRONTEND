
// import { useState, useEffect, FC } from 'react';
// import { getTrainers, unverifyTrainer, verifytrainer } from '../../Api/admin';


// interface Trainer {
//     id: string;
//     name: string;
//     email: string;
//     password: string;
//     phone?: string;
//     dateOfBirth?: unknown;
//     isVerified?: boolean;
//     isBlocked?: boolean;
// }

// const Tutorview: FC = () => {
//     const [data, setData] = useState<Trainer[]>([]);

//     useEffect(() => {
      
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             // Fetch trainers data from API
//             const response = await getTrainers();
//             if (response && response.data.findedtrainer) {
//                 setData(response.data.findedtrainer);
//             }
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };
    
//     const toggleVerification = async (id: string) => {
//         try {
//             const trainer = data.find(trainer => trainer.id === id);
//             if (!trainer) return;

//             if (trainer.isVerified) {
              
//                 await unverifyTrainer(id)
//             } else {

//                 await verifytrainer(id)
//             }


//             setData(prevData =>
//                 prevData.map(item =>
//                     item.id === id ? { ...item, isVerified: !item.isVerified } : item
//                 )
//             );
//         } catch (error) {
//             console.error('Error toggling verification status:', error);
//         }
//     };

//     return (
//         <div className="relative p-11 overflow-x-auto bg-white">
//             <table className="w-full text-sm text-left rtl-text-right text-gray-700 dark-text-gray-400">
//                 <thead className="text-xs text-gray-500 uppercase bg-gray-800 dark-bg-gray-700 dark-text-gray-400">
//                     <tr>
//                         <th scope="col" className="px-6 py-3">
//                             Name
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             Email
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             Phone
//                         </th>
//                         <th scope="col" className="px-6 py-3">
//                             Actions
//                         </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((trainer) => (
//                         <tr key={trainer.id} className="bg-gray-100 border-b dark-bg-gray-800 dark-border-gray-700">
//                             <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark-text-white">
//                                 {trainer.name}
//                             </td>
//                             <td className="px-6 py-4">
//                                 {trainer.email}
//                             </td>
//                             <td className="px-6 py-4">
//                                 {trainer.phone}
//                             </td>
//                             <td className="px-6 py-4">
//                                 <button onClick={() => toggleVerification(trainer.id)} className={`px-4 py-2 text-white rounded hover:bg-${trainer.isVerified ? 'red' : 'blue'}-600 bg-${trainer.isVerified ? 'red' : 'blue'}-500`}>
//                                     {trainer.isVerified ? 'Unverify' : 'Verify'}
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default Tutorview;
import { useState, useEffect, FC } from 'react';
import { getTrainers, unverifyTrainer, verifytrainer } from '../../../Api/admin';
import Swal from 'sweetalert2';

interface Trainer {
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    dateOfBirth?: unknown;
    isVerified?: boolean;
    isBlocked?: boolean;
}

const Tutorview: FC = () => {
    const [data, setData] = useState<Trainer[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // Fetch trainers data from API
            const response = await getTrainers();
            if (response && response.data.findedtrainer) {
                setData(response.data.findedtrainer);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const toggleVerification = async (id: string) => {
        try {
            const trainer = data.find(trainer => trainer.id === id);
            if (!trainer) return;

            const result = await Swal.fire({
                title: 'Confirmation',
                text: trainer.isVerified ? 'Are you sure you want to unverify this trainer?' : 'Are you sure you want to verify this trainer?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            });

            if (result.isConfirmed) {
                if (trainer.isVerified) {
                    await unverifyTrainer(id);
                } else {
                    await verifytrainer(id);
                }

                setData(prevData =>
                    prevData.map(item =>
                        item.id === id ? { ...item, isVerified: !item.isVerified } : item
                    )
                );

                Swal.fire(
                    'Success!',
                    `Trainer has been ${trainer.isVerified ? 'unverified' : 'verified'}.`,
                    'success'
                );
            }
        } catch (error) {
            console.error('Error toggling verification status:', error);
            Swal.fire(
                'Error!',
                'An error occurred while toggling trainer verification status.',
                'error'
            );
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
                    {data.map((trainer) => (
                        <tr key={trainer.id} className="bg-gray-100 border-b dark-bg-gray-800 dark-border-gray-700">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark-text-white">
                                {trainer.name}
                            </td>
                            <td className="px-6 py-4">
                                {trainer.email}
                            </td>
                            <td className="px-6 py-4">
                                {trainer.phone}
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => toggleVerification(trainer.id)} className={`px-4 py-2 text-white rounded hover:bg-${trainer.isVerified ? 'red' : 'blue'}-600 bg-${trainer.isVerified ? 'red' : 'blue'}-500`}>
                                    {trainer.isVerified ? 'Unverify' : 'Verify'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tutorview;

