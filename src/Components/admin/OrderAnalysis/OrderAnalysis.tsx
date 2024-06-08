/* eslint-disable @typescript-eslint/no-explicit-any */

import { OrderAnalysis } from "@/Api/admin";
import React, { useEffect, useState } from "react";
import { ResponsiveContainer, XAxis,  YAxis, LineChart, CartesianGrid, Tooltip, Legend, Line } from 'recharts'


type Props = {
    isDashboard?: boolean;
};

const OrderAnalytics: React.FC<Props> = ({ isDashboard }) => {
    const [data, setData] = useState([]);


    const orderAanalytics = async () => {
        try {
            const response = await OrderAnalysis()

            console.log("order",response)
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
        <div className="height-[50px]">
            <div className="h-[33vh]">
                <div>
                    <h1 className="font-bold text-[1.5rem] text-gray-500 ps-16 px-4">
                        Orders Analytics
                    </h1>
                    <p className="font-bold text-[1rem] text-gray-500 px-5 ps-16 mb-8">
                        Last 12 months analytics data of total orders
                    </p>
                </div>
                <div className="w-full h-[90%] flex items-center justify-center">
                    <ResponsiveContainer
                        width={isDashboard ? "100%" : "90%"}
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

export default OrderAnalytics;