import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ACCESS_TOKEN,
  STATUS_CODE,
  http,
  settings,
} from "../../utils/settings/config";
import { openNotificationWithIcon } from "../../utils/lib/Nontification";
import { setLoading } from "./LoadingReducer";
import { history } from "../../utils/lib/libs";

export type DanhSachPhongVeModel = {
  thongTinPhim: ThongTinPhim;
  danhSachGhe: DanhSachGhe[];
};

export type DanhSachGhe = {
  maGhe: number;
  tenGhe: string;
  maRap: number;
  loaiGhe: LoaiGhe;
  stt: string;
  giaVe: number;
  daDat: boolean;
  taiKhoanNguoiDat: null;
};
export enum LoaiGhe {
  Thuong = "Thuong",
  Vip = "Vip",
}

export type ThongTinPhim = {
  maLichChieu: number;
  tenCumRap: string;
  tenRap: string;
  diaChi: string;
  tenPhim: string;
  hinhAnh: string;
  ngayChieu: string;
  gioChieu: string;
};

export type DatVeModel = {
  maLichChieu: number;
  danhSachVe: DanhSachVe[];
};

export type TaoLichChieuModel={
  maPhim:number;
  ngayChieuGioChieu:string;
  maRap:string;
  giaVe:number;
}

export type DanhSachVe = {
  maGhe: number;
  giaVe: number;
};

export type PhongVeState = {
  danhSachPhongVe: DanhSachPhongVeModel | null;
  danhSachGheDangDat: DanhSachGhe[];
  hinhAnhRap:string;
};

const initialState: PhongVeState = {
  danhSachPhongVe: null,
  danhSachGheDangDat: [],
  hinhAnhRap:""
};

const QuanLyVeReducer = createSlice({
  name: "QuanLyVeReducer",
  initialState,
  reducers: {
    setDanhSachGheDangDat: (state, action) => {
      var indexToRemove = state.danhSachGheDangDat.findIndex(
        (ghe) => ghe.maGhe === action.payload.maGhe
      );
      if (indexToRemove !== -1) {
        state.danhSachGheDangDat.splice(indexToRemove, 1);
        return;
      }
      if(state.danhSachGheDangDat.length>9){
        openNotificationWithIcon('error','Không được đặt quá 10 vé !')
        return ;
      }
      state.danhSachGheDangDat.push(action.payload);
    },
    deleteGheDangDat:(state)=>{
      state.danhSachGheDangDat=[]
    },
    setHinhAnhRap:(state, action)=>{
      state.hinhAnhRap=action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(getDanhSachPhongveApi.pending, (state, action) => {});
    builder.addCase(
      getDanhSachPhongveApi.fulfilled,
      (state: PhongVeState, action: PayloadAction<DanhSachPhongVeModel>) => {
        state.danhSachPhongVe = action.payload;
      }
    );
  },
});

export const { setDanhSachGheDangDat,deleteGheDangDat,setHinhAnhRap } = QuanLyVeReducer.actions;

export default QuanLyVeReducer.reducer;

export const getDanhSachPhongveApi = createAsyncThunk(
  "QuanLyVeReducer/getDanhSachPhongveApi",
  async (id: string | undefined|number, { dispatch }) => {
    await dispatch(setLoading(true));
    const response = await http.get(
      `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`
    );
    if (response.status === STATUS_CODE.SUCCESS) {
      await dispatch(setLoading(false));
    }
    return response.data.content;
  }
);

export const datVeApi = createAsyncThunk(
  "QuanLyVeReducer/datVeApi",
  async (danhSachVe: DatVeModel, { dispatch }) => {
    const response = await http.post("QuanLyDatVe/DatVe", danhSachVe);
    if (response.status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon("success", "Đặt vé thành công !");
      dispatch( deleteGheDangDat())
      dispatch(getDanhSachPhongveApi(danhSachVe.maLichChieu))
    }
  }
);


export const taoLichChieuApi=createAsyncThunk('QuanLyVeReducer/taoLichChieuApi',
  async(data:TaoLichChieuModel,{dispatch})=>{
    dispatch(setLoading(true));
    const result= await http.post(`QuanLyDatVe/TaoLichChieu`, data);
    if(result.status===STATUS_CODE.SUCCESS){
      dispatch(setLoading(false))
      history.push('/manage/manageFilm')
      openNotificationWithIcon('success', 'Tạo lịch chiếu thành công !');
    }
    dispatch(setLoading(false))
  }
)