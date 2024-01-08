import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { DispatchType, RootState } from '../configStore';
import axios from 'axios'
import { DOMAIN, GROUP, STATUS_CODE, http } from '../../utils/settings/config';
import { setLoading } from './LoadingReducer';
import { openNotificationWithIcon } from '../../utils/lib/Nontification';
import { history } from '../../utils/lib/libs';


export type DanhSachBannerModel= {
    maBanner: number;
    maPhim:   number;
    hinhAnh:  string;
    trailer:string;
    tenPhim:string;
}

export interface PhimDetailModel {
    heThongRapChieu: HeThongRapChieu[];
    maPhim:          number;
    tenPhim:         string;
    biDanh:          string;
    trailer:         string;
    hinhAnh:         string;
    moTa:            string;
    maNhom:          string;
    hot:             boolean;
    dangChieu:       boolean;
    sapChieu:        boolean;
    ngayKhoiChieu:   Date;
    danhGia:         number;
}
export type EditPhimModel={
    maPhim:          number | undefined;
    tenPhim:         string | undefined;
    biDanh:          string | undefined;
    trailer:         string | undefined;
    hinhAnh:         string | undefined;
    moTa:            string | undefined;
    maNhom:          string | undefined;
    hot:             boolean | undefined;
    dangChieu:       boolean | undefined;
    sapChieu:        boolean | undefined;
    ngayKhoiChieu:   Date | undefined;
    danhGia:         number | undefined;
}


export interface HeThongRapChieu {
    cumRapChieu:   CumRapChieu[];
    maHeThongRap:  string;
    tenHeThongRap: string;
    logo:          string;
}

export interface CumRapChieu {
    lichChieuPhim: LichChieuPhim[];
    maCumRap:      string;
    tenCumRap:     string;
    hinhAnh:       string;
    diaChi:        string;
}

export interface LichChieuPhim {
    maLichChieu:       string;
    maRap:             string;
    tenRap:            string;
    ngayChieuGioChieu: Date;
    giaVe:             number;
    thoiLuong:         number;
}

export type DanhSachPhimModel={
    maPhim:        number;
    tenPhim:       string;
    biDanh:        string;
    trailer:       string;
    hinhAnh:       string;
    moTa:          string;
    maNhom:        string;
    ngayKhoiChieu: Date;
    danhGia:       number;
    hot:           boolean;
    dangChieu:     boolean;
    sapChieu:      boolean;
}
export type FilmState={
    danhSachBanner:DanhSachBannerModel[];
    danhSachPhim:DanhSachPhimModel[];
    phimDetail:PhimDetailModel |null ;
    danhSachPhimMange:DanhSachPhimModel[];
    phimEdit:PhimDetailModel | null;
    danhSachDetailBanner:PhimDetailModel[]
}

const initialState:FilmState = {
    danhSachBanner:[],
    danhSachPhim:[],
    phimDetail: null,
    danhSachPhimMange:[],
    phimEdit:null,
    danhSachDetailBanner:[]
}

const QuanLyPhimReducer = createSlice({
  name: 'QuanLyPhimReducer',
  initialState,
  reducers: {
    setDanhSachBanner:(state:FilmState, action:PayloadAction<DanhSachBannerModel[]>)=>{
        state.danhSachBanner=action.payload
    }
  },
  extraReducers(builder){
    builder.addCase(getDanhSacPhimApi.fulfilled,(state:FilmState, action:PayloadAction<DanhSachPhimModel[]>)=>{
        state.danhSachPhim=action.payload
    })
    builder.addCase(getPhimDetailApi.fulfilled,(state:FilmState, action:PayloadAction<PhimDetailModel>)=>{
        state.phimDetail=action.payload
    })
    builder.addCase(getDanhSacPhimManageApi.fulfilled,(state:FilmState, action:PayloadAction<DanhSachPhimModel[]>)=>{
        state.danhSachPhimMange=action.payload
    })
    builder.addCase(getFilmEditApi.fulfilled,(state:FilmState, action:PayloadAction<PhimDetailModel>)=>{
        state.phimEdit=action.payload
    })
  }
});

