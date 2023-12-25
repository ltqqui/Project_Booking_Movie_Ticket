import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ACCESS_TOKEN,
  GROUP,
  STATUS_CODE,
  USER_LOGIN,
  http,
  settings,
} from "../../utils/settings/config";
import axios from "axios";
import _ from "lodash";
import { setLoading } from "./LoadingReducer";
import { openNotificationWithIcon } from "../../utils/lib/Nontification";
import { history } from "../../utils/lib/libs";

export type UserLoginModel = {
  taiKhoan: string;
  matKhau: string;
};

export type LoginResult = {
  accessToken: string;
  email: string;
  hoTen: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  soDT: string;
  taiKhoan: string;
};

export type UserRegisterModel = {
  taiKhoan: string;
  matKhau: string;
  xacNhanMatKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
  hoTen: string;
};

export type UserProfileModel = {};
export type UserInformationModel = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  loaiNguoiDung: string;
  thongTinDatVe: ThongTinDATVe[];
};

export type UserUpdateModel = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDT: string;
  maNhom: string;
  maLoaiNguoiDung: string;
};

export type UserUpdateAdminModel = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDt: string;
  maNhom: string;
  maLoaiNguoiDung: string;
};

export type DanhSachNguoiDungModel = {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  matKhau: string;
  maLoaiNguoiDung: string;
};

export type DanhSachLoaiNguoiDungModel={
  maLoaiNguoiDung:string;
  tenLoai:string;
}


export interface ThongTinDATVe {
  danhSachGhe: DanhSachGhe[];
  maVe: number;
  ngayDat: Date;
  tenPhim: string;
  hinhAnh: string;
  giaVe: number;
  thoiLuongPhim: number;
}

export interface DanhSachGhe {
  maHeThongRap: string;
  tenHeThongRap: string;
  maCumRap: string;
  tenCumRap: string;
  maRap: number;
  tenRap: string;
  maGhe: number;
  tenGhe: string;
}

export type UserState = {
  userLogin: LoginResult;
  useRegister: UserRegisterModel[];
  userInfomation: UserInformationModel | null;
  listUser: DanhSachNguoiDungModel[];
  userEdit: UserUpdateAdminModel | null;
  danhSachLoaiNguoiDung:DanhSachLoaiNguoiDungModel[] ,
  userUpdate:UserUpdateAdminModel | null
};

const initialState: UserState = {
  userLogin: settings.getStorageJson(USER_LOGIN)
    ? settings.getStorageJson(USER_LOGIN)
    : {},
  useRegister: [],
  userInfomation: null,
  listUser: [],
  userEdit: null,
  danhSachLoaiNguoiDung: [],
  userUpdate: null
};

const QuanLyNguoiDungReducer = createSlice({
  name: "QuanLyNguoiDungReducer",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(postUserLoginApi.pending, (state, action) => {});
    builder.addCase(
      postUserLoginApi.fulfilled,
      (state: UserState, action: PayloadAction<LoginResult>) => {
        state.userLogin = action.payload;
        settings.setStorageJson(USER_LOGIN, state.userLogin);
        settings.setStorage(ACCESS_TOKEN, state.userLogin.accessToken);
      }
    );
    builder.addCase(postUserLoginApi.rejected, (state, action) => {
      setLoading(false);
    });
    builder.addCase(
      getUserInformation.fulfilled,
      (state: UserState, action: PayloadAction<UserInformationModel>) => {
        state.userInfomation = action.payload;
      }
    );
    builder.addCase(
      getListUserApi.fulfilled,
      (state: UserState, action: PayloadAction<DanhSachNguoiDungModel[]>) => {
        state.listUser = action.payload;
      }
    );
    builder.addCase(
      getUserEditApi.fulfilled,
      (state: UserState, action: PayloadAction<UserUpdateAdminModel>) => {
        state.userEdit = action.payload;
      }
    );
    builder.addCase(
      layDanhSachLoaiNguoiDung.fulfilled,
      (state: UserState, action: PayloadAction<DanhSachLoaiNguoiDungModel[]>) => {
        state.danhSachLoaiNguoiDung = action.payload;
      }
    );
  },
});

export const {} = QuanLyNguoiDungReducer.actions;

export default QuanLyNguoiDungReducer.reducer;

export const postUserLoginApi = createAsyncThunk(
  "QuanLyNguoiDungReducer/postUserLoginApi ",
  async (infoLogin: UserLoginModel, { dispatch }) => {
    const result = await http.post("QuanLyNguoiDung/DangNhap", infoLogin);
    await dispatch(setLoading(true));
    if (result.status === STATUS_CODE.SUCCESS) {
      setTimeout(async () => {
        await dispatch(setLoading(false));
        await history.push("/home");
      }, 2000);
    }
    return result.data.content;
  }
);

