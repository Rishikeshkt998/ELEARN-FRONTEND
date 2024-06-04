import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import valueReducer from './slice/valueSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        value: valueReducer

    }
})
export default store