export const {setDanhSachBanner} = QuanLyPhimReducer.actions

export default QuanLyPhimReducer.reducer

export const setDanhSachBannerApi=()=>{
    return async (dispatch:DispatchType)=>{
        try {
            const {data, status}= await axios({
                url:`${DOMAIN}QuanLyPhim/LayDanhSachBanner`,
                method:"GET"
            })
            let arrDetailBanner:any=[]
            let objDetailBanner:any={};
            for(const i in data.content){
                const result= await http.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${data.content[i].maPhim}`)
                if((await result).status===STATUS_CODE.SUCCESS){
                    objDetailBanner={...data.content[i],trailer:result.data.content.trailer,tenPhim:result.data.content.tenPhim}
                    arrDetailBanner.push(objDetailBanner);
                }
            }
            const content:DanhSachBannerModel[]=arrDetailBanner;
            const action:PayloadAction<DanhSachBannerModel[]>=setDanhSachBanner(content);
            dispatch(action)
        } catch (error) {
            console.log(error)
        }
    }
}

export const getDanhSacPhimApi=createAsyncThunk("QuanLyPhimReducer/getDanhSachPhimApi", 
    async (trangThai:boolean)=>{
        const response= await http.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}`)
        console.log(trangThai)
        return response.data.content.filter((phim:any)=> phim.dangChieu===trangThai)
    }
)

export const getPhimDetailApi=createAsyncThunk('QuanLyPhimReducer/getPhimDetailApi',
    async (id:string | undefined , {dispatch})=>{
        const result=await http.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);
        await dispatch(setLoading(true))
        if(result.status===STATUS_CODE.SUCCESS){
            setTimeout(async()=>{
               await dispatch(setLoading(false))
            },2000)
          }  
        return result.data.content;
    }
)

export const getDanhSacPhimManageApi=createAsyncThunk("QuanLyPhimReducer/getDanhSacPhimManageApi", 
    async (key:string)=>{
        if(key!==''){
            const response= await http.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}&tenPhim=${key}`)
            return response.data.content;
        }
        const result= await http.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${GROUP}`)
        return result.data.content;
    }
)

export const getFilmEditApi=createAsyncThunk('QuanLyPhimReducer/getFilmEditApi',
    async (id:string | undefined , {dispatch})=>{
        const result=await http.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`);
        // await dispatch(setLoading(true))
        if(result.status===STATUS_CODE.SUCCESS){
            setTimeout(async()=>{
               await dispatch(setLoading(false))
            },2000)
          }  
        return result.data.content;
    }
)

export const updateFilmApi=createAsyncThunk('QuanLyPhimReducer/updateFilmApi',
    async (formData:any, {dispatch})=>{
        dispatch(setLoading(true))
        const result= await http.post('QuanLyPhim/CapNhatPhimUpload', formData);
        if(result.status===STATUS_CODE.SUCCESS){
            dispatch(setLoading(false));
            openNotificationWithIcon('success', 'Cập nhật thành công !');
            history.push("/manage/manageFilm")
        }
    }
)

export const addFilmAip=createAsyncThunk('QuanLyPhimReducer/addFilmApi',
    async (formData:any,{dispatch})=>{
        dispatch(setLoading(true))
        const result = await http.post('QuanLyPhim/ThemPhimUploadHinh',formData);
        if(result.status===STATUS_CODE.SUCCESS){
            dispatch(setLoading(false));
            openNotificationWithIcon('success','Thêm phim thành công !');
            history.push("/manage/manageFilm");
        }
        dispatch(setLoading(false))
    }
)

export const deleteFilmApi=createAsyncThunk('QuanLyPhimReducer/deleteFilmApi',
    async(idFilm:number, {dispatch})=>{
        dispatch(setLoading(true));
        const result = await http.delete(`QuanLyPhim/XoaPhim?MaPhim=${idFilm}`)
        if(result.status===STATUS_CODE.SUCCESS){
            dispatch(setLoading(false));
            openNotificationWithIcon('success','Xóa phim thành công !');
            dispatch(getDanhSacPhimManageApi(''))
        }
        dispatch(setLoading(false))
    }
)
