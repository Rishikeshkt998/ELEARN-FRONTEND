/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrderAnalysisForTutor } from "@/Api/trainer";
import React, { useEffect, useState } from "react";
import { ResponsiveContainer, XAxis, YAxis, LineChart, CartesianGrid, Tooltip, Legend, Line } from 'recharts'

type Props = {
    isDashboard?: boolean;
};

const OrderAnalyticsTutor: React.FC<Props> = ({ isDashboard }) => {
    const [data, setData] = useState([]);

    // const analyticsData = [
    //   { name: "Jun 2023", uv: 3 },
    //   { name: "July 2023", uv: 2 },
    //   { name: "August 2023", uv: 5 },
    //   { name: "Sept 2023", uv: 7 },
    //   { name: "October 2023", uv: 2 },
    //   { name: "Nov 2023", uv: 5 },
    //   { name: "December 2023", uv: 7 },
    // ];

    const orderAanalytics = async () => {
        try {
            const id = localStorage.getItem('trainerId');

            const response = await OrderAnalysisForTutor(id)
            if (response?.data.success) {
                setData(response.data.order);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        orderAanalytics();
    }, []);

    const analyticsData: any = [];

    data &&
        data.forEach((item: any) => {
            analyticsData.push({ name: item.month, count: item.count });
        });


    return (
        <div className="height-[50px] bg-gray-900">
            <div className="h-[33vh] bg-gray-900">
                <div className="ps-20 bg-gray-900">
                    <h1 className="font-bold text-[2rem] text-gray-500 px-4">
                        Orders Analytics
                    </h1>
                    <p className="font-bold text-[1rem] text-gray-500 px-5 mb-8">
                        Last 12 months analytics data of total orders by the enrolled students
                    </p>
                </div>
                <div className="w-full h-[90%] flex items-center justify-center bg-gray-900">
                    <ResponsiveContainer
                        width={isDashboard ? "90%" : "90%"}
                        height={isDashboard ? "100%" : "50%"}
                    >
                        <LineChart
                            width={500}
                            height={300}
                            data={analyticsData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            {!isDashboard && <Legend />}
                            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default OrderAnalyticsTutor;