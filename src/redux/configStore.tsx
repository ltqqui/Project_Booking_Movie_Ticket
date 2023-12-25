import { configureStore } from "@reduxjs/toolkit";
import QuanLyPhimReducer from "./reducer/QuanLyPhimReducer";
import QuanLyRapReducer from "./reducer/QuanLyRapReducer";
import QuanLyNguoiDungReducer from "./reducer/QuanLyNguoiDungReducer";
import LoadingReducer from "./reducer/LoadingReducer";
import QuanLyVeReducer from "./reducer/QuanLyVeReducer";

export const store =configureStore({
    reducer:{
        QuanLyPhimReducer,
        QuanLyRapReducer,
        QuanLyNguoiDungReducer,
        LoadingReducer,
        QuanLyVeReducer
    }
})


export type RootState= ReturnType <typeof store.getState>;
export type DispatchType = typeof store.dispatch;