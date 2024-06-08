/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */


import React, { useEffect, useState } from 'react'
import { BarChart, Bar, ResponsiveContainer, XAxis, Label, YAxis, LabelList } from 'recharts'
import { CourseAnalysis } from '@/Api/admin'

const CourseAnalytics: React.FC = () => {

    const [data, setData] = useState([])

    
    const courseAanalytics = async () => {
        try {
            const response = await CourseAnalysis()
            if (response?.data.success) {
                setData(response.data.course)
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        courseAanalytics();
    }, [])

    const analyticsData: any = [];


    data &&
        data.forEach((item: any) => {
            analyticsData.push({ name: item.month, uv: item.count })
        })

    const minValue = 0

    return (
        <div className='height-[50px] pt-5'>
            <div className="h-[80vh] ">
                <div>
                    <h1 className="font-bold text-[1.5rem] text-gray-500 ps-24 px-4">
                        Courses Analytics
                    </h1>
                    <p className="font-bold text-[1rem] text-gray-500 ps-24 px-5 ">
                        Last 12 months data of  courses created in each month
                    </p>
                </div>
                <div className="w-full h-[90%] flex items-center justify-center">
                    <ResponsiveContainer width="95%" height="50%">
                        <BarChart width={150} height={300} data={analyticsData}>
                            <XAxis dataKey="name">
                                <Label offset={0} position={"insideBottom"} />
                            </XAxis>
                            <YAxis domain={[minValue, "auto"]} />
                            <Bar dataKey="uv" fill="#3faf82">
                                <LabelList dataKey="uv" position="top" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default CourseAnalytics