export const postUserRegisterApi = createAsyncThunk(
  "QuanLyNguoiDungReducer/postUserRegisterApi",
  async (infoRegister: UserRegisterModel, { dispatch }) => {
    const newInfoRegister = _.omit(infoRegister, ["xacNhanMatKhau"]);
    const result = await http.post("QuanLyNguoiDung/DangKy", newInfoRegister);
    await dispatch(setLoading(true));
    if (result.status === STATUS_CODE.SUCCESS) {
      setTimeout(async () => {
        await dispatch(setLoading(false));
        await history.push("/login");
      }, 2000);
    }
    return result.data.content;
  }
);

export const getUserInformation = createAsyncThunk(
  "QuanLyNguoiDung/getUserInformation",
  async (abc, { dispatch }) => {
    dispatch(setLoading(true));
    const response = await http.post("QuanLyNguoiDung/ThongTinTaiKhoan");
    if (response.status === STATUS_CODE.SUCCESS) {
      dispatch(setLoading(false));
    }
    return response.data.content;
  }
);

export const updateUserInformation = createAsyncThunk(
  "QuanLyNguoiDung/updateUserInformation",
  async (info: UserUpdateModel, { dispatch }) => {
    dispatch(setLoading(true));
    const response = await http.put(
      `QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      info
    );
    console.log(response);
    if (response.status === STATUS_CODE.SUCCESS) {
      setTimeout(async () => {
        await dispatch(setLoading(false));
        await openNotificationWithIcon("success", "Cập nhật thành công !");
        await history.push("/login");
      }, 2000);
    }
    return response.data.status;
  }
);

export const getListUserApi = createAsyncThunk(
  "QuanLyNguoiDungReducer/getListUserApi",
  async (
    { maLoaiNguoiDung, value }: { maLoaiNguoiDung: string; value: string },
    { dispatch }
  ) => {
    await dispatch(setLoading(true));
    let response: any;
    if (value !== "") {
      response = await http.get(
        `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP}&tuKhoa=${value}`
      );
      await dispatch(setLoading(false));
    }
    if (value === "") {
      response = await http.get(
        `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP}`
      );
      await dispatch(setLoading(false));
    }
    if (maLoaiNguoiDung !== "") {
      return response.data.content.filter(
        (user: any, index: number) => user.maLoaiNguoiDung === maLoaiNguoiDung
      );
    }
    await dispatch(setLoading(false));
    return response.data.content;
  }
);

export const getUserEditApi = createAsyncThunk(
  "QuanLyNguoiDungReducer/getUserEditApi",
  async (account: string | undefined) => {
    const result = await http.get(
      `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUP}`
    );
    return result.data.content.filter(
      (user: any) => user.taiKhoan === account
    )[0];
  }
);

export const deleteUser = createAsyncThunk(
  "QuanLyNguoiDung/deleteUser",
  async (taiKhoan: string, { dispatch }) => {
    await dispatch(setLoading(true));
    const result = await http.delete(
      `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`
    );
    if (result.status === STATUS_CODE.SUCCESS) {
      await openNotificationWithIcon("success", "Xóa thành công !");
      await dispatch(getListUserApi({ maLoaiNguoiDung: "", value: "" }));
    }
    await dispatch(setLoading(false));
  }
);

export const layDanhSachLoaiNguoiDung=createAsyncThunk('QuanLyNguoiDungReducer/layDanhSachNguoiDung',
  async()=>{
      const result= await http.get('QuanLyNguoiDung/LayDanhSachLoaiNguoiDung');
      return result.data.content;
  }
)

export const updateUserAPi=createAsyncThunk("QuanLyNguoiDungReducer/updateUserApi",
  async(userUpdate:UserUpdateAdminModel,{dispatch})=>{
    dispatch(setLoading(true))
    const result= await http.post('QuanLyNguoiDung/CapNhatThongTinNguoiDung',userUpdate);
    if(result.status===STATUS_CODE.SUCCESS){
     await openNotificationWithIcon('success', 'Cập nhật thành công !');
     await dispatch(setLoading(false))
    }
    dispatch(setLoading(false))
    return result.data.content;
  }
)

export const addUserAPi=createAsyncThunk("QuanLyNguoiDungReducer/updateUserApi",
  async(userAdd:UserUpdateAdminModel,{dispatch})=>{
    dispatch(setLoading(true))
    const result= await http.post('QuanLyNguoiDung/ThemNguoiDung',userAdd);
    if(result.status===STATUS_CODE.SUCCESS){
     await openNotificationWithIcon('success', 'Thêm thành công !');
     await dispatch(setLoading(false))
    }
    dispatch(setLoading(false))
    return result.data.content;
  }
)
