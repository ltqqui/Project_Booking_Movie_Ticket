import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import QuanLyPhimReducer from "./QuanLyPhimReducer";
import { GROUP, http } from "../../utils/settings/config";
import { RootState } from "../configStore";
import { setLoading } from "./LoadingReducer";

export type LayThongTinHeThongRapModel ={
  lstCumRap:     LstCumRap[];
  maHeThongRap:  string;
  tenHeThongRap: string;
  logo:          string;
  mahom:         string;
}

export type HeThongRapModel={
  maHeThongRap:string;
  tenHeThongRap:string;
  biDanh:string;
  logo:string;
}
export type CumRapModel= {
  maCumRap:    string;
  tenCumRap:   string;
  diaChi:      string;
  danhSachRap: DanhSachRap[];
}

export interface DanhSachRap {
  maRap:  number;
  tenRap: string;
}


export type LstCumRap ={
  danhSachPhim: DanhSachPhim[];
  maCumRap:     string;
  tenCumRap:    string;
  hinhAnh:      string;
  diaChi:       string;
}

export type DanhSachPhim= {
  lstLichChieuTheoPhim: LstLichChieuTheoPhim[];
  maPhim:               number;
  tenPhim:              string;
  hinhAnh:              string;
  hot:                  boolean | null;
  dangChieu:            boolean | null;
  sapChieu:             boolean | null;
}

export type LstLichChieuTheoPhim= {
  maLichChieu:       number;
  maRap:             string;
  tenRap:            string;
  ngayChieuGioChieu: Date;
  giaVe:             number;
}

export type RapState={
  thongTinHeThongRap:LayThongTinHeThongRapModel[];
  heThongRap:HeThongRapModel[];
  cumRap: CumRapModel[];
}

const initialState:RapState = {
  thongTinHeThongRap:[],
  heThongRap:[],
  cumRap:[]
};

const QuanLyRapReducer = createSlice({
  name: "QuanLyRapReducer",
  initialState,
  reducers: {},
  extraReducers(builder){
    builder.addCase(layThongTinHeThongRapApi.fulfilled,(state:RapState, action:PayloadAction<LayThongTinHeThongRapModel[]>)=>{
      state.thongTinHeThongRap=action.payload
  });
      builder.addCase(layThongTinHeThongRapShowtimeApi.fulfilled,(state:RapState, action:PayloadAction<HeThongRapModel[]>)=>{
        state.heThongRap=action.payload
    });
    builder.addCase(layThongTinCunRapTheoHeThongApi.fulfilled,(state:RapState,action:PayloadAction<CumRapModel[]>)=>{
      state.cumRap=action.payload;
    })
  }
});

export const {} = QuanLyRapReducer.actions;

export default QuanLyRapReducer.reducer;


export const layThongTinHeThongRapApi=createAsyncThunk('QuanLyRapReducer/layThongTinHeThongRapApi', 
  async ()=>{
    const response =await http.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP}`);
    return response.data.content;
  }
)

export const layThongTinHeThongRapShowtimeApi=createAsyncThunk('QuanLyRapReducer/layThongTinHeThongRapShowtimeApi',
  async ()=>{
    const result =await http.get('QuanLyRap/LayThongTinHeThongRap');
    return result.data.content;
  }
)

export const layThongTinCunRapTheoHeThongApi=createAsyncThunk('QuanLyRapReducer/layThongTinCumRapTheoHeThongApi',
  async (maHTR:string)=>{
    const result= await http.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHTR}`)
    return result.data.content;
  }
)

