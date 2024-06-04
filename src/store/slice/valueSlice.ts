/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface User {
    _id?: string;
    name: string;
    email: string;
    password: string,
    phone?: string,
    profileimage?: any;
    otp?: string;
    isVerified?: boolean,
    isBlocked?: boolean,
    courseIds?: [],
    createdAt?: Date

}
interface Admin {
    _id?: string;
    email: string;
    password: string;

}
interface Trainer {
    _id?: string,
    name: string,
    email: string,
    password: string,
    dateOfBirth?: Date,
    image?: string,
    phone?: string,
    otp?: string;
    isBlocked?: boolean,
    isVerified?: boolean,
    creationTime?: Date,

}


const initialState = {
    userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null,
    courseData: localStorage.getItem('courseData') ? JSON.parse(localStorage.getItem('courseData') as string) : null,
    tutorData: localStorage.getItem('tutorData') ? JSON.parse(localStorage.getItem('tutorData') as string) : null,
}



const valueSlice = createSlice({
    name: "value",
    initialState,
    reducers: {
        SaveUser: (state, action: PayloadAction<User>) => {
            state.userData= action.payload
            localStorage.setItem('userData', JSON.stringify(action.payload))
        },
        saveCourse: (state, action: PayloadAction<Admin>) => {
            state.courseData = action.payload
            localStorage.setItem('courseData', JSON.stringify(action.payload))
        },
        saveTutor: (state, action: PayloadAction<Trainer>) => {
            state.tutorData = action.payload
            localStorage.setItem('tutorData', JSON.stringify(action.payload))
        },
        resetUser: (state) => {
            state.userData = null
            localStorage.removeItem('userData')
        },
        resetCourse: (state) => {
            state.courseData = null
            localStorage.removeItem('courseData')
        },
        resetTutor: (state) => {
            state.tutorData = null
            localStorage.removeItem('tutorData')
        },
    },
});

export default valueSlice.reducer;
export const { SaveUser, saveCourse, saveTutor, resetUser, resetCourse, resetTutor } = valueSlice.actions;