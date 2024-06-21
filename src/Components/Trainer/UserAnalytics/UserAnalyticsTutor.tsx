/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserAnalysisForTutor } from "@/Api/trainer";
import React, { useEffect, useState } from "react";
import {
    ResponsiveContainer,
    XAxis,
    YAxis,
    AreaChart,
    Area,
    Tooltip,
} from "recharts";

type Props = {
    isDashboard?: boolean;
};

const UserAnalyticsTutor: React.FC<Props> = ({ isDashboard }) => {
    const [data, setData] = useState([]);
    const id = localStorage.getItem('trainerId');
    const userAanalytics = async () => {
        try {
            const response = await UserAnalysisForTutor(id)
            if (response?.data.success) {
                setData(response.data.user);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        userAanalytics();
    }, []);

    const analyticsData: any = [];

    data &&
        data.forEach((item: any) => {
            analyticsData.push({ name: item.month, count: item.count });
        });

    return (
        <>
            <div
                className={`${!isDashboard ? "mt-[0px]" : "mt-[0px] shadow-sm pb-5 rounded-sm"
                    } bg-gray-900`}
            >
                <div className="ps-20">
                    <h1 className="font-bold text-[1.5rem] text-gray-500 px-4">
                        Students Analytics
                    </h1>
                    <p className="font-bold text-[1rem] text-gray-500 px-5 mb-8">
                        Last 12 months analytics data of Total students enrolled the course
                    </p>
                </div>
                <div
                    className={`w-full ${isDashboard ? "h-[30vh]" : "h-screen"
                        } flex items-center justify-center bg-gray-900`}
                >
                    <ResponsiveContainer
                        width={isDashboard ? "90%" : "90%"}
                        height={!isDashboard ? "50%" : "100%"}
                    >
                        <AreaChart
                            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                            data={analyticsData}
                        >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="count"
                                stroke="#4d62d9"
                                fill="#4d62d9"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
};

export default UserAnalyticsTutor;