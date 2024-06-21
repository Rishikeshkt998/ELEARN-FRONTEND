/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchEnrolledStudentsForPurchase } from '@/Api/user';
import React, { useEffect, useState } from 'react';

const PurchaseHistory: React.FC = () => {
    const [history, setHistory] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; 
    const userId = localStorage.getItem('userId') as string | null;
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2,
        }).format(price);
    };
    useEffect(() => {
        const getEnrollments = async () => {
            try {
                const response = await fetchEnrolledStudentsForPurchase(userId)
                console.log(response?.data)
                if (response !== null) {
                    setHistory(response?.data?.EnrolledCourses)
                }
            } catch (err) {
                console.log(err)
            }
        }
        getEnrollments()
    }, [userId]);

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Purchase History</h1>
                {history.length === 0 ? (
                    <div className="text-center text-gray-600 text-lg">
                        No purchases found.
                    </div>
                ) : (
                    <>
                        <div className="grid gap-6">
                            {currentItems.map((purchase: any, index: number) => (
                                <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                    <div className="px-6 py-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className="text-xl font-bold text-gray-800">{purchase?.courseId?.name}</h2>
                                            <span className="text-lg font-semibold text-green-600">{formatPrice(purchase?.courseId?.price)}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-4">{formatDate(purchase?.enrolledTime)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center mt-4">
                            {Array.from({ length: Math.ceil(history.length / itemsPerPage) }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-gray-300 hover:bg-gray-400 text-gray-700'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PurchaseHistory;