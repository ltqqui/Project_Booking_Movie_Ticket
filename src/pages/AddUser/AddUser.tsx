import { ArrowLeftOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { GROUP } from "../../utils/settings/config";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, RootState } from "../../redux/configStore";
import { UserUpdateAdminModel, UserUpdateModel, addUserAPi, getListUserApi, getUserEditApi, layDanhSachLoaiNguoiDung, updateUserAPi } from "../../redux/reducer/QuanLyNguoiDungReducer";
import { history } from "../../utils/lib/libs";
type Props = {};

const AddUser = (props: Props) => {
    const {account}= useParams<string>()
    const dispatch:DispatchType =useDispatch()
    const {userEdit,listUser,danhSachLoaiNguoiDung}= useSelector((state:RootState)=> state.QuanLyNguoiDungReducer);
  const frm = useFormik<UserUpdateAdminModel>({
    enableReinitialize: true,
    initialValues: {
      email: "",
      hoTen: "",
      maLoaiNguoiDung: "KhachHang",
      maNhom: GROUP || "",
      matKhau:  '',
      soDt:"",
      taiKhoan:"",
    },
    onSubmit: (value) => {
        console.log(value)
        dispatch(addUserAPi(value))
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required("Tên tài khoản không được bỏ trống !"),
      email: Yup.string()
        .email("Email không hợp lệ!")
        .required("Email không được bỏ trống!"),
      soDt: Yup.string()
        .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
        .required("Số điện thoại không được bỏ trống!"),
      hoTen: Yup.string().required("Họ tên không được bỏ trống!"),
      matKhau:Yup.string().min(8, 'Mật khẩu ít nhất 8 ký tự !.').matches(/[a-zA-Z 0-9]/, 'Mật khẩu chỉ chứa các ký tự la tinh và số !').required("Mật khẩu không được bỏ trống")
    }),
  });
  console.log(danhSachLoaiNguoiDung)
  useEffect(()=>{
    dispatch(layDanhSachLoaiNguoiDung())
  },[])
  return (
    <div className="add_user_form">
      <ArrowLeftOutlined style={{ fontSize: 20 }} onClick={()=>{
        history.push('/manage/manageUser')
      }} />
      <h3>THÊM NGƯỜI DÙNG</h3>
      <form className="form" onSubmit={frm.handleSubmit}>
        <div className="content_form">
          <div className="add_left">
            <p>Tài khoản</p>
            <input
              className="tai_khoan"
              type="text"
              name="taiKhoan"
              placeholder=""
              value={frm.values?.taiKhoan}
              onChange={frm.handleChange}
            />
            <div>{frm.errors.taiKhoan}</div>
            <p>Họ và tên</p>
            <input
              className="ho_ten"
              type="text"
              name="hoTen"
              placeholder=""
              value={frm.values.hoTen}
              onChange={frm.handleChange}
            />
            <div>{frm.errors.hoTen}</div>
            <p>Email</p>
            <input
              className="email"
              type="text"
              name="email"
              placeholder=""
              value={frm.values.email}
              onChange={frm.handleChange}
            />
            <div>{frm.errors.email}</div>
          </div>
          <div className="add_right">
          <p>Số điện thoại</p>
            <input
              className="so_dien_thoai"
              type="text"
              name="soDt"
              placeholder=""
              value={frm.values.soDt}
              onChange={frm.handleChange}
            />
            <div>{frm.errors.soDt}</div>
            <p>Mật khẩu</p>
            <input
              className="mat_khau"
              type="text"
              name="matKhau"
              placeholder=""
              value={frm.values.matKhau}
              onChange={frm.handleChange}
            />
            <div>{frm.errors.matKhau}</div>
            <p>Loại người dùng</p>
            <select name="maLoaiNguoiDung" onChange={frm.handleChange}  value={frm.values.maLoaiNguoiDung} id="">
                    {danhSachLoaiNguoiDung.map((item,index)=>{
                      return <option key={index} value={`${item.maLoaiNguoiDung}`}>{item.tenLoai}</option>
                    })}
                </select>
            <div>{frm.errors.maLoaiNguoiDung}</div>
          </div>
        </div>
        <button className="update" >Thêm</button>
      </form>
    </div>
  );
};

export default AddUser;
